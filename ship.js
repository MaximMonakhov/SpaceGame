class Ship {
  constructor(){
    this.pos = createVector(width / 2, height / 2);
    this.r = 10;
    this.angle = 0;
    this.rotation = 0;
    this.velocity = createVector(0, 0);
    this.isBoosting = false;
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + PI / 2);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  setRotation(angle){
    this.rotation = angle;
  }

  turn(){
    this.angle += this.rotation;
  }

  update(){
    if (this.isBoosting){
      this.boost();
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.99);
  }

  boosting(b){
    this.isBoosting = b;
  }

  boost(){
    var force = p5.Vector.fromAngle(this.angle);
    force.mult(0.1);
    this.velocity.add(force);
  }

  walls(){
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
