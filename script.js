/*----- constants -----*/
const Choices = {
    '0': "red",
    '1': "blue",
    '2': "yellow",
    '3': "green"
  }
  /*----- state variables -----*/
  let round;
  
  /*----- cached elements  -----*/
  const startButton = document.getElementById('start')
  const redEl = document.getElementById('red');
  const greenEl = document.getElementById('green');
  const yellowEl = document.getElementById('yellow');
  const blueEl = document.getElementById('blue');
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
    console.log("Init called !");
  }
    
  function startGame() {
    console.log("Game started !");
  }
  
  function handleClick(evt) {
    target = evt.target;
    console.log(target.id);
  }