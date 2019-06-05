class Rocket {
  constructor(pos, angle){
    this.pos = createVector(pos.x, pos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(2);
  }

  show(){
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }

  move(){
    this.pos.add(this.velocity);
  }

  hits(rock){
    var d = dist(this.pos.x, this.pos.y, rock.pos.x, rock.pos.y);
    if (d < rock.radius)
      return true;
    else return false;
  }

  outOfScreen(){
    return (this.pos.x < -100 || this.pos.x > width + 100 || this.pos.y < -100 || this.pos.y > height + 100);
  }
}
