/*----- constants -----*/
const Choices = {
  '0': "color_0",
  '1': "color_1",
  '2': "color_2",
  '3': "color_3"
}

const messages = {
  "watch": "WATCH",
  "play": "PLAY",
  "start": "Click START to play",
  "fail": "Failed! Click START to play again"
}

const audios = {
  "0": "audio_0",
  "1": "audio_1",
  "2": "audio_2",
  "3": "audio_3",
  "fail": "audio_fail"
}
/*----- state variables -----*/
let level;
let started;
let blinkedColors;
let clickCount;
let blinkCount;
let accurateClick;
let intervalId;
let playerTurn;
let score;
let highScore;
let failed;

/*----- cached elements  -----*/
const startButton = document.getElementById('start')
const redEl = document.getElementById('color_0');
const blueEl = document.getElementById('color_1');
const yellowEl = document.getElementById('color_2');
const greenEl = document.getElementById('color_3');

/*----- event listeners -----*/
startButton.addEventListener('click', startGame);
redEl.addEventListener('click', handleClick);
greenEl.addEventListener('click', handleClick);
yellowEl.addEventListener('click', handleClick);
blueEl.addEventListener('click', handleClick);

/*----- functions -----*/
// init() will give values to state vars at beginning of game
init();

function init() {
  level = 0;
  started = false;
  blinkedColors = [];
  clickCount = 0;
  accurateClick = false;
  blinkCount=0;
  intervalId = null;
  playerTurn = false;
  score = 0
  highScore = 0
  failed = false;
  render();
}

function reset() {
  level = 0;
  started = false;
  blinkedColors = [];
  clickCount = 0;
  accurateClick = false;
  blinkCount=0;
  intervalId = null;
  playerTurn = false;
  score = 0
  render();
  document.getElementById("start").classList.remove("startDisable");  
}

function render() {
  clearInterval(intervalId);
  document.getElementById("start").disabled = false;  
  if(!failed) {
    showMessage(messages["start"]);
  }
  failed = false;
}

function showMessage(message) {
  document.getElementById("message").innerHTML = message;
}

function showScore() {
  document.getElementById("score").innerHTML = "Score : "+score;
  document.getElementById("highscore").innerHTML = "High Score : " + highScore;
}

function getNextColor() {
  let color = Math.floor(Math.random() * 4);
  blinkedColors.push(color);
  blink(Choices[color]);
  return color;
}

function clearBlink(id) {
  document.getElementById(id).classList.remove("blink");
}

function playAudio(id) {
  var audio = document.getElementById(audios[id]);
  audio.play();
}

function blink(id) {
  document.getElementById(id).classList.add("blink");
  playAudio(id.slice(6));
  blinkCount++;
  if(blinkCount == level && intervalId != null)  {
    clearInterval(intervalId);
    showMessage(messages["play"]);
  }   
  setTimeout(clearBlink, 500, id);
}

function startGame() {
  started = true;
  level = 1;
  score = 0;
  showMessage(messages["watch"]);
  showScore();
  document.getElementById("start").disabled = true;
  document.getElementById("start").classList.add("startDisable");
  getNextColor();
  showMessage(messages["play"]);
}

function loseGame() {
  failed = true;
  started = false;
  playAudio("fail");
  showMessage(messages["fail"]);  
  reset();
}

function handleClick(evt) {
  if(started) {
    target = evt.target;
    let index = document.getElementById(evt.target.id).id.slice(6);
    playAudio(index);
    if(index == blinkedColors[clickCount]) {
      accurateClick = true;
    } else {
      loseGame();
      return;
    }
    clickCount++;
    if(clickCount == level) {
      blinkedColors = [];
      clickCount = 0;
      blinkCount = 0;      
      intervalId = setInterval(getNextColor, 1000);
      level++;
      score++;
      if(score > highScore) {
        highScore = score;
      }
      showMessage(messages["watch"]);
      showScore();
    }
  }
}
