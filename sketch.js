// WHEELS OF m̵̡͖͌i̴̻̒͝s̷͍̣̆̆f̸͈͉́̐o̴̲̟͋r̶͚͈̐t̸͍̲̍u̴̘̻̚n̴̗̾e̶̬̐ - A SOPHY HOLLINGTON STUDY
// 13th November, 2022
// Samuel Mui Shen Ern
// An interactive, urban esoteric "misfortune" telling piece featuring two concentric wheels displaying a set of ambiguously okkultic symbols.
// An idol and a set of three skulls adorn the wheels.
// Clicking the piece spins the wheels and animates the piece, providing you with your "misfortune".

let speed, timeCount; // set the values used to animate the wheel spinning
let speedYes; // set boolean used to start the wheel spinning
let speedStop; // used to set the "stop" parameter for the animation
let newFont; // set container for new font
let star1, star2; // set starting angles for the stars on the background

// preload the custom font
function preload() {
  newFont = loadFont('assets/fun.ttf');
}

function setup() {
  createCanvas(500, 500);
  angleMode(RADIANS);
  rectMode(CENTER);
  speed = 0;

  speedStop = 0;
  speedYes = false;
  timeCount = 0;

  // adjust the starting rotation of the stars
  star1 = PI/7;
  star2 = PI/7;
}

function draw() {
  background(0);

  // this timer animates and syncs up the color flicker and animation of the stars, wheels, text, and eyes for the skulls.
  if (speedYes) {speed = lerp(speed, speedStop, 0.01);
                 star1 = lerp(speed, speedStop, 0.01);
                 star2 = lerp(speed, speedStop, 0.01); 
                 timeCount = floor(lerp(speed, speedStop, 0.01)*10);
                } 

  fill(255);
  
  // this function creates the patterened border around the piece
  createBorder();
  
  // this function creates the rotating stars at the top right and left corners
  createBack();

  // this function creates the three skulls that border the wheels
  skullBorder();

  // this function creates the two wheels at the centre of the piece 
  createLoop(width - width/3, height - height/3, width/30, speed, 0);
  createLoop(width/2.4, height/2.4, width/40, -speed, PI/10);

  // this function creates the teeth of the three skulls the frame the wheel "spokes"
  // it is separate from the skulls themselves because it has to be layered on top of the wheel
  teethBorder();

  // this function draws the idol at the centre of the wheels
  idol();

  // draw the text
  push();
    textFont(newFont, 70);
    stroke(0);
    strokeWeight(10);

    colorFlicker2(fill(255, 80, 80), timeCount);
    textAlign(CENTER);
    text('CLICK TO SPIN', width/2, height - height/20);
  pop();

}

// when the mouse is pressed, begin the lerp animation by setting a new 'stop' parameter
function mousePressed() {
  if (speed >= speedStop - 0.5) { // on a respin, this if statement only lets you respin the wheel once it has reached close to the end of its spin cycle
    let randomizer = floor(random(3, 5));
    speedStop += (PI/2*randomizer); // set the new stop parameter for the lerp animation
    
    // spin the stars on the background
    star1 += (TWO_PI*randomizer);
    star2 += (TWO_PI*randomizer);

    return speedYes = true;

  }
}

// creates the patterened border for the piece
function createBorder() {
  for(let x = 0; x <= width; x += width/20) {
    for (let y = 0; y <= height; y += height/20) {
      if (borderTrue(x, y)) {
       push();
         translate(x, y); 
         for (let i = 0; i < 4; i++) {
            rotate(PI/2);
              triangle(0, 0, width/40, height/40, 0, height/40);
          }  
        pop();
      }
    }
  }
}


// this function is used to keep the border pattern within a certain pattern
function borderTrue(x, y) {
  if (x <= width/20 || x >= width - width/20 || y <= height/20 || y >= height - height/20) {
    return true;
  }
}

// this function create a wheel at the centre of the piece
function createLoop(xRadius, yRadius, thickness, speed, angleShift) {
  push();
    translate(width/2, height/2);

    rotate(speed + angleShift);
    noFill();

    // draw the golden center of the wheel
    strokeWeight(thickness);
    stroke('gold');
    ellipse(0, 0, xRadius, yRadius);

    // draw the individual sections of the wheel
    stroke(0);
    strokeWeight(5);

    let slice = TWO_PI/20;
    let picker = 0;
    for (let i = 0; i <= TWO_PI; i += slice) {
      rotate(slice);

      let sz = xRadius/15;
      let xStart = xRadius/2;

      fill(255);

      quad(xStart + sz, sz,
              xStart - sz, sz  - sz/3,
              xStart - sz, -sz  + sz/3,
              xStart + sz, -sz);

      patternSwatch(picker % 4, xStart, 0, sz*(4/5))
      picker++;  
    }
  pop();
}


