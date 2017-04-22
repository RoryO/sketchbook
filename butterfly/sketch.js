function setup() {
  createCanvas(400, 400);
}

let yoff = 0;

function draw() {
  background(56);
  translate(width / 2, height / 2);
  rotate(PI / 2);
  let r = 0;
  beginShape();
  fill(255, 50);
  let xoff = 0;
  for (let a = PI / 2; a < 5*PI/2; a += 0.05) {
    let n = noise(xoff, yoff);
    let r = sin(2*a) * map(n, 0, 1, 50, 125);
    let x = r * 2 * cos(a);
    let y = r * 2 * sin(a);
    stroke(255);
    strokeWeight(-1);
    vertex(x, y);

    if (a > PI / 2) {
      xoff -= 0.0015;
    } else {
      xoff += 0.0015;
    }
  }

  yoff += 0.09;
  endShape(CLOSE);
}
