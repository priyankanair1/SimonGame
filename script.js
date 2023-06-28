/*----- constants -----*/
const Choices = {
  '0': "color_0",
  '1': "color_1",
  '2': "color_2",
  '3': "color_3"
}
/*----- state variables -----*/
let round;
let blinkedColors = [];
let clickCount;
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
  // initialize round = 1
  round = 1;
  clickCount = 0;
  document.getElementById("level").innerHTML = round;
  console.log("Init called !");
}

function getNextColor() {
  let color = Math.floor(Math.random() * 4);
  blinkedColors.push(color);
  return color;
}

function clearBlink(id) {
  document.getElementById(id).classList.remove("blink");
}

function blink(id) {
  document.getElementById(id).classList.add("blink");
  setTimeout(clearBlink, 500, id);
}

function startGame() {
  console.log("Game started !");
  document.getElementById("start").disabled = true;
  let color = getNextColor();
  blink(Choices[color]);
}

function handleClick(evt) {
  target = evt.target;
  let index = document.getElementById(evt.target.id).id.slice(6);
  console.log(index);
  console.log(blinkedColors[clickCount]);
  if(index == blinkedColors[clickCount]) {
    clickCount++;
    let color = getNextColor();
    blink(Choices[color]);
  } else {
    console.log("Fail....");  
  }
}