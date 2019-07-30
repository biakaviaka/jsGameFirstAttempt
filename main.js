'use strict'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var canvasWidth = canvas.width
var canvasHeight = canvas.height

var leftPressed = false
var rightPressed = false
var upPressed = false
var downPressed = false

const keyMap = {
  39: 'right',
  37: 'left',
  38: 'up',
  40: 'down'
}

function keyDownHandler(event) {
  let key = keyMap[event.keyCode]

  if (key === 'right') {
    rightPressed = true
  } else if (key === 'left') {
    leftPressed = true
  } else if (key === 'up') {
    upPressed = true
  } else if (key === 'down') {
    downPressed = true
  }
}

function keyUpHandler(event) {
  let key = keyMap[event.keyCode]

  if (key === 'right') {
    rightPressed = false
  } else if (key === 'left') {
    leftPressed = false
  } else if (key === 'up') {
    upPressed = false
  } else if (key === 'down') {
    downPressed = false
  }
}

window.addEventListener('keydown', keyDownHandler, false)
window.addEventListener('keyup', keyUpHandler, false)

function Player() {
  this.speed = 5
  this.size = 20
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
  let newX = -1
  let newY = -1

  if (leftPressed) {
    newX = p1.x - p1.speed
  } else if (rightPressed) {
    newX = p1.x + p1.speed
  } else if (upPressed) {
    newY = p1.y - p1.speed
  } else if (downPressed) {
    newY = p1.y + p1.speed
  }

  if (newX > 0 && newX < canvasWidth) {
    p1.x = newX
  }

  if (newY > 0 && newY < canvasHeight) {
    p1.y = newY
  }

  if (leftPressed || rightPressed || upPressed || downPressed) {
    p1.draw()
  }

  window.requestAnimationFrame(mainLoop)
}

window.requestAnimationFrame(mainLoop)
