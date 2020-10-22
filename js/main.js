/* Game Variables */
let game; // variable to represent the game state
let turn = "X"; // start the game w/ player one as X
let win; // variable to capture the winner
const victoryCombinations = [
  // each nested array represents the combo of indices that count as a victory when the value of each index is the same
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* HTML Elements */
const tiles = Array.from(document.querySelectorAll("#tiles div"));
document.getElementById("tiles").addEventListener("click", gameTurn); // after a tile is clicked, run the gameTurn logic and it progresses to next turn
const msg = document.querySelector("h2");
document.getElementById("reset").addEventListener("click", createGame); // when the Reset button is clicked, run createGame to clear the tiles

/* Functions */
// function to return the player who won and/or to report a tie
function findWinner() {
  let winner = null; // when winner is null, the h2 element will not report a victory or tie
  victoryCombinations.forEach((combo) => {
    if (
      // game[combo[0/1/2]] captures the value at each index specified in each nested array within victoryCombinations
      game[combo[0]] && // first check that there is a value in the first index, else three empty strings would count as a victory
      game[combo[0]] === game[combo[1]] && // check whether the value in the first index is the same as the values in the next two indices
      game[combo[0]] === game[combo[2]]
    ) {
      winner = game[combo[0]]; // if the values of all three indices are the same, winner is set to the value of the first index (either X or O)
    }
  });
  // if there's a winner return the winner, else if the game includes any empty strings the game isn't done so return null,
  // else if there is no winner and there are no empty strings, then return the game is a tie
  return winner ? winner : game.includes("") ? null : "Tie";
}

// function to run game turns everytime a tile is clicked
function gameTurn(event) {
  // find index of clicked-on tile
  let tileIndex = tiles.findIndex((tile) => {
    return tile === event.target;
  });

  game[tileIndex] = turn; // find the same index on the game state and set its value to the current turn value (X or O)
  turn = turn === "X" ? "O" : "X"; // switch the turn value so the next player can go
  win = findWinner(); // every turn check if there is a winner and set win variable accordingly
  showGame(); // invoked so game reloads in browser to show updated game state
}

// creates the game tiles--all blank at first
function createGame() {
  game = ["", "", "", "", "", "", "", "", ""];
  win = null; // sets win variable back to null when Reset button clicked so the h2 element will update to either X's or O's turn rather than the previous victory message
  showGame(); // invoked to show game state in browser
}

// this function controls the HTML elements
function showGame() {
  game.forEach((val, index) => {
    tiles[index].textContent = val; // set div elements to the state values passed here
  });

  // checks for various conditions, then changes the h2 element accordingly
  if (win === "Tie") {
    msg.textContent = `It's a tie!`;
  } else if (win) {
    msg.textContent = `${win} wins!`;
  } else {
    msg.textContent = `${turn}'s turn`;
  }
}

// invoked to initialize the game state
createGame();
