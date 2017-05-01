class Field {
  int scale, rows, cols;
  float zoff = 0;
  final ArrayList<ArrayList<PVector>> field = new ArrayList<ArrayList<PVector>>();
  
  public Field(int scale) {
    this.cols = floor(width / scale);
    this.rows = floor(height / scale);    
    this.scale = scale;
    for (int y = 0; y <= rows; y++) {
      field.add(new ArrayList());
      for (int x = 0; x <= cols; x++) {
        field.get(y).add(new PVector());
      }
    }
  }
  
  Field update() {
    float yoff = 0;
    float xoff = 0;
    for (ArrayList<PVector> row : field) {
      xoff = 0;
      for (PVector cell : row) {
        final float angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
        cell.set(PVector.fromAngle(angle));
        xoff += 0.1;
      }
      yoff += 0.1;
    }
    return this;
  }
  
  Field show() {
    pushStyle();
    int y = 0;
    int x = 0;
    for (ArrayList<PVector> row : field) {
      for (PVector cell : row) {
        pushMatrix();
        translate(x * scale, y * scale);
        stroke(255, 128);
        rotate(cell.heading());
        line(0, 0, scale, 0);
        popMatrix();
        x++;
      }
      x = 0;
      y++;
    }
    
    popStyle();
    return this;
  }

  
  PVector atScreenLocation(float x, float y) {
    int gridx, gridy;
    gridx = floor(x / scale);
    gridy = floor(y / scale);
    return atGridLocation(gridx, gridy);
  }
  
  PVector atGridLocation(int x, int y) {
    ArrayList<PVector> row = field.get(y);
    return row.get(x);
  }
  
  Field frame() {
    update();
    zoff += 0.01;
    return this;
  }
}