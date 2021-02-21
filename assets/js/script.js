//QUESTIONS
var questions = [
  {
    title: "Items in a(n) ____ list are preceded by numbers.",
    choices: ["shopping", "unordered", "numbered", "ordered"],
    answer: "ordered"
  },
  {
    title: "What does CSS stand for?",
    choices: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Custom Style Sheets"],
    answer:"Cascading Style Sheets",
  },
  {
    title: "The # symbol specifies that the CSS selector is a(n)?",
    choices: ["tag", "class", "id", "child"],
    answer:"id",
  },
  {
    title: "Which of the following variables takes precedence over the others if the names are the same?",
    choices: ["Global variable", "The local element", "The two of the above", "None of the above"],
    answer:"The local element",
  },
  {
    title: "A set of unordered properties that, has a name and value is called ______",
    choices: ["String", "Array", "Serialized Object", "Object"],
    answer: ["Object"],
  },
];

//VARIABLES
var viewHighscores = document.querySelector("#scoresLink");
var submitScore = document.querySelector("#submit");
var timed = document.querySelector("#timed");
var start = document.querySelector("#start");
var title = document.querySelector("#title");
var choices = document.querySelector("#choices");
var welcome = document.querySelector("#welcome");
var complete = document.querySelector("#complete");
var highscore = document.querySelector("#score");
var inSubmit = document.querySelector("#initials");
var check = document.querySelector("#check");
var end = questions.length -1;
var timeRemain = questions.length * 15-1;
var newScore = "";
var correct = true;
var answer ;
var questIndex = 0;

onload = function() {
  quiz.style.display = "none";
  complete.style.display = "none";
  timed.style.display = "none";
};

function timer() {
  var interval = setInterval(function(){
    document.querySelector("#time").textContent = timeRemain;
    timeRemain--;
        if (timeRemain <= 0){
      clearInterval(interval);
      endQuiz();
  }
}, 1000);
}

function questLoop() {
  questions[questIndex]
  var current = questions[questIndex];
  title.textContent = current.title;
choices.innerHTML = "";
// loop choices
current.choices.forEach(function(choice) {
  // create new button for each choice
  var options = document.createElement("button");
  options.setAttribute("class", "choice");
  options.setAttribute("value", choice);

  options.textContent = choice;
  options.onclick = validate;
  choices.appendChild(options);
});
}

function validate(){
  if (questions[questIndex].answer === this.value) {
    check.textContent = "✅ Correct!";
} else if (questions[questIndex].answer !== this.value) {
    timeRemain -=15;
    check.textContent = "❌ Wrong!";
}   
if (timeRemain < 0) {
  timeRemain = 0;
}

check.setAttribute("class", "show");
  setTimeout(function() {
  check.setAttribute("class", "hide");
  }, 1000);
  questIndex++;
  if (questions[questIndex] === end || typeof(questions[questIndex]) == 'undefined') {
     endQuiz();
  }  
  else {
    questLoop();
  }
}

start.addEventListener("click", function(){
  welcome.style.display = "none";
  quiz.style.display = ""
  timed.style.display = "";
  complete.style.display = "none";
  timer();
  questLoop();
  });
  
function endQuiz() {
  console.log(timeRemain)
  clearInterval(timer);
  welcome.style.display = "none";
  quiz.style.display = "none";
  complete.style.display = "";
 document.querySelector(".score").textContent = timeRemain;
  
 
}
function saveScore(){
var initials = inSubmit.value.trim();
if (initials !== "") {
 var highscores =
    JSON.parse(localStorage.getItem("highscores")) || [];
 
  var endScore = {
    score: timeRemain,
    initials: initials
  };

  // save to local storage
  highscores.push(endScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // redirect to next page
  location.replace("./highscores.html");
}
}
submitScore.onclick = saveScore;
scoreLink.addEventListener("click", function () {
  location.replace("./highscores.html");
  });