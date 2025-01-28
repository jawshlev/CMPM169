// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let canvasContainer;
var centerHorz, centerVert;

("use strict");

let messages = [
  "Eating the words that have yet to leave your tongue",
  "I hope my teeth fall from my mouth,\n Into the cracks of my shoes, \n So people can hear them crunch,\n With each step I steal from the earth",
  "A kiss is the beginning to cannibalism",
  "Sorrow befalls me,\n No words describe it,\n No means to euthanize it,\n My jaw unhinged,\n",
  "We try so hard to break the mold,\n But when you die mold will mark what remains",
  "The last kiss we ever shared,\n Was passed through a cigarette,\n",
  "No smoking,\n No crying",
];
let selectedMessage;
var formResolution = 15;
var stepSize = 2;
var distortionFactor = 1;
var initRadius = 150;
var centerX;
var centerY;
var x = [];
var y = [];
//handpose stuff
let video;
let handPose;
let hands = [];

let tempX = 0;
let tempY = 0;
var filled = false;
var freeze = false;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  // Find our canvas container
  canvasContainer = $("#canvas-container");
  
  // Create a canvas with the same dimensions as the container
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Resize the canvas when the window is resized
  $(window).resize(function() {
    resizeScreen();
  });

  // Initial resize to match the container
  resizeScreen();

  video = createCapture({ video: { facingMode: "user" }, audio: false });
  video.size(width,height);  // Match the container size
  video.style('width', '320px');  // Scale down display size
  video.style('height', '240px');
  video.parent("video-container");
  handPose.detectStart(video, gotHands);
  // video.hide();
  // videoDisp.size(320, 240);
  // videoDisp.parent("video-container");

  // Text choosing
  selectedMessage = random(messages);

  // Initialize shape properties
  centerX = width / 2;
  centerY = height / 2;
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }

  stroke(0, 50);
  strokeWeight(0.75);
  background(255);
  freeze = true;
}

function resizeScreen() {
  // Adjust canvas size to match the container
  let containerWidth = canvasContainer.width();
  let containerHeight = canvasContainer.height();

  // Resize the canvas to match container dimensions
  resizeCanvas(containerWidth, containerHeight);

  // Recenter elements based on the new canvas size
  centerX = containerWidth / 2;
  centerY = containerHeight / 2;

  // If you need to redraw elements, you can add that here
  console.log("Canvas resized to: " + containerWidth + " x " + containerHeight);
}

function draw() {
  if (filled) {
    fill(random(255));
  } else {
    noFill();
  }

  beginShape();
  // first controlpoint
  curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  curveVertex(x[0] + centerX, y[0] + centerY);

  // end controlpoint
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
  //text implementation
  push();
  textFont("IM Fell DW Pica SC");

  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  text(selectedMessage, width / 2, height / 2);
  pop();
  // init shape
  //Handpose stuff
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // let d = dist(index.x, index.y, thumb.x, thumb.y);//thumb and index distance
        if (hand.handedness == "Left") {
          let handCenter = hand.middle_finger_mcp;
          let middleTip = hand.middle_finger_tip;
          let d = dist(handCenter.x, handCenter.y, middleTip.x, middleTip.y);
          //making the circle follow the hand
          tempX = handCenter.x;
          tempY = handCenter.y;
          // calculate new points
          d = d + 1.5;
          for (var i = 0; i < formResolution; i++) {
            x[i] += random(-d * 0.05, d * 0.05);
            y[i] += random(-d * 0.05, d * 0.05);

            // uncomment the following line to show position of the agents
            //    //ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
            // }
            //         }
            if (hand.handedness == "Right") {
            }
          }
        }
      }
    }
  } else {
    // floating towards mouse position
    tempX = mouseX;
    tempY = mouseY;
  }
  centerX += (tempX - centerX) * 0.01;
  centerY += (tempY - centerY) * 0.01;
  if (freeze) {
    noLoop();
  } else {
    loop();
  }
}

function mousePressed() {
  // init shape on mouse position
  centerX = mouseX;
  centerY = mouseY;
  var angle = radians(360 / formResolution);
  var radius = initRadius * random(0.5, 1);
  for (var i = 0; i < formResolution; i++) {
    x[i] = cos(angle * i) * initRadius;
    y[i] = sin(angle * i) * initRadius;
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    background(255);
    selectedMessage = random(messages);
  }
  if (key == "1") {
    noStroke();
    filled = false;
  }
  if (key == "2") filled = true;

  // pauze/play draw loop
  if (key == "f" || key == "F") freeze = !freeze;
  if (freeze) {
    noLoop();
  } else {
    loop();
  }
}

