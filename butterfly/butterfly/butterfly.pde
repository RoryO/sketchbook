void setup() {
  size(500, 500);
}

float yoff = 0;  
float transShift = 0;
void draw() {
  background(56);
  translate(width / 2, height / 2);
  rotate(-PI/2);
  float xoff = 0;
  beginShape();
  fill(128, 25);
  for (float a = PI / 2; a <= 5*PI/2; a += 0.05) {
    float n = noise(xoff, yoff);
    float r = sin(2*a) * map(n, 0, 1, 50, 80);
    float multi = 1.9;
    if (a <= PI || a >= 2*PI) { 
      multi = 2.6;
    }

    float x = r * multi * cos(a);
    float beatShift = sin(yoff);
    float y = r * beatShift * multi * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  yoff += 0.05;
  transShift += 0.001;
} //<>//