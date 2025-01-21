// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Constants
const VIDEO_WIDTH = 720;
const VIDEO_HEIGHT = 1200;
let vid;
let canvasContainer;
let videoPlaying = false;

// setup() function is called once when the program starts
function setup() {
  // Place the canvas, making it fit the container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Load the video
  vid = createVideo("angelshalo.mp4", videoLoaded);
  vid.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  vid.volume(0);   // Start muted due to autoplay policy
  vid.loop();      // Loop the video
  vid.hide();      // Hide the actual HTML video element
}

// Callback when the video is loaded
function videoLoaded() {
  vid.play();  // Start video muted
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0); // Optional: clear the canvas with black

  // Calculate the aspect ratio to fit the video in the canvas without distortion
  let canvasAspect = canvasContainer.width() / canvasContainer.height();
  let videoAspect = VIDEO_WIDTH / VIDEO_HEIGHT;

  let drawWidth, drawHeight;

  if (canvasAspect > videoAspect) {
    // Canvas is wider than the video
    drawHeight = canvasContainer.height();
    drawWidth = (VIDEO_WIDTH / VIDEO_HEIGHT) * drawHeight;
  } else {
    // Canvas is taller than the video
    drawWidth = canvasContainer.width();
    drawHeight = (VIDEO_HEIGHT / VIDEO_WIDTH) * drawWidth;
  }

  // Center the video
  let centerX = (canvasContainer.width() - drawWidth) / 2;
  let centerY = (canvasContainer.height() - drawHeight) / 2;

  // Draw the video on the canvas while keeping the aspect ratio
  image(vid, centerX, centerY, drawWidth, drawHeight);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // Toggle play/pause on mouse press
  if (videoPlaying) {
    vid.pause();
    videoPlaying = false;
  } else {
    vid.play();
    vid.volume(1); // Enable audio after the user interacts with the page
    videoPlaying = true;
  }
}
