const keys = {}

class Keyboard {
  constructor(){
    document.addEventListener("keydown", this.keyDownHandler, false)
    document.addEventListener("keyup", this.keyUpHandler, false)
  }

  keyDownHandler(e){
    keys[e.keyCode] = 1
  }

  keyUpHandler(e){
    keys[e.keyCode] = 0
  }

  get(ch){
    return keys[ch] ? keys[ch] : 0
  }
}

class Player {
  constructor(ctx, x, y){
    this.ctx = ctx

    this.x = x
    this.y = y
    this.width = 13
    this.height = 110

    this.speed = 4
    this.score = 0
  }

  state(){
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      ref: this
    }
  }

  draw(){
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.width, this.height)
    this.ctx.fillStyle = "#DC143C"
    this.ctx.fill()
    this.ctx.closePath()
  }

  move(offset){
    this.y += offset * this.speed
  }

  incrementScore(){
    this.score += 1
  }
}

class Ball {
  constructor(ctx){
    this.ctx = ctx

    this.x = 240
    this.y = 160
    this.radius = 13
    this.dx = 3
    this.dy = -3
    this.acceleration = 0.5
  }

  state(){
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      ref: this
    }
  }

  draw(){
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
    this.ctx.fillStyle = "#C4C4C4"
    this.ctx.fill()
    this.ctx.closePath()
  }

  bounce(parity){
    if(Math.abs(this.x) < 12){
      this.dx = parity * (Math.abs(dx) - 3)
    } else {
      this.dx = - this.dx
    }
  }

  update(state){
    if(
      this.x - this.radius <= state.p1.x + 13 &&
      this.x >= state.p1.x &&
      this.y > state.p1.y &&
      this.y < state.p1.y + state.p1.height
    ){
      if(Math.abs(this.dx) < 23){
        this.dx = this.acceleration + Math.abs(this.dx)
      }
    }
    else if(
      this.x + this.radius >= state.p2.x &&
      this.x <= state.p2.x + this.radius &&
      this.y >= state.p2.y &&
      this.y <= state.p2.y + state.p2.height
    ){
      if(Math.abs(this.dx) < 23){
        this.dx = - this.acceleration - Math.abs(this.dx)
      }
    }
    else if(this.x + this.dx >= state.width - this.radius){
      state.p1.ref.incrementScore()
      this.bounce(-1)
    }
    else if(this.x + this.dx <= this.radius){
      state.p2.ref.incrementScore()
      this.bounce(1)
    }

    if(this.y + this.dy > state.height - this.radius ||
      this.y + this.dy < this.radius){
      this.dy = - this.dy
    }

    this.x += this.dx
    this.y += this.dy
  }
}

class Game {
  constructor(ctx, canvas){
    this.ctx = ctx

    this.width = canvas.width
    this.height = canvas.height

    this.p1 = new Player(ctx, 20, 40)
    this.p2 = new Player(ctx, 867, 40)
    this.ball = new Ball(ctx)
    this.keyboard = new Keyboard()
  }

  state(){
    return {
      p1: this.p1.state(),
      p2: this.p2.state(),
      ball: this.ball.state(),
      width: this.width,
      height: this.height
    }
  }

  scorecard(){
    ctx.font = "200px Roboto"
    ctx.fillStyle = "#EFEFEF"
    ctx.textAlign = "center"
    ctx.fillText(this.p1.score, 225, 300)
    ctx.fillText(this.p2.score, 450 + 225, 300)
  }

  draw(){
    this.scorecard()
    this.p1.draw()
    this.p2.draw()
    this.ball.draw()
  }

  update(){
    this.ball.update(this.state())

    this.p1.move(this.keyboard.get(83) - this.keyboard.get(87))
    this.p2.move(this.keyboard.get(40) - this.keyboard.get(38))

    this.draw()
  }
}

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx, canvas)

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // eslint-disable-next-line
  let mainLoop = window.requestAnimationFrame(update)

  game.update()
}

update()
