// Modified from https://codepen.io/supah/pen/ExabJxB

/*--------------------
Vars
--------------------*/
const deg = (a) => Math.PI / 180 * a
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1))
const opt = {
  particles: window.width / 500 ? 500 : 250,
  noiseScale: 0.009,
  angle: Math.PI / 180 * -90,
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  // and then immediately hardcode for now lmao
  h1: 196, s1: 48, l1: 57, h2: 40, s2: 100, l2: 96,
  strokeWeight: 5,
}
var Particles = []
let time = 0
document.body.addEventListener('click', () => {
  opt.h1 = rand(0, 360)
  opt.h2 = rand(0, 360)
  opt.s1 = rand(20, 90)
  opt.s2 = rand(20, 90)
  opt.l1 = rand(30, 80)
  opt.l2 = rand(30, 80)
  opt.angle += deg(random(60, 60)) * (Math.random() > .5 ? 1 : -1)
  
  for (let p of Particles) {
    p.randomize()
  }
})


/*--------------------
Particle
--------------------*/
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.lx = x
    this.ly = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.angle = deg(random(60, 60)) * (Math.random() > .5 ? 1 : -1)
    this.sizemult = rand(1, 5)
    this.xrand = 20 * (rand(1, 20)/5)
    this.yrand = 20 * (rand(1, 20)/5)
    this.hueSelect = Math.random()
    this.hue = this.hueSelect > .5 ? 20 + opt.h1 : 20 + opt.h2
    this.sat = this.hueSelect > .5 ? opt.s1 : opt.s2
    this.light = this.hueSelect > .5 ? opt.l1 : opt.l2
    this.maxSpeed = this.hueSelect > .5 ? 3 : 2
  }
  
  randomize() {
    this.hueSelect = Math.random()
    this.hue = this.hueSelect > .5 ? 20 + opt.h1 : 20 + opt.h2
    this.sat = this.hueSelect > .5 ? opt.s1 : opt.s2
    this.light = this.hueSelect > .5 ? opt.l1 : opt.l2
    this.angle = deg(random(60, 60)) * (Math.random() > .5 ? 1 : -1)
    //this.maxSpeed = this.hueSelect > .5 ? 3 : 2
  }
  
  update() {
    this.follow()
    
    this.vx += this.ax
    this.vy += this.ay
    
    var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    var a = Math.atan2(this.vy, this.vx)
    var m = Math.min(this.maxSpeed, p)
    this.vx = Math.cos(a) * m
    this.vy = Math.sin(a) * m
    
    var xmov = this.vx / this.xrand
    var ymov = this.vy / this.yrand

    // Smaller particles more likely to move faster
    xmov = (xmov * (1/(this.sizemult * 1.5))) * 2
    ymov = (ymov * (1/(this.sizemult * 1.5))) * 2

    // .05 cutoff
    //                                          Preserve direction
    xmov = Math.abs(xmov) > .05 ? xmov : xmov + ((xmov / Math.abs(xmov)) * .02)
    ymov = Math.abs(ymov) > .05 ? ymov : ymov + ((ymov / Math.abs(ymov)) * .02)
    
    this.x += xmov
    this.y += ymov
    this.ax = 0
    this.ay = 0
    
    this.edges()
  }
  
  follow() {
    let angle = (noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + ((this.angle + opt.angle*2)/3)
    
    this.ax += Math.cos(angle)
    this.ay += Math.sin(angle)
    
  }
  
  updatePrev() {
    this.lx = this.x
    this.ly = this.y
  }
  
  edges() {
    if (this.x < 0) {
      this.x = width
      this.updatePrev()
    }
    if (this.x > width) {
      this.x = 0
      this.updatePrev()
    }
    if (this.y < 0) {
      this.y = height
      this.updatePrev()
    }
    if (this.y > height) {
      this.y = 0
      this.updatePrev()
    }
  }
  
  render () {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`)
    strokeWeight((opt.strokeWeight * this.sizemult )/ 2.5)
    line(this.x, this.y, this.lx, this.ly)
    this.updatePrev()
  }
}


/*--------------------
Setup
--------------------*/
function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#231F20");
  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height))
  }
  strokeWeight(opt.strokeWeight)
}


/*--------------------
Draw
--------------------*/
function draw() {
  time++
  background("#231F20");

  for (let p of Particles) {
    p.update()
    p.render()
  }
}


/*--------------------
Resize
--------------------*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background("#231F20");
  Particles = [];
  setTimeout(function(){for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height))
  }}, 5);
}
