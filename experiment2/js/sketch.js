// sketch.js - Displays a rotating rectangle with a video background
// Author: Your Name
// Date:

// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;
let vid;
let playing = true;

// Globals
let myInstance;
let canvasContainer;
let centerHorz, centerVert;

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // Add any desired behavior here
  }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  // Place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Resize canvas when the page is resized
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  // Load the video
  vid = createVideo("img\angelshalo.mp4"); // Use forward slashes for file paths
  vid.size(720, 1200); // Set video resolution
  vid.volume(0); // Mute the video
  vid.loop(); // Play the video in a loop
  vid.hide(); // Hide the default video element
}

function draw() {
  background(220);

  // Display the video on the canvas
  image(vid, (width - 720) / 2, (height - 1200) / 2, 720, 1200);

  // Call a method on the instance
  myInstance.myMethod();

  // Set up rotation for the rectangle
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);
}

function mousePressed() {
  // Toggle video playback on mouse press
  if (playing) {
    vid.pause();
  } else {
    vid.play();
  }
  playing = !playing;
}
