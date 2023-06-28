/*----- constants -----*/
const Choices = {
  '0': "color_0",
  '1': "color_1",
  '2': "color_2",
  '3': "color_3"
}
/*----- state variables -----*/
let level;
let started;
let blinkedColors;
let clickCount;
let blinkCount;
let accurateClick;
let intervalId;
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
  level = 1;
  started = false;
  blinkedColors = [];
  clickCount = 0;
  accurateClick = false;
  blinkCount=0;
  intervalId = null;
  render();
}

function render() {
  document.getElementById("start").disabled = false;
  setLevel(level);
}

function setLevel() {
  document.getElementById("level").innerHTML = level;
}

function getNextColor() {
  let color = Math.floor(Math.random() * 4);
  console.log("Color index : " + color);
  blinkedColors.push(color);
  blink(Choices[color]);
  return color;
}

function clearBlink(id) {
  document.getElementById(id).classList.remove("blink");
}

function blink(id) {
  document.getElementById(id).classList.add("blink");
  blinkCount++;
  if(blinkCount == level && intervalId != null)  {
    clearInterval(intervalId);
  }   
  setTimeout(clearBlink, 500, id);
}

function startGame() {
  console.log("Game started !");
  started = true;
  document.getElementById("start").disabled = true;
  getNextColor();
}

function handleClick(evt) {
  if(started) {
    console.log("-------------------------------------");
    target = evt.target;
    let index = document.getElementById(evt.target.id).id.slice(6);
    console.log("Clicked index : " + index);

    if(index == blinkedColors[clickCount]) {
      accurateClick = true;
    } else {
      console.log("fail...");
      init();
      return;
      //http://codeskulptor-demos.commondatastorage.googleapis.com/descent/bomb.mp3
    }
    console.log("accurateClick : " + accurateClick);
    clickCount++;
    console.log("clickCount : " + clickCount);
    console.log("level : " + level);
    if(clickCount == level) {
      console.log("Finish level : " + level);
      blinkedColors = [];
      clickCount = 0;
      blinkCount = 0;
      intervalId = setInterval(getNextColor, 1000);
      level++;
      setLevel(level);
      console.log("Next level : " + level);
    }
  }
}