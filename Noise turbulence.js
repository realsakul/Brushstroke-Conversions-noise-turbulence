/*
Noise turbulence doodles

Changed how it renders to feel more stylized.

Author:
  Raven Kwok aka Guo, Ruiwen
  ravenkwok.com
  twitter.com/ravenkwok
  vimeo.com/ravenkwok
  ravenkwok.tumblr.com
  flickr.com/photos/ravenkwok

Forked by:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var pts = [];
var onPressed, showInstruction = true;
var f;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,255);
  rectMode(CENTER);

  //pts = new Array(100);

  //f = createFont("Calibri", 24, true);

  background(0);
}

function draw() {
  if (showInstruction) drawInstruction();
  
  if (onPressed) {
    for (let i=0;i<10;i++) {
      append(pts, new Particle(mouseX, mouseY, i+pts.length, i+pts.length));
    }
  }

  for (let i = pts.length-1; i>-1; i--) {
     pts[i].update();
     pts[i].display();
     console.log(pts.length);
     if (pts[i].removeParticle()) {
        pts.splice(i, 1);
    }
  }


function drawInstruction(){
  background(0);
  fill(128);
  textAlign(CENTER, CENTER);
  //textFont(f);
  textLeading(36);
  text("Drag and draw." + "\n" +
       "Press 'c' to clear the stage." + "\n" +
       "Press any other key to change its hue."
       ,width*0.5, height*0.5);
}
}