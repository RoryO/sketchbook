class Cell {
  constructor(alive=false) {
    this.alive = alive;
  }

  update() {
    return this;
  }

  revive() {
    this.alive = true;
    return this;
  }

  die() {
    this.alive = false;
    return this;
  }

  toggle() {
    if (this.alive) {
      this.die();
    } else {
      this.revive();
    }
    return this;
  }

  toNumber() {
    if(this.alive) {
      return 1;
    } else {
      return 0;
    }
  }
}

class Board {
  constructor(canvasWidth, canvasHeight) {
    this.cells = []
    this.paused = true;
    this.cellSize = 10;

    for(let y = 0; y < (canvasHeight / this.cellSize); y++) {
      this.cells[y] = [];
      for(let x = 0; x < (canvasWidth / this.cellSize);  x++) {
        this.cells[y][x] = new Cell(random() < 0.05); //random() < 0.05 ? 1 : 0;
      }
    }
  }

  update(frameCount) {
    if (!this.paused && frameCount % 1 === 0) {
      this.calculateNextGeneration();
    }
    return this;
  }

  draw() {
    beginShape();
    stroke(200);

    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        if (this.cells[y][x].alive) { fill(128); }
        else { noFill(); }
        rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
    endShape();
    return this;
  }

  calculateNextGeneration() {
    for (let y = 1; y < this.cells.length - 1; y++) {
      for (let x = 1; x < this.cells[y].length - 1; x++) {
        let numAdjacent = this.getNumAdjacentAt(x, y);
        if (this.cells[y][x].alive && (numAdjacent <= 1 || numAdjacent >= 4)) {
          this.cells[y][x].die();
        } else if (this.cells[y][x] === 0 && numAdjacent === 3) {
          this.cells[y][x].revive(); 
        }
      }
    }
  }

  getNumAdjacentAt(x, y) {
    let n = 0;

    for (let v = -1; v <= 1; v++) {
      for (let u = -1; u <= 1; u++) {
        let yoff = y + v;
        let xoff = x + u;

        if (yoff < 0) { yoff = this.cells.length - 1; }
        else if (yoff >= this.cells.length) { yoff = 0; }

        if (xoff < 0) { xoff = this.cells[yoff].length - 1; }
        else if (yoff >= this.cells.length) { yoff = 0; }

        n += this.cells[yoff][xoff].toNumber();
      }
    }

    n -= this.cells[y][x].toNumber();

    return n;
  }
}

let board;
let canvas;
let button;

function setup() {
  canvas = createCanvas(1000, 1000);
  button = createButton('Pause');
  button.mousePressed(() => { board.paused = !board.paused; this.innerHTML = board.paused ? 'Resume' : 'Pause'; });
  background(56);
  frameRate(120);
  board = new Board(width, height);
  board.draw();
}

function draw() {
  background(56);
  board.update(frameCount).draw();
}

function mousePressed() {
  let xcol = floor(mouseX / board.cellSize);
  let ycol = floor(mouseY / board.cellSize);
  board.cells[ycol][xcol].toggle();
}

