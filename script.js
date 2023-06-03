const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Starter spillet
initializeGame();

// Funksjon for å starte spillet
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} sin tur`;
    running = true;
}

// Funksjon for å håndtere celleklikkhendelse
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    // Sjekk om cellen allerede er fylt eller spillet ikke kjører
    if(options[cellIndex] != "" || !running){
        return;
    }

    // Oppdater den klikkede cellen og se etter en vinner
    updateCell(this, cellIndex);
    checkWinner();
}
// Funksjon for å oppdatere den klikkede cellen
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// Funksjon for å endre spilleren
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} sin tur`;
}

// Funksjon for å se etter en vinner
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break; 
        }
    }

    // Håndterer spillresultatet basert på om en runde er vunnet eller det er uavgjort
    if(roundWon){
        statusText.textContent = `${currentPlayer} vinner!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Uavgjort!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

// Funksjon for å restarte spillet
function restartGame(){
    // Tilbakestiller variabler til startverdiene
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} sin tur`;

    // Fjerner innholdet i hver celle
    cells.forEach(cell => cell.textContent = "");
    
    running = true; // Setter spillstatusen til å kjøre
}