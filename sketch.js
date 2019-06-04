let rocksMaxCount = 10;
let rocks = [];
let lasers = [];
let ship;
let score = 0;

function setup() {
  createCanvas(windowWidth+1, windowHeight);
  ship = new Ship();
  for (var i = 0; i < rocksMaxCount; i++)
    rocks[i] = new Rock();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  for (var i = 0; i < rocks.length; i++) {
    if (ship.hits(rocks[i])){}

    rocks[i].noise();
    rocks[i].move();
    if (rocks[i].outOfScreen()){
        rocks.splice(i, 1);
        if (rocks.length < rocksMaxCount)
          rocks.push(new Rock());
    }
  }

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
            var scoreDiv = document.getElementById("score");
            scoreDiv.innerHTML = score;
          }
          rocks.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
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

function keyPressed(){
  if (keyCode == 32)
    lasers.push(new Laser(ship.pos, ship.angle));
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}
