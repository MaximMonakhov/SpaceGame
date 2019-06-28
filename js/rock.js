class Rock {
  constructor(pos, size) {
    if (game)
      if (pos)
      {
        this.pos = pos.copy();
        this.velocity = p5.Vector.random2D();
      }
      else
        switch (round(random(3))){
          case 0:
            this.pos = createVector(-50, random(-100, windowHeight + 100));
            this.velocity = p5.Vector.fromAngle(random (-PI/4, PI/4));
            break;
          case 1:
            this.pos = createVector(random(-100, windowWidth + 100), -50);
            this.velocity = p5.Vector.fromAngle(random (PI/4, 3*PI/4));
            break;
          case 2:
            this.pos = createVector(windowWidth + 50, random(-100, windowHeight + 100));
            this.velocity = p5.Vector.fromAngle(random (3*PI/4, 5*PI/4));
            break;
          case 3:
            this.pos = createVector(random(-100, windowWidth + 100), windowHeight + 50);
            this.velocity = p5.Vector.fromAngle(random (5*PI/4, 7*PI/4));
            break;
        }
    else {
      this.pos = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
    }

    this.phase = 0;
    this.zoff = random(50);
    this.waveSize = 40;
    this.radius = 0;
    this.sizeClass = 1;

    if (size) {
      this.interiorSize = size * 0.5;
      if (this.interiorSize <= 20) {
        this.waveSize = 20;
        this.velocity.mult(3);
        this.sizeClass = 3;
      }
      else {
        if (this.interiorSize < 40) {
          this.waveSize = 20;
          this.velocity.mult(2);
          this.sizeClass = 2;
        }
      }
    }
    else {
      this.interiorSize = random(60, 100);
      this.sizeClass = 1;
    }
  }

  noise(){
    push();
    fill(10);
    beginShape();
    let noiseMax = 10;
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.interiorSize-this.waveSize, this.interiorSize);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(this.pos.x + x, this.pos.y + y);
      this.radius = (r + this.interiorSize) / 2;
    }
    endShape(CLOSE);

    this.phase += 0.003;
    this.zoff += 0.01;
    pop();
  }

  move(){
    this.pos.add(this.velocity);
  }

  outOfScreen(){
    return (this.pos.x < -100 || this.pos.x > width + 100 || this.pos.y < -100 || this.pos.y > height + 100);
  }

  breakup(){
    var newRocks = [];
    newRocks[0] = new Rock(this.pos, this.interiorSize);
    newRocks[1] = new Rock(this.pos, this.interiorSize);
    return newRocks;
  }

}
