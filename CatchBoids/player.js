function Player(){
  this.loc = createVector(0, 0);
  this.diameter = 40;
  this.r = this.diameter/2;

  this.run = function(){
    this.render();
    this.update();
    this.checkEdges();
  }
  this.render = function(){
    noStroke();
    fill(60, 0, 90);
    ellipse(this.loc.x, this.loc.y, this.diameter);
  }
  this.update = function(){
    this.loc.x = lerp(this.loc.x, mouseX, 0.6);
    this.loc.y = lerp(this.loc.y, mouseY, 0.6);
  }
  this.checkEdges = function(){
    xc = constrain(mouseX, leftWall+this.r, rightWall-this.r);
    yc = constrain(mouseY, topWall+this.r, bottomWall-this.r);
    this.loc.x = xc;
    this.loc.y = yc;
    if(mouseX < leftWall||mouseX > rightWall||mouseY < topWall||mouseY > bottomWall){
      cursor(HAND);
    }
  }
}
