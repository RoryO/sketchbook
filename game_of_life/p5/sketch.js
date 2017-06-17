class Cell {
  constructor(alive=false) {
    this.stateHistory = [alive];
    this.alive = alive;
    this.fullIntensity = 255;
    this.steadyIntensity = 128;
    this.deadIntensity = 0;
    this.recentSwitchFrames = 0;
  }

  update() {
    this.alive = this.stateHistory[0];
    return this;
  }

  revive() {
    this.liveState = true;
    return this;
  }

  die() {
    this.liveState = false;
    return this;
  }

  toggle() {
    if (this.alive) {
      this.die();
    } else {
      this.revive();
    }
    this.update();
    return this;
  }

  get toNumber() {
    if(this.alive) {
      return 1;
    } else {
      return 0;
    }
  }

  get intensity() {
    const switched = this.stateHistory[0] !== this.stateHistory[1];
    if (this.alive) {
      return this.fullIntensity;
    } else {
      return this.deadIntensity;
    }
  }

  set liveState(state) {
    this.stateHistory.unshift(state);
    this.stateHistory = this.stateHistory.slice(0, 30);
  }
}

class Board {
  constructor(canvasWidth, canvasHeight, cellSize=10) {
    this.cells = []
    this.paused = true;
    this.cellSize = cellSize;
    this.delay = 5;
    this.totalCells = 0;
    this.grid = false;

    for(let y = 0; y < (canvasHeight / this.cellSize); y++) {
      this.cells[y] = [];
      for(let x = 0; x < (canvasWidth / this.cellSize);  x++) {
        this.cells[y][x] = new Cell(random() < 0.25);
        this.totalCells++;
      }
    }
  }

  update(frameCount) {
    if (!this.paused && frameCount % this.delay === 0) {
      this.calculateNextGeneration();
    }
    return this;
  }

  draw() {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        const cell = this.cells[y][x];
        cell.update();
        if (!cell.alive && !this.grid) { continue; }
        beginShape();
        stroke(128);
        fill(cell.intensity);
        rect(x * this.cellSize,
             y * this.cellSize,
             this.cellSize,
             this.cellSize);
        endShape();
      }
    }
    return this;
  }

  calculateNextGeneration() {
    for (let y = 0; y <= this.cells.length - 1; y++) {
      for (let x = 0; x <= this.cells[y].length - 1; x++) {
        let numAdjacent = this.getNumAdjacentAt(x, y);
        const cell = this.cells[y][x];
        if (cell.alive && (numAdjacent <= 1 || numAdjacent >= 4)) {
          cell.die();
        } else if (!cell.alive && numAdjacent === 3) {
          cell.revive(); 
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
        else if (xoff >= this.cells.length) { xoff = 0; }

        n += this.cells[yoff][xoff].toNumber;
      }
    }

    n -= this.cells[y][x].toNumber;

    return n;
  }
}

let board;
let canvas;
let button;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.elt.setAttribute('oncontextmenu', 'return false;');
  canvas.mousePressed((e) => {
    let xcol = floor(mouseX / board.cellSize);
    let ycol = floor(mouseY / board.cellSize);
    if(e.which === 1) { 
      board.cells[ycol][xcol].toggle();
    } else if (e.which === 3) {
      console.log(`${board.getNumAdjacentAt(xcol, ycol)}`);
    }
  });
  button = createButton('Pause');
  button.mousePressed(() => {
    board.paused = !board.paused;
  });
  background(56);
   board = new Board(width, height, 20);
   board.delay = 30;
   board.draw();
}

function draw() {
  background(56);
  board.update(frameCount).draw();
}
