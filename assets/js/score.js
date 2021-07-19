var highScores = [];
var scoreTableEl = document.querySelector("#score-table");

var loadScores = function() { 
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = []

        var noScores = document.createElement("div");
        noScores.setAttribute("style", "text-align: center");
        noScores.textContent = "No scores to show"
        document.querySelector("#score-card").appendChild(noScores);

        return false;
    }

    highScores = JSON.parse(highScores);
    highScores.sort(compare);
}

var compare = function(a, b) {
    var scoreA = parseInt(a.score);
    var scoreB = parseInt(b.score);

    var comparison = 0;
    if (scoreA < scoreB) {
        comparison = 1;
    } else if (scoreA > scoreB) {
        comparison = -1;
    }
    return comparison;
}


var createScoreTable = function() {

    for (var i = 0; i < highScores.length; i++){ 
        var scoreRow = document.createElement("tr");
        scoreTableEl.appendChild(scoreRow);
    
        var nameCell = document.createElement("td");
        nameCell.className = "table-name-data";
        nameCell.textContent = highScores[i].name;
        scoreRow.appendChild(nameCell);
    
        var scoreCell = document.createElement("td");
        scoreCell.className = "table-score-data";
        scoreCell.setAttribute("style", "text-align: right")
        scoreCell.textContent = highScores[i].score;
        scoreRow.appendChild(scoreCell);
    }

}

loadScores();
createScoreTable();
