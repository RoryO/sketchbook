final ArrayList<Particle> particles = new ArrayList<Particle>();
Field field;

void setup() {
  size(3000,1500,P3D);
  field = new Field(20);
  noiseDetail(32);
  for (int i = 1; i < 25000; i++) {
    particles.add(new Particle());
  }
  background(0);
}

void draw() {
  field.frame();
  drawParticles();
  //println(frameRate);
}

void drawParticles() {
  for (Particle p : particles) {
    p.frame().applyForceFromField(field);
  }
}