let s = [];
let m = [null, 1, -1, 1, 1];
let d = {x: 0, y : 0};
let intensity = 255;
let sat = 127;

function setup() {
  console.log('buttbutt');
  createCanvas(800, 800);
  colorMode(HSB, 255)
  s[1] = createSlider(1, 10, 8);
  s[2] = createSlider(1, 10, 3);
  s[3] = createSlider(0, 255, 127);
}

function draw() {
  let k = s[1].value() / s[2].value();
  //let k = Math.PI / Math.E;
  background(53);
  translate(width / 2, height / 2);
  beginShape();
  fill(100);
  for (let a = 0; a < TWO_PI * 10; a += 0.1) {
    let r = 200 * cos(k * a);
    let x = ((r + d.x) * cos(a));
    let y = ((r + d.y) * sin(a));
    //strokeColor = map(s[3].value(), 0, 1.0, 0, 255);
    stroke(s[3].value(), sat, intensity);
    strokeWeight(2);
    vertex(x, y);
  }
  endShape(CLOSE);

  intensity = intensity + (3 *  m[1]);
  if (intensity > 220 || intensity < 80)  { m[1] *= -1; }

  sat += 1 * m[2];
  if (sat > 255 || sat < 1) { m[2] *= -1; }

  d.x = lerp(d.x, 300 * m[3], 0.01);
  if (abs(d.x) > 260) { m[3] *= -1; }

  d.y = lerp(d.y, 300 * m[4], 0.01);
  if (abs(d.y) > 260) { m[4] *= -1; }
}