// this function contains a set of patterns for the wheel
function patternSwatch(index, x, y, sz) {

  push();
  translate(x, y);
  strokeWeight(2);

  switch(index) {
    case 0: // concentric circle pattern
      fill(255);
      ellipse(0, 0, sz);
      ellipse(0, 0, sz - sz/2);

      break;
    
   case 1: // flower pattern
    fill(0);
    noStroke();
      beginShape();
        vertex(0, sz/2);
        vertex(-sz/2, 0);
        vertex(0, -sz/2);

      let gap = sz*1/6;
     
        curveVertex(0, -sz/2);
        curveVertex(0, -sz/2);
          curveVertex(sz/3, -sz/2 + gap);
           curveVertex(sz/5, -sz/2+(gap*2));
              curveVertex(sz*(3/5), -sz/2+(gap*3));
          curveVertex(sz/5, -sz/2+(gap*4));
          curveVertex(sz/3, -sz/2+(gap*5));
        curveVertex(0, sz/2);
        curveVertex(0, sz/2);
      endShape(CLOSE);
      break;
    
   case 2: // cross pattern
      push();
        strokeWeight(3);
        line(sz*(2/3), 0, 0, 0);
        strokeWeight(1);
        fill(0);
        rotate(TWO_PI/3);
        for (let i = 0; i < 3; i ++) {
          
          rotate(PI/2 * i);
          triangle(0, 0, sz/3, sz/3, 0, sz/3);
        }
      pop();

      break;
    
  case 3: // squiggle pattern
        let tip = sz*(3/5);
        beginShape();
          curveVertex(tip, 0);
          curveVertex(tip, 0);

          for (let i = 0; i < 12; i++) {
            let wave = sz * 1/12 * i;
            curveVertex(tip - wave, sin(i)*(sz/2));
          }

          curveVertex(-tip, 0);
          curveVertex(-tip, 0);
        endShape();
  
    break;

 case 4: // cube pattern
    for (let i = 0; i < 6; i++) {
      rotate(PI/3);
      line(sz/2, -sz/3, sz/2, sz/3);
    }

    for (let i = 0; i < 3; i++) {
      rotate(PI/1.5);
      line(0, 0, sz/2, sz/3);
    } ;
    
    break;
    
  }
pop();
}

// draw the skulls around the wheels
function skullBorder() {

  push();
    translate(width/2, height/2);

    fill(255);
    strokeWeight(5);

    for (let i = 0; i < 3; i++) {

      // adjustments for the 2nd and 3rd skull
      if (i == 1) { rotate(PI/30)};
      if (i == 2) { rotate(-PI/30*2)};

      push();
      rotate(TWO_PI/3 * i);
      circle(0, -height/2 + height/10, 75);

      fill(0);
      circle(14, -height/2 + height/13, 11);
      circle(-14, -height/2 + height/13, 11);
      circle(0, -height/2 + height/19, 8);

      noStroke();

      colorFlicker1(fill(255, 80, 80), timeCount);
      circle(16, -height/2 + height/13, 5);

      colorFlicker2(fill(255, 80, 80), timeCount);
      circle(-16, -height/2 + height/13, 5);

      fill('gold');
      circle(0, -height/2 + height/20, 4);
      pop();
    }
  pop();
}

function teethBorder() {
  push();
    translate(width/2, height/2);

    for (let i = 0; i < 3; i++) {
      push();
      rotate(TWO_PI/3 * i);

      // adjustments for the 2nd and 3rd sets of teeth
      if (i == 1) { rotate(PI/30)};
      if (i == 2) { rotate(-PI/30)};

      strokeWeight(3);
      fill(255);

    // draw the outer teeth
    beginShape();
      curveVertex(-16, -height/2 + height/9);
      curveVertex(-16, -height/2 + height/9);
        curveVertex(-17, -height/2 + height/7);      
          curveVertex(-30, -height/2 + height/5);
        curveVertex(-26, -height/2 + height/7);
      curveVertex(-30, -height/2 + height/9);
      curveVertex(-30, -height/2 + height/9);
    endShape(OPEN);

    beginShape();
      curveVertex(16, -height/2 + height/9);
      curveVertex(16, -height/2 + height/9);
        curveVertex(17, -height/2 + height/7);
         curveVertex(30, -height/2 + height/5);
        curveVertex(26, -height/2 + height/7);
      curveVertex(30, -height/2 + height/9);
      curveVertex(30, -height/2 + height/9);
    endShape(OPEN);

    // draw the inner teeth
    beginShape();
      curveVertex(-14, -height/2 + height/9);
      curveVertex(-14, -height/2 + height/9);
        curveVertex(-3, -height/2 + height/7);
        curveVertex(-4, -height/2 + height/9);
      curveVertex(-2, -height/2 + height/9);
      curveVertex(-2, -height/2 + height/9);
    endShape(OPEN);

    beginShape();
      curveVertex(14, -height/2 + height/9);
      curveVertex(14, -height/2 + height/9);
        curveVertex(3, -height/2 + height/7);
        curveVertex(4, -height/2 + height/9);
      curveVertex(2, -height/2 + height/9);
      curveVertex(2, -height/2 + height/9);
    endShape(OPEN);
    pop();
  
  }
  pop();
}

