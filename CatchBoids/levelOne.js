var p = '\u23ef';
var p2 = '\u23f5';

function levelOne(){
  noCursor();
  layout();
  currentTime = 15 - endTime;
  baseColors = [color(185, 0, 0), color(0, 0, 185), color(0, 185, 0)];

  this.stage();
  run();
  updateScore();
  checkFilled();
}
this.stage = function(){
  push();
  noStroke();
  fill(baseColors[0]);
  rect(this.locationX[0], this.locationY[0], 160, 140);
  fill(255);
  textSize(36);
  textAlign(CENTER);
  textFont("impact");
  text("" + baseMaxes[0], baseLocation(0).x, baseLocation(0).y+10);

  fill(baseColors[1]);
  rect(this.locationX[1], this.locationY[1], 160, 140);
  fill(255);
  text("" + baseMaxes[1], baseLocation(1).x, baseLocation(1).y+10);

  fill(baseColors[2]);
  rect(this.locationX[2], this.locationY[2], 160, 140);
  fill(255);
  text("" + baseMaxes[2], baseLocation(2).x, baseLocation(2).y+10);
  pop();

  fill(255);
	stroke(0);
	textSize(36);
  textAlign(CENTER);
  textFont("impact");
	text("Time: \n"+currentTime, 80, 100);
  text("Boids \n Saved: \n"+score, 80, 300);
  fill(0);
  textSize(36);
  text("You only need to save 18 boids to win. Beware the predator. It eats boids!", w/2 - 3, h - 12);
  fill(255);
  text("You only need to save 18 boids to win. Beware the predator. It eats boids!", w/2, h - 13);
  text(""+p+": \n space \n"+ p2+": \n enter", 75, 500);
}
