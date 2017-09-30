class Path {
  constructor(radius=50, ...points) {
    this.points = [];
    for (point of points) {
      if (!point instanceof p5.Vector) { continue; }
      this.points.push(point);
    }
  }

  add(x, y) {
    this.points.push(new p5.Vector(x, y));
    return this;
  }

  update() {
    return this;

  }

  draw() {
    push();

    beginShape(LINES);
    for(point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();
    pop();
    return this;
  }
}

class MotionBody {
  constructor(x=50, y=50, mass=1) {
    this.maxspeed = 5;
    this.location = new p5.Vector(x, y);
    this.acceleration = new p5.Vector();
    this.velocity = new p5.Vector();
    this.mass = mass;
    this.xoff = random() * 10000;
    this.yoff = random() * 10000;
    this.wanderPoint = new p5.Vector();
  }

  update() {
    this.updateWanderPoint();
    this.applyFriction();
    this.velocity.limit(this.maxspeed);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.bounce();
    this.acceleration.mult(0);
    this.xoff += 0.001;
    this.yoff += 0.001;
    return this;
  }

  applyForce(vec) {
    vec.div(this.mass);
    this.acceleration.add(vec);
    return this;
  }

  draw() {
    push();
    fill(map(this.velocity.mag(), 0, this.maxspeed * 2, 0, 255));
    translate(this.location.x, this.location.y);
    ellipse(0, 0, (this.mass * 5));
    pop();

    push();
    translate(this.wanderPoint.x, this.wanderPoint.y);
    fill(color(0, 218, 255));
    ellipse(0, 0, 10);
    pop();

    return this;
  }

  seek(targetLocation) {
    let desired = p5.Vector.sub(targetLocation, this.location);
    let mag = desired.mag();
    desired.normalize();
    if (mag < 150) {
      desired.mult(map(mag, 0, 150, 0, this.maxspeed));
    } else {
      desired.mult(this.maxspeed);
    }
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(1);
    this.applyForce(steer);
    return this;
  }

  avoid(targetLocation) {
    let desired = p5.Vector.sub(targetLocation, this.location);
    desired.normalize();
    desired.mult(this.maxspeed * 0.75);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(1);
    this.applyForce(steer.mult(-1));
    return this;
  }

  updateWanderPoint() {
    let x = noise(this.xoff) * height;
    let y = noise(this.yoff) * width;
    this.wanderPoint = new p5.Vector(x, y);
  }

  wander() {
    this.seek(this.wanderPoint);
    return this;
  }

  decide(targetLocation, repulsor) {
    if(this.location.dist(targetLocation) < 300) {
      this.seek(targetLocation);
    } else if (this.location.dist(repulsor) < 150) {
      this.avoid(repulsor);
    } else {
      this.wander();
    }
    return this;
  }

  bounce() {
    if (this.location.x > width) {
      this.location.x = height;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    } else if (this.location.y >= height) {
      this.velocity.y *= -1;
      this.location.y = width;
    }
    return this;
  }

  applyFriction() {
    let frictionCounterForce = this.velocity.copy();
    frictionCounterForce.normalize;
    frictionCounterForce.mult(-1);
    let friction = 0.01;
    let normal = 1;
    let frictionMag = friction * normal;
    frictionCounterForce.mult(frictionMag);
    this.applyForce(frictionCounterForce);
    return this;
  }
}

function* range(from, to) {
  let i = from;
  while(i <= to) { yield i; i++; }
  return;
}

function upto(n, f) {
  for(let i of range(1, n)) { f(i); }
}

let things = [];
let attractor, repulsor;

function setup() {
  createCanvas(800, 800);
  background(56);
  attractor = new p5.Vector(random(0, width), random(0, height));
  repulsor = new p5.Vector(random(0, width), random(0, height));
  upto(75, () => {
    let x = random(0, height);
    let y = random(0, width);
    let mass = random(1, 5);
    things.push(new MotionBody(x, y, mass));
  });
}

function draw() {
  background(56);

  push();
  translate(attractor.x, attractor.y);
  fill(color(255, 204, 0));
  ellipse(0, 0, 15);
  pop();

  push();
  translate(repulsor.x, repulsor.y);
  fill(color(204, 255, 0));
  ellipse(0, 0, 15);
  pop();

  for (let thing of things) {
    // gravity
    //thing.applyForce(new p5.Vector(0, 0.5));
    thing.
      decide(attractor, repulsor).
      update().
      draw();

    if (thing.location.dist(attractor) < 15 ) {
      thing.location.x = random(0, width);
      thing.location.y = random(0, height);
      thing.velocity.x = random(-thing.maxspeed * 2, thing.maxspeed * 2);
      thing.velocity.y = random(-thing.maxspeed * 2, thing.maxspeed * 2);
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    attractor.x = mouseX;
    attractor.y = mouseY;
  } else if (mouseButton === RIGHT) {
    repulsor.x = mouseX;
    repulsor.y = mouseY;
  }
  return false;
}
