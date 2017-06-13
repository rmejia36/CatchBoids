function Preditor(){
  this.loc = createVector(300, 300);
  this.acc = createVector(0, 0);
  this.diameter = 30;
  this.r = this.diameter/2;
  this.vel = createVector(random(3, 6), random(3, 6));
  this.repMult = 1;

  this.run = function(){
    this.render();
    this.update();
    this.checkEdges();
  }
  this.render = function(){
    noStroke();
    fill(0);
    ellipse(this.loc.x, this.loc.y, this.diameter);
  }
  this.update = function(){
    for(var i = 0; i < numForces; i++){
      if(this.loc.dist(baseLocation(i)) < 120 && !this.isIn){
        this.forceRep = p5.Vector.sub(this.loc, baseLocation(i));
        this.forceRep.normalize();
        this.forceRep.mult(this.repMult);
        this.applyForce(this.forceRep);
        this.vel.limit(this.velLimit);
      }
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.limit(this.velLimit);
    this.acc.mult(0);
  }
  this.checkEdges = function(){
    if(this.loc.x < leftWall+this.r)this.vel.x*=-1;
    if(this.loc.x > rightWall-this.r)this.vel.x*=-1;
    if(this.loc.y < topWall+this.r)this.vel.y*=-1;
    if(this.loc.y > bottomWall-this.r)this.vel.y*=-1;
  }
  this.applyForce = function(force){
    this.acc.add(force);
  }
}
