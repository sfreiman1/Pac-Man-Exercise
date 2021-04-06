// Pacmen.js

// Pacman images
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];

const pacMen = []; // This array holds all the pacmen

let stopMovement = false; // stop pacmen moving
let gameRunning = false; // is the game still running?

// store the game board dimensions so we don't have to keep looking them up
let gameBoardHeight, gameBoardWidth;

// initializes the game board
window.onload = function initBoard() {
  resizeBoard(window.innerHeight - 200, window.innerWidth - 50);
};

// resizes the game board
function resizeBoard(h, w) {
  let elem = document.getElementById("game");

  elem.style.height = h;
  elem.style.width = w;
  elem.style.border = "thick solid #000000";
  elem.style.position = "fixed";
  elem.style.backgroundColor = "blue";

  gameBoardWidth = elem.clientWidth;
  gameBoardHeight = elem.clientHeight;
}

// returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// makes a PacMan at a random position with random velocity
function makePac() {
  // make sure we are ready to start movement again
  stopMovement = false;

  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(50); // {x:?, y:?}
  let position = {};
  let direction = 0; // 0 = left to right, 1 = right to left
  let focus = 0; // Toggle among PacMan images

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray[0][0];
  newimg.width = 100;
  newimg.height = 100;

  // set position here
  position.x = Math.random() * (gameBoardWidth - newimg.width);
  position.y = Math.random() * (gameBoardHeight - newimg.height);

  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // Tadd new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
    focus,
  };
}

//  toggles the state of the start and stop buttons
function toggleGameButtons() {
  startBut = document.getElementById("start");
  startBut.disabled = !startBut.disabled;

  stopBut = document.getElementById("stop");
  stopBut.disabled = !stopBut.disabled;
}

//  updates the position of all the pacmen
function update() {
  // loop over pacmen array and move each one and move image in DOM

  if (stopMovement === true) {
    stopMovement = false;
    gameRunning = false;
    return;
  }
  gameRunning = true;

  pacMen.forEach((item) => {
    checkCollisions(item);

    item.newimg.src = pacArray[item.direction][item.focus];
    item.focus = (item.focus + 1) % 2;

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

//  checks to see if the pacmen has collided with one of the four sides.
function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > gameBoardWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    item.direction = (item.direction + 1) % 2;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > gameBoardHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

//  makes a single pacman
function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//  clear all pacmans from the gamespace
function clearAll() {
  let images = document.getElementsByTagName("img");

  // If game is running, stop it
  if (gameRunning) stop();

  // Since removing nodes continually updates the node list, we have to keep removing the first node until there isn't one
  for (let i = 0, len = images.length; i != len; ++i) {
    images[0].parentNode.removeChild(images[0]);
  }

  //clear the array
  pacMen.length = 0;
}

// starts the pacmen moving
function start() {
  toggleGameButtons();
  update();
}

// stops the pacmen moving
function stop() {
  toggleGameButtons();
  gameRunning = false;
  stopMovement = true;
}

// creates one or more pacmen based on the number entered by the user
function createMultiple() {
  var num = parseInt(prompt("How many Pacmen do you want?"));
  if (num === NaN) {
    alert("You must enter an integer.");
  } else if (num <= 0 || num > 100) {
    alert("You must enter a number between 1 and 100");
  } else {
    for (let i = 0; i < num; i++) {
      makeOne();
    }
  }
}
