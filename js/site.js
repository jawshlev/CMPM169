// index.js - purpose and description here
// Author: Your Name
// Date:

// make sure document is ready
$(document).ready(function() {
  console.log("Document ready.");

  let canvasContainer = $("#canvas-container");

  $('#fullscreen').click(function() {
    let elem = document.documentElement;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
      }
      console.log("Going fullscreen.");
      $(this).text("Exit Fullscreen");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      console.log("Exiting fullscreen.");
      $(this).text("Fullscreen");
    }
  });

  $(document).on('fullscreenchange mozfullscreenchange webkitfullscreenchange MSFullscreenChange', function() {
    if (document.fullscreenElement) {
      console.log("Entered fullscreen mode");
      $('body').addClass('is-fullscreen');
      $('#fullscreen').text("Exit Fullscreen");
      resizeCanvasToFullscreen();
    } else {
      console.log("Exited fullscreen mode");
      $('body').removeClass('is-fullscreen');
      $('#fullscreen').text("Fullscreen");
      resetCanvasSize();
    }
  });

  function resizeCanvasToFullscreen() {
    let canvas = $("canvas");
    canvas.css({
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100vw",
      "height": "100vh"
    });
  }

  function resetCanvasSize() {
    let canvas = $("canvas");
    canvas.css({
      "position": "relative",
      "width": canvasContainer.width(),
      "height": canvasContainer.height()
    });
  }

});

