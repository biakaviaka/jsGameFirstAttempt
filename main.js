'use strict'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const canvasWidth = canvas.width
const canvasHeight = canvas.height

const pressedKeys = { up: false, down: false, left: false, right: false }

const keyMap = {
  39: 'right',
  37: 'left',
  38: 'up',
  40: 'down'
}

function clamp(min, max, num) {
  return Math.min(Math.max(min, num), max)
}

function keyEventHandler(event, isPressed) {
  let key = keyMap[event.keyCode]
  if (typeof key !== 'undefined') {
    pressedKeys[key] = isPressed
  }
}

window.addEventListener('keydown',  function(event) {
  keyEventHandler(event, true)
}, false)

window.addEventListener('keyup', function(event) {
  keyEventHandler(event, false)
}, false)

function Player() {
  this.speed = 5
  this.size = 20
  this.radius = this.size / 2
  this.x = this.size / 2
  this.y = this.size / 2
  this.color = '#D35400'
}

Player.prototype.renderBall = function() {
  context.beginPath()
  context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
  context.fillStyle = this.color
  context.fill()
  context.closePath()
}

Player.prototype.draw = function() {
  context.clearRect(0, 0, canvasWidth, canvasHeight)
  this.renderBall()
}

var p1 = new Player()
p1.renderBall()

function mainLoop(timestamp) {
  if (pressedKeys['up']) {
    p1.y = p1.y - p1.speed
  }

  if (pressedKeys['down']) {
    p1.y = p1.y + p1.speed
  }

  if (pressedKeys['left']) {
    p1.x = p1.x - p1.speed
  }

  if (pressedKeys['right']) {
    p1.x = p1.x + p1.speed
  }

  p1.x = clamp(p1.radius, canvasWidth - p1.radius, p1.x)
  p1.y = clamp(p1.radius, canvasHeight - p1.radius, p1.y)

  p1.draw()

  window.requestAnimationFrame(mainLoop)
}

window.requestAnimationFrame(mainLoop)
