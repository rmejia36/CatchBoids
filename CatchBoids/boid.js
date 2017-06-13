function Boid(player, preditor){
  this.forceRep = createVector(0, 0);
  this.diameter = 15;
  this.r = this.diameter/2;
  this.repMult = 1;
  this.acc = createVector(0, 0);
  this.loc = pickLoc();
  this.vel = createVector(random(-3, 3), random(-3, 3));
  this.color = color(random(255), random(255), random(255));
  this.velLimit = 2;
  this.isIn = false;
  this.invisible = false;

  this.run = function(boids){
    this.render();
    this.flock(boids);
    this.update();
    this.checkEdges();
  }
  this.render = function(){
    if(!this.invisible){
      strokeWeight(1);
      stroke(255);
      fill(this.color);
      ellipse(this.loc.x, this.loc.y, this.diameter);
    }else{
      noStroke();
      fill(100);
      ellipse(this.loc.x, this.loc.y, this.diameter);
    }
  }
  this.applyForce = function(force){
    this.acc.add(force);
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
      if(collideRectCircle(locationX[i], locationY[i], 160, 140, this.loc.x, this.loc.y, this.diameter) && baseMaxes[i] !=0){
        this.isIn = true;
        this.forceRep = p5.Vector.sub(baseLocation(i), this.loc);
        this.forceRep.normalize();
        this.forceRep.mult(this.repMult);
        this.applyForce(this.forceRep);
        this.vel.limit(this.velLimit);
      }
    }
    if(this.loc.dist(player.loc) < player.diameter-5 && mouseIsPressed){
      this.loc.x = lerp(this.loc.x, player.loc.x, 0.8);
      this.loc.y = lerp(this.loc.y, player.loc.y, 0.8);
    }

    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.limit(this.velLimit);
    this.acc.mult(0);

    if(collideCircleCircle(preditor.loc.x, preditor.loc.y, preditor.diameter, this.loc.x, this.loc.y, this.diameter)){
      this.loc = createVector(0, 0);
      this.vel = createVector(0, 0);
      this.invisible = true;
    }
  }
  this.checkEdges = function(){
    if(this.loc.x < leftWall+this.r)this.vel.x*=-1;
    if(this.loc.x > rightWall-this.r)this.vel.x*=-1;
    if(this.loc.y < topWall+this.r)this.vel.y*=-1;
    if(this.loc.y > bottomWall-this.r)this.vel.y*=-1;
  }
  this.flock = function(boids){
    var sep = this.separate(boids);
    var ali = this.align(boids);
    var coh = this.cohesion(boids);
    sep.mult(2.5);
    ali.mult(2.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  this.seek = function(target){
    var desired = p5.Vector.sub(target, this.loc);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }
  this.separate = function(boids){
    var desiredseparation = 25.0;
    var steer = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.loc, boids[i].loc);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0){
      steer.div(count);
    }
    if (steer.mag() > 0){
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  this.align = function(boids){
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for(var i = 0; i < boids.length; i++){
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      if ((d > 0) && (d < neighbordist)){
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0){
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else{
      return createVector(0, 0);
    }
  }
  this.cohesion = function(boids){
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++){
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      if ((d > 0) && (d < neighbordist)){
        sum.add(boids[i].loc);
        count++;
      }
    }
    if (count > 0){
      sum.div(count);
      return this.seek(sum);
    } else{
      return createVector(0, 0);
    }
  }
}
