let n, a, c, noiseOff;
function setup() {
  createCanvas(500, 500);
  background(56);
  colorMode(HSB);
  n = 0;
  a = radians(137.3);
  c = 8;
  noiseOff = 0.0;
}

function draw() {
  translate(width/2, height/2);
  const r = c * sqrt(n);
  const theta = n * a;
  const x = r * cos(theta);
  const y = r * sin(theta);
  const colorV = map(n % 100, 0, 100, 60, 150);
  const size = map(noise(noiseOff), 0, 1, 15, 30);
  fill(colorV, 128, 128);

  ellipse(x, y, size);
  n++;
  noiseOff += 0.1;
}
