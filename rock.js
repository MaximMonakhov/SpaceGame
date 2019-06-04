class Rock {
  constructor() {
    switch (round(random(3))){
      case 0:
        this.x = -50;
        this.y = random(-100, windowHeight + 100);
        this.vector = random (-PI/4, PI/4);
        break;
      case 1:
        this.x = random(-100, windowWidth + 100);
        this.y = -50;
        this.vector = random (PI/4, 3*PI/4);
        break;
      case 2:
        this.x = windowWidth + 50;
        this.y = random(-100, windowHeight + 100);
        this.vector = random (3*PI/4, 5*PI/4);
        break;
      case 3:
        this.x = random(-100, windowWidth + 100);
        this.y = windowHeight + 50;
        this.vector = random (5*PI/4, 7*PI/4);
        break;
    }
    this.phase = 0;
    this.zoff = random(50);
    this.size = random (40, 100);
    if (this.size >= 40) this.speed = random(1.5, 2);
    if (this.size > 60) this.speed = random(1, 1.5);
    if (this.size > 80) this.speed = random(1);
  }

  noise(){
    beginShape();
    let noiseMax = 10;
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.size - 40, this.size);//10-40
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(this.x + x, this.y + y);
    }
    endShape(CLOSE);

    this.phase += 0.003;
    this.zoff += 0.01;
  }

  move(){
    this.x += this.speed * cos(this.vector);
    this.y += this.speed * sin(this.vector);
  }

  outOfRange(){
    return (this.x < -100 || this.x > windowWidth + 100 || this.y < -100 || this.y > windowHeight + 100);
  }

}
