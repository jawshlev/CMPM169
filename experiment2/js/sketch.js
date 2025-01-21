// sketch.js - Displays a video on a canvas
// Author: Your Name
// Date:

let vid;
let playing = true;
let canvasContainer;
let centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Center horizontally
  centerVert = canvasContainer.height() / 2; // Center vertically
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  // Set up the canvas to fit the container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Handle window resizing
  $(window).resize(function () {
    resizeScreen();
  });
  resizeScreen();

  // Load the video
  vid = createVideo("img/angelshalo.mp4");
  vid.size(720, 1200); // Set video resolution
  vid.volume(0); // Mute the video
  vid.loop(); // Loop the video
  vid.hide(); // Hide the default video element
}

function draw() {
  background(220);

  // Display the video centered on the canvas
  image(vid, (width - 720) / 2, (height - 1200) / 2, 720, 1200);
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