function setup() {
  createCanvas(800, 800);
  background(56);
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      const color = map(sin(x) / 4, -1, 1, 0, 255);
      stroke(color);
      point(x, y);
    }
  }
}

function draw() {
}
