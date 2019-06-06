class ShockWave {
  constructor(pos){
    this.r = 0;
    this.maxR = 200;
  }

  show(pos){
    strokeWeight(2);
    circle(pos.x, pos.y, this.r);
  }

  update(){
    if (this.r < this.maxR)
      this.r += 1;
    else
      shockWave = null;
  }

  hits(rock, pos){
    var d = dist(pos.x, pos.y, rock.pos.x, rock.pos.y);
    if (d < rock.radius + this.r/2)
      return true;
    else return false;
  }
}
