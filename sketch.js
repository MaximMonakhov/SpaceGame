let rocksMaxCount = 10;//+1
let rocks = [];
let ship;

/*function preload() {
  spaceCraftImage = loadImage('https://imgur.com/gt6kNze');
}*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  ship.show();
  ship.turn();
  ship.update();
  ship.walls();

  if (rocks.length <= rocksMaxCount)
    rocks[rocks.length] = new Rock();

  for (let i = 0; i < rocks.length; i++) {
    stroke(255);
    rocks[i].noise();
    rocks[i].move();
    if (rocks[i].outOfRange()){
      rocks[i] = new Rock();
    }
  }

  keyCheck();
}

function keyCheck(){
  if (keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-0.1);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(0.1);
  }

  if (keyIsDown(UP_ARROW)) {
    ship.boosting(true);
  }
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}