function idol() {
  push();
    fill('gold');
    circle(width/2, height/2, 130);  

    stroke(255);
    fill(255);
    strokeWeight(5);

    let xCnt = width/2;
    let yCnt = height/2;

    stroke(255);
    fill(0);

    //draw the idol's shoulders
    beginShape();
      curveVertex(xCnt, height*(2/3));
      curveVertex(xCnt, height*(2/3));
        curveVertex(xCnt - 30, height - 90);
          curveVertex(xCnt - 70, height - 110);
        curveVertex(xCnt - 90, height - 40);
      curveVertex(xCnt - 120, height - 50);
      
      vertex(xCnt - 130, height + 10);
      vertex(xCnt, height + 10);
      vertex(xCnt, height);
    endShape();


   beginShape();
    curveVertex(xCnt, height*(2/3));
    curveVertex(xCnt, height*(2/3));
      curveVertex(xCnt + 30, height - 90);
        curveVertex(xCnt + 70, height - 110);
      curveVertex(xCnt + 90, height - 40);
    curveVertex(xCnt + 120, height - 50);

    vertex(xCnt + 130, height + 10);
    vertex(xCnt, height + 10);
    vertex(xCnt, height);
  endShape();

    // draw the idol's head
    ellipse(xCnt, yCnt + 40, 70, 150);

    let wide = 50;

    // draw the idol's eyes
    for (let i = 0; i <= 40; i += 40) {
      fill(255);
      stroke(3);
      beginShape();
        curveVertex(xCnt + wide, yCnt + i);
        curveVertex(xCnt + wide, yCnt + i);
          curveVertex(xCnt, yCnt + i + 15);
        curveVertex(xCnt - wide, yCnt + i);
        curveVertex(xCnt - wide, yCnt + i);
      endShape();
      
      beginShape();
        curveVertex(xCnt + wide, yCnt + i);
        curveVertex(xCnt + wide, yCnt + i);
          curveVertex(xCnt, yCnt + i - 15);
        curveVertex(xCnt - wide, yCnt + i);
        curveVertex(xCnt - wide, yCnt + i);
      endShape();
      
      // draw the idol's pupils
      fill(80, 80, 225);
      ellipse(xCnt, yCnt + i, 25, 25);
    }

    let tooth = 8;
    noStroke();
    fill(255);
    for (let i = -tooth*2; i <= tooth*2; i += tooth) {
      square(xCnt - i, yCnt + 68, tooth - 2);
      square(xCnt - i, yCnt + 68 + tooth, tooth - 2);
    }

  pop();

}

// draw the stars on the background
function createBack() {
  let sz = 15;
  let pt = 40;

  push();
  translate(width/6.5, height/6.5);
  strokeWeight(4);

    push();
    colorFlicker2(fill('gold'), timeCount);
    rotate(star1);
    star(0, 0, sz+sz/2, pt+pt/3, 5);
    pop();

    push();
    colorFlicker1(fill('gold'), timeCount);
    rotate(-star1 + PI/8);
    star(0, 0, sz, pt, 5);
    pop();


    noStroke();
    push();
    colorFlicker2(fill('gold'), timeCount);
    translate(width/8, -height/29);
    rotate(star1);
    star(0, 0, sz/2, pt/3, 5);
    pop();

    push();
    colorFlicker1(fill('gold'), timeCount);
    translate(-width/29, height/7);
    rotate(-star1);
    star(0, 0, sz/2, pt/3, 5);
    pop();

    pop();

    
  push();
  translate(width - width/6.5, height/6.5);
  strokeWeight(4);

   push();
   colorFlicker1(fill('gold'), timeCount);
   rotate(star2);
   star(0, 0, sz+sz/2, pt+pt/3, 5);
   pop();

   push();
   colorFlicker2(fill('gold'), timeCount);
   rotate(-star2+ PI/8);
   star(0, 0, sz, pt, 5);
   pop();

   noStroke();
   push();
   colorFlicker1(fill('gold'), timeCount);
   translate(-width/8, -height/29);
   rotate(star1);
   star(0, 0, sz/2, pt/3, 5);
   pop();


   push();
   colorFlicker2(fill('gold'), timeCount);
   translate(width/29, height/7);
   rotate(-star1);
   star(0, 0, sz/2, pt/3, 5);
   pop();

  pop();
}


// star function taken from: https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// these functions flicker the fill color depending on the speed of a timer input
function colorFlicker1(color, timer) {
  if (timer % 2 == 1) { color; }
  else { fill(255); }
}
function colorFlicker2(color, timer) {
  if (timer % 2 == 0) { color; }
  else { fill(255); }
}