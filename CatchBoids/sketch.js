var canvas;
var w = window.innerWidth;
var h = window.innerHeight;
var started;
var ended;
var score;
var won;

var leftWall;
var rightWall;
var topWall;
var bottomWall;
var gameAreaW;
var gameAreaH;

var player;
var preditor;
var boids = [];
var numBoids = 30;
var numForces = 3;

var color1;
var color2;
var color3;
var color4;

var startTime;
var endTime;
var currentTime;
var paused;

var locationX = [];
var locationY = [];
var baseMaxes = [];
var baseColors = [];
var filledBases = [];
var baseCount = [];
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setup(){
  canvas = createCanvas(w, h);
  canvas.position(0, 0);
  started = false;
  ended = false;
  won = false;
  paused = false;
  topWall = 10;
  bottomWall = h - 60;
  leftWall = 160;
  rightWall = w - 10;
  gameAreaH = bottomWall - topWall;
  gameAreaW = rightWall - leftWall;
  color1 = color(204, 255, 102);
  color2 = color(102, 255, 255);
  color3 = color(102, 255, 255);
  color4 = color(153, 255, 153);
  locationX = [w - 200, w - 600, 200];
  locationY = [h - 300, h - 700, h - 260];
  baseMaxes = [3, 5, 10];
  score = 0;

  load();
}
function draw(){
  if(!started && !ended & !won){
    menu();
  }
  if(started && ended && !won)gameOver();
  if(started && won && ended)winScreen();
  if(started && !ended & !won){
    levelOne();
    //add more levels here
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function load(){
  player = new Player();
  preditor = new Preditor();
  for(var i = 0; i < numBoids; i++){
    boids.push(new Boid(player, preditor));
  }
}
function run(){
  player.run();
  preditor.run();
  for(var i = 0; i < numBoids; i++){
    boids[i].run(boids);
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function layout(){
  background(100);

  fill(165, 165, 255);
  rect(leftWall, topWall, gameAreaW, gameAreaH);

  endTime = round(millis()/1000) - round(startTime/1000);
  if(currentTime <= 0){
    ended = true;
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function baseLocation(i){
  return createVector(locationX[i] + 80, locationY[i] + 70);
}
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == 1) {
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
}
function updateScore(){
  var count = 0;
  for(var i = 0; i < numBoids; i++){
    if(boids[i].isIn){
      count++;
    }
  }
  score = count;
  if(score >=18){
    won = true;
    ended = true;
  }
}
function checkFilled(){
  for(var i = 0; i < numForces; i++){
    for(var j = 0; j < numBoids; j++){
      if(baseLocation(i).dist(boids[j].loc)<10 && baseMaxes[i] != 0){
        baseMaxes[i] = baseMaxes[i] - 1;
        boids[j].loc = createVector(0, 0);
        boids[j].vel = createVector(0, 0);
        boids[j].invisible = true;
      }
    }
    if(baseMaxes[i] <= 0){
      baseColors[i] = color(80);
    }
  }
}
function keyPressed(){
  if(keyCode == 32 && paused == false){
    noLoop();
    paused = true;
  }
  if(keyCode == 13 && paused == true){
    loop();
    paused = false;
  }
}
function pickLoc(){
  return createVector(w/2, h/2);
}
