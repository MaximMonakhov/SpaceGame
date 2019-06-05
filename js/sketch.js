//Жизни, появление астеройдов, счет
let rocks = [];
let lasers = [];
let rockets = [];
let shockWave;
let ship;
let score = 0;
let maxScore = 0;
let rocksMaxCount = 30;
let lifeCount = 0;
let game = false;
let shockReloadTime = 10000;
let rocketReloadTime = 1000;
let newRocket = throttle(function() {rockets.push(new Rocket(ship.pos, ship.angle));}, rocketReloadTime);
let newShockWave = throttle(function() {shockWave = new ShockWave();}, shockReloadTime);

function setup() {
  createCanvas(windowWidth+1, windowHeight);
  for (var i = 0; i < rocksMaxCount; i++)
    rocks[i] = new Rock();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  for (var i = 0; i < rocks.length; i++) {
    //if (ship.hits(rocks[i])){}

    rocks[i].noise();
    rocks[i].move();
    if (rocks[i].outOfScreen()){
        rocks.splice(i, 1);
        if (rocks.length < rocksMaxCount)
          rocks.push(new Rock());
    }
  }

  if (game) gameProcces();
}

function gameProcces(){
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].move();
    if (lasers[i].outOfScreen())
      lasers.splice(i, 1);
    else {
      for (var j = rocks.length - 1; j >= 0; j--) {
        if (lasers[i].hits(rocks[j])) {
          if (rocks[j].radius > 25) {
            var newRocks = rocks[j].breakup();
            rocks = rocks.concat(newRocks);
          }
          else {
            score++;
            var scoreDiv = document.getElementById("scoreInt");
            scoreDiv.innerHTML = score;
          }
          rocks.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  for (var i = rockets.length - 1; i >= 0; i--) {
    rockets[i].show();
    rockets[i].move();
    if (rockets[i].outOfScreen())
      rockets.splice(i, 1);
    else {
      for (var j = rocks.length - 1; j >= 0; j--) {
        if (rockets[i].hits(rocks[j])) {
            score++;
            var scoreDiv = document.getElementById("scoreInt");
            scoreDiv.innerHTML = score;
            rocks.splice(j, 1);
            rockets.splice(i, 1);
            break;
        }
      }
    }
  }

  if (shockWave){
    shockWave.show(ship.pos);
    shockWave.update();
    for (var j = rocks.length - 1; j >= 0; j--) {
      if (shockWave) {
        if (shockWave.hits(rocks[j], ship.pos)) {
            score++;
            var scoreDiv = document.getElementById("scoreInt");
            scoreDiv.innerHTML = score;
            rocks.splice(j, 1);
            break;
        }
      }
      else {
        break;
      }
    }
  }

  ship.show();
  ship.turn();
  ship.update();
  ship.walls();

  keyCheck();
}

function keyCheck(){
  if (keyIsDown(LEFT_ARROW))
    ship.setRotation(-0.1);
  if (keyIsDown(RIGHT_ARROW))
    ship.setRotation(0.1);
  if (keyIsDown(UP_ARROW))
    ship.boosting(true);
}

function keyPressed(){
  if (game) {
    if (keyCode == 32)
      lasers.push(new Laser(ship.pos, ship.angle));
    if (keyCode == 17)
      newRocket();
    if (keyCode == 16)
      newShockWave();
    if (keyCode == 27)
      endGame();
  }
}

function keyReleased(){
  if (game) {
    ship.setRotation(0);
    ship.boosting(false);
  }
}

function startGame(){
  let settings = document.getElementsByClassName("pressed");
  let menu = document.getElementById("menu");
  let scoreDiv = document.getElementById("score");
  let scoreInt = document.getElementById("scoreInt");
  let bestScoreDiv = document.getElementById("bestScore");

  if (settings[0].innerHTML == "Easy")
    rocksMaxCount = 10;
  if (settings[0].innerHTML == "Hard")
    rocksMaxCount = 20;
  if (settings[0].innerHTML == "Extreme")
    rocksMaxCount = 30;

  lifeCount = settings[1].innerHTML;

  menu.style.display = 'none';
  scoreDiv.style.display = 'block';
  scoreInt.innerHTML = 0;
  bestScoreDiv.style.display = 'none';
  ship = new Ship();

  game = true;
}

function endGame(){
  let menu = document.getElementById("menu");
  let scoreDiv = document.getElementById("score");
  let bestScoreDiv = document.getElementById("bestScore");
  let bestScoreInt = document.getElementById("bestScoreInt");

  if (maxScore <= score)
    maxScore = score;
  bestScoreInt.innerHTML = maxScore;
  bestScoreDiv.style.display = 'block';

  rocksMaxCount = 10;
  menu.style.display = 'block';
  scoreDiv.style.display = 'none';
  game = false;
  score = 0;
}

function throttle(func, ms) {

  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
