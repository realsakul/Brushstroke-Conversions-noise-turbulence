function mousePressed() {
    onPressed = true;
    if (showInstruction) {
      background(0);
      showInstruction = false;
    }
  }
  
  function mouseReleased() {
    onPressed = false;
  }
  
 /*  function keyPressed() {
    if (key == 'c') {
      for (let i=pts.size()-1; i>-1; i--) {
        Particle p = pts.get(i);
        pts.remove(i);
      }
      background(0);
    } else {
      changeHue();
    }
  } */