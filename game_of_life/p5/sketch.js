const cellSize = 10;
const cells = [];
let paused = true;
let button;

function setup() {
  createCanvas(1000, 1000);
  button = createButton('Pause');
  button.mousePressed(() => { paused = !paused });
  background(56);
  frameRate(120);
  cellsX = cellSize / width;
  cellsY = cellSize / height;
  for(let y = 0; y < (width / cellSize); y++) {
    cells[y] = [];
    for(let x = 0; x < (height / cellSize);  x++) {
      cells[y][x] = 0; //random() < 0.05 ? 1 : 0;
    }
  }
  drawCurrentGeneration();
}

function draw() {
  background(56);
  drawCurrentGeneration();
  if (!paused && frameCount % 1 === 0) {
    calculateNextGeneration();
  }
}

function mousePressed() {
  let xcol = floor(mouseX / cellSize);
  let ycol = floor(mouseY / cellSize);
  if (cells[ycol][xcol] === 0) { cells[ycol][xcol] = 1; }
}


function drawCurrentGeneration() {
  beginShape();
  stroke(200);

  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
      if (cells[y][x] === 1) { fill(128); }
      else { noFill(); }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  endShape();
}

function calculateNextGeneration() {
  for (let y = 1; y < cells.length - 1; y++) {
    for (let x = 1; x < cells[y].length - 1; x++) {
      let numAdjacent = getNumAdjacentAt(x, y);
      if (cells[y][x] === 1 && (numAdjacent <= 1 || numAdjacent >= 4)) {
        cells[y][x] = 0;
      } else if (cells[y][x] === 0 && numAdjacent === 3) {
        cells[y][x] = 1; 
      }
    }
  }
}

function getNumAdjacentAt(x, y) {
  let n = 0;

  for (let v = -1; v <= 1; v++) {

    for (let u = -1; u <= 1; u++) {
      let yoff = y + v;
      let xoff = x + u;

      if (yoff < 0) { yoff = cells.length - 1; }
      else if (yoff >= cells.length) { yoff = 0; }

      if (xoff < 0) { xoff = cells[yoff].length - 1; }
      else if (yoff >= cells.length) { yoff = 0; }

      n += cells[yoff][xoff];
    }
  }

  n -= cells[y][x];

  return n;
}
