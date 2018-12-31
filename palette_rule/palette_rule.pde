enum RenderMode {
  GRID, 
    RANDOM_ROW_WIDTH
}

ArrayList<Integer> hueValues = new ArrayList<Integer>();
ArrayList<Integer> saturationValues = new ArrayList<Integer>();
ArrayList<Integer> brightnessValues = new ArrayList<Integer>();
ArrayList<ArrayList<Integer>> tiles = new ArrayList<ArrayList<Integer>>();

Integer tileSize = 20;
Integer tileCountX;
Integer tileCountY;
Integer tileWidth;
Integer tileHeight;
RenderMode renderer = RenderMode.GRID;

void setup() {
  size(1920, 1080);
  background(0);
  tileWidth = floor(width / tileSize);
  tileHeight = floor(height / tileSize);
  tileCountX = floor(width / tileWidth);
  tileCountY = floor(height / tileHeight);
  genRandomPalette();
  render();
}

void draw() {

}

void keyReleased() {
  if        (key == '1') { 
    genRandomPalette();
  } else if (key == '2') { 
    genEpsilonPalette();
  } else if (key == '3') { 
    genTriadPalette();
  } else if (key == 'q') { 
    renderer = RenderMode.GRID;
  } else if (key == 'w') { 
    renderer = RenderMode.RANDOM_ROW_WIDTH;
  }
  render();
}

void render() {
  background(0);
  switch(renderer) {
  case GRID:
    gridRenderer();
    break;
  case RANDOM_ROW_WIDTH:
    randomRowRenderer();
    break;
  }
}

void resetValues() {
  hueValues = new ArrayList<Integer>();
  saturationValues = new ArrayList<Integer>();
  brightnessValues = new ArrayList<Integer>();
}

void genRandomPalette() {
  resetValues();
  for (Integer i=0; i<tileCountX; i++) {
    hueValues.add((int) random(0, 360));
    saturationValues.add((int)random(0, 100));
    brightnessValues.add((int)random(20, 100));
  }
}

void genEpsilonPalette() {
  resetValues(); 
  Integer baseHue = (int) random(0, 360);
  Integer deviance = 20;
  
  for (Integer i=0; i<tileCountX; i++) {
    hueValues.add((int) random(baseHue - deviance, baseHue + deviance));
    saturationValues.add((int)random(0, 100));
    brightnessValues.add((int)random(20, 100));
  }
}

void genTriadPalette() {
  resetValues();
  Integer baseHue = (int)random(0, 360);
  Integer triad1 = (baseHue + 140) % 360;
  Integer triad2 = (baseHue - 140) % 360;
  Integer deviance = 20;
  
  ArrayList<Integer> hues = new ArrayList<Integer>();
  hues.add(baseHue);
  hues.add(triad1);
  hues.add(triad2);
  for (Integer i=0; i<100; i++) {
    Integer baseColor = hues.get((int)random(0, 2));
    Integer floor = (baseColor - deviance) % 360;
    Integer ceil = (baseColor + deviance) % 360;
    hueValues.add((int) random(floor, ceil));
    saturationValues.add((int)random(0, 80));
    brightnessValues.add((int)random(20, 100));
  }
}

void gridRenderer() {
  Integer counter = 0;
  pushStyle();
  colorMode(HSB, 360, 100, 100);
  for (Integer y=0; y<tileCountY; y++) {
    Integer py = y * tileHeight;
    for (Integer x=0; x<tileCountX; x++) {
      Integer index = counter % tileCountX;
      Integer px = x * tileWidth;
      noStroke();
      fill(hueValues.get(index), saturationValues.get(index), brightnessValues.get(index));
      rect(px, py, tileWidth, tileHeight);
      counter++;
    }
    counter++;
  }
  popStyle();
}

void randomRowRenderer() {
  pushStyle();
  Integer counter = 0;
  colorMode(HSB, 360, 100, 100);
  for (Integer y=0; y<tileCountY; y++) {
    Integer py = y * tileHeight;
    Integer px = 0;
    while (px < width) {
      Integer index = counter % hueValues.size(); 
      Integer cellWidth = (int) random(0, min(width, 200));
      noStroke();
      fill(hueValues.get(index), saturationValues.get(index), brightnessValues.get(index));
      rect(px, py, cellWidth, tileHeight);
      px += cellWidth;
      counter++;
    }
  }
  popStyle();
}

void mouseReleased() {
  color c = get(mouseX, mouseY);
  println(red(c), green(c), blue(c));
  println(hue(c), saturation(c), brightness(c));
  println();
}
