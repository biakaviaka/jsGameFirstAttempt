'use strict';
var Player = function(x, y, speed, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;

  this.render = function() {
    fill(33, 232, 23);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
};

window.onload = function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");

  var p1 = new Player(canvas.width / 2, canvas.height - 10, 5, 10);

  var draw = function() {
    p1.render();
  }
}

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}

function keyDownHandler(event) {
  var key = keyMap[event.keyCode]
}

function keyUpHandler(event) {
  var key = keyMap[event.keyCode]
}

window.addEventListener("keydown", keyDownHandler, false)
window.addEventListener("keyup", keyUpHandler, false)

function mainLoop(timestamp) {
  window.requestAnimationFrame(mainLoop)
}

window.requestAnimationFrame(mainLoop)
