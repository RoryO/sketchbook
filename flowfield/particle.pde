class Particle {
  PVector pos = new PVector(random(width), random(height));
  PVector previousPos = pos.copy();
  PVector vel = PVector.random2D();
  PVector acc = new PVector(0, 0);
  color c = color(
    map(random(1), 0, 1, 0, 255),
    map(random(1), 0, 1, 0, 255),
    map(random(1), 0, 1, 0, 255),
    5
  );

  Particle update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    vel.limit(2);
    return this;
  }
    
  Particle applyForce(PVector force) {
    this.acc.add(force);
    return this;
  }
  
  Particle show() {
    pushStyle();
    strokeWeight(3);
    stroke(255, 1);
    //stroke(c);
    line(pos.x, pos.y, previousPos.x, previousPos.y);
    popStyle();
    return this;    
  }
  
  Particle wrapEdges() {
    if (pos.x > width) { pos.x = 0; }
    if (pos.x < 0) { pos.x = width; }
    if (pos.y > height) { pos.y = 0; }
    if (pos.y < 0){ pos.y = height; }
    
    return this;
  }
  
  Particle frame() {
    update();
    show();
    wrapEdges();
    updatePrevious();
    return this;
  }
  
  Particle followField(Field field) {
    applyForceFromField(field);
    return this; 
  } 
 
  Particle applyForceFromField(Field field) {
    applyForce(field.atScreenLocation(pos.x, pos.y));
    return this;
  }
  
  Particle updatePrevious() {
    previousPos = pos.copy();
    return this;
  }
  
  String toString() {
    return String.format("vel: %s acc: %s x: %s y: %s", vel, acc, pos.x, pos.y);
  }
}