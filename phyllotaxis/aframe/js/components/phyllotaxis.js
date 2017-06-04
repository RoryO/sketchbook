AFRAME.registerComponent('phyllotaxis', {
  schema: {
    spread: { default: 0.1 },
    angle: { default: 137.3 },
    stride: { default: 25 },
    max: { default: 1000 },
    zDepth: { default: 0.001 },
    size: { default: 0.5 },
    hue: { default: 0 },
    saturation: { default: 100 },
    lightness: { default: 73 },
    hueClamp: { default: 20 }
  },
  
  init: function() {
    this.step = 0;
    this.done = false;
    this.driftedHue = this.data.hue;
  },

  tick: function() {
    if (this.done) { return; }

    for (let i = 0; i < this.data.stride; i++) {
      const r = this.data.spread * Math.sqrt(this.step);
      const theta = this.step * THREE.Math.degToRad(this.data.angle);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = -(this.step * this.data.zDepth);
      this.driftedHue += 1;
      this.addToEntityAt(x, y, z);
      this.step++;
      if (this.step > this.data.max) { this.done = true; }
    }
  },

  addToEntityAt: function(x, y, z) {
    const newShape = document.createElement('a-sphere');
    const materialColor = `hsl(${this.driftedHue}, ${this.data.saturation}%, ${this.data.lightness}%)`

    newShape.setAttribute('position', `${x} ${y} ${z}`);
    newShape.setAttribute('radius', this.data.size);
    // newShape.setAttribute('color', `hsl(${this.driftedHue}, ${this.data.saturation}%, ${this.data.lightness}%)`);
    // newShape.setAttribute('geometry', 'segmentsWidth: 4; segmentsHeight: 9');
    newShape.setAttribute('material', `color: ${materialColor};`);
    this.el.appendChild(newShape);
  }
});
