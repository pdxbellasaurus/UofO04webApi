

var scoreBoard = document.querySelector(".score");
var score = 0;
var timeUp = false
var scoretable = document.querySelector(".scoretable");

function populateTable() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
      });
    
    highscores.forEach(function(score,i) {
    var row = scoretable.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = score.initials;
    cell2.innerHTML = score.score;
});
}

  function clearScores() {
    highscores.splice(0, highscores.length);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    populateTable(highscores, scoreList);
  }
  populateTable();

// Event listener to move to index page
again.addEventListener("click", function () {
location.replace("./index.html");
});

function clearHighscores() {
localStorage.removeItem("highscores");
location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
 