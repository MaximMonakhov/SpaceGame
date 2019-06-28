class Laser {
  constructor(pos, angle){
    this.pos = createVector(pos.x, pos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(10);
  }

  show(){
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }

  move(){
    this.pos.add(this.velocity);
  }

  hits(rock){
    var d = dist(this.pos.x, this.pos.y, rock.pos.x, rock.pos.y);
    return d < rock.radius;
  }

  outOfScreen(){
    return (this.pos.x < -100 || this.pos.x > width + 100 || this.pos.y < -100 || this.pos.y > height + 100);
  }
}
