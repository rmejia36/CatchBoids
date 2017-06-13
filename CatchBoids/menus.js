function menu(){
  cursor(HAND);
  setGradient(0, 0, width, height, color3, color4, 1);

  push();
  translate(w/2, h/2);
  noStroke();
  fill(60);
  rect(-83, 33, 160, 60);
  fill(100);
  rect(-80, 30, 160, 60);
  textAlign(CENTER);
  fill(255);
  textFont("impact");
  textSize(36);
  text("Start", 0, 75);
  fill(255);
  textSize(80);
  text("Catch The Boids", -3, -37);
  fill(80);
  text("Catch The Boids", 0, -40);
  fill(255);
  textSize(24);
  text("Go over a boid and click to drag, but go slow or they won't keep up.", -3, 193);
  fill(80);
  text("Go over a boid and click to drag, but go slow or they won't keep up!", 0, 190);
  pop();

  if(collidePointRect(mouseX, mouseY, w/2 - 80, h/2 + 30, 160, 60)){
    noStroke();
    fill(60);
    rect(w/2 - 80, h/2 + 30, 160, 60);
    textAlign(CENTER);
    fill(255);
    textFont("impact");
    textSize(36);
    text("Start", w/2, h/2 + 75);
    if(mouseIsPressed){
      startTime = millis();
      started = true;
    }
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function gameOver(){
  cursor(HAND);
  setGradient(0, 0, width, height, color3, color4, 1);

  push();
  translate(w/2, h/2);
  noStroke();
  fill(60);
  rect(-83, 83, 160, 60);
  fill(100);
  rect(-80, 80, 160, 60);
  textAlign(CENTER);
  fill(255);
  textFont("impact");
  textSize(36);
  text("Again?", 0, 125);
  fill(255);
  textSize(60);
  text("Game Over", -3, -37);
  fill(80);
  text("Game Over", 0, -40);
  fill(255);
  text("You got " + score + " boids out of 18!", -3, -197);
  fill(80);
  text("You got " + score + " boids out of 18!", -3, -200);
  pop();

  if(collidePointRect(mouseX, mouseY, w/2 - 80, h/2 + 80, 160, 60)){
    noStroke();
    fill(60);
    rect(w/2 - 80, h/2 + 80, 160, 60);
    textAlign(CENTER);
    fill(255);
    textFont("impact");
    textSize(36);
    text("Again?", w/2, h/2 + 125);
    if(mouseIsPressed && !won && ended){
      started = false;
      ended = false;
      won = false;
    }
  }
  if(ended){
    for(var i = 0; i < numBoids; i++){
      boids[i] = new Boid(player, preditor);
    }
    baseMaxes[0]=3;
    baseMaxes[1]=5;
    baseMaxes[2]=10;

  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function winScreen(){
  cursor(HAND);
  setGradient(0, 0, width, height, color3, color4, 1);

  push();
  translate(w/2, h/2);
  noStroke();
  fill(60);
  rect(-83, 83, 160, 60);
  fill(100);
  rect(-80, 80, 160, 60);
  textAlign(CENTER);
  fill(255);
  textFont("impact");
  textSize(36);
  text("Again?", 0, 125);
  fill(255);
  textSize(60);
  text("Congratulations!", -3, -37);
  fill(204, 163, 0);
  text("Congratulations!", 0, -40);
  fill(255);
  text("You got " + score + " boids out of 18!", -3, -197);
  fill(204, 163, 0);
  text("You got " + score + " boids out of 18!", -3, -200);
  pop();

  if(collidePointRect(mouseX, mouseY, w/2 - 80, h/2 + 80, 160, 60)){
    noStroke();
    fill(60);
    rect(w/2 - 80, h/2 + 80, 160, 60);
    textAlign(CENTER);
    fill(255);
    textFont("impact");
    textSize(36);
    text("Again?", w/2, h/2 + 125);
    if(mouseIsPressed && won){
      started = false;
      ended = false;
      won = false;
    }
  }
  if(ended){
    for(var i = 0; i < numBoids; i++){
      boids[i] = new Boid(player, preditor);
    }
    baseMaxes[0]=3;
    baseMaxes[1]=5;
    baseMaxes[2]=10;

  }
}
