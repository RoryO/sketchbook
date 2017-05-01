int scale = 20;
final ArrayList<Particle> particles = new ArrayList<Particle>();
Field field;

void setup() {
  size(3000,1500,P3D);
  field = new Field(scale);
  noiseDetail(32);
  for (int i = 1; i < 25000; i++) {
    particles.add(new Particle());
  }
  background(0);
}

void draw() {
  //pushStyle();
  //textSize(32);
  //fill(0, 102, 153);
  //text(frameRate, 10, 60);
  //popStyle();
  field.frame();
  drawParticles();
  //println(frameRate);
}

void drawParticles() {
  for (Particle p : particles) {
    p.frame().applyForceFromField(field);
  }
}