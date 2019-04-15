var hIndex = 0;
var minH = 100;
var maxH = 220;
var h = minH;

// Uses presets as it feels better than making them random.
function changeHue() {
  hIndex++;
  if (hIndex > 4) {
    hIndex = 0;
  }
  
  switch(hIndex) {
    case 0: 
      minH = 100;
      maxH = 220;
      break;
    case 1: 
      minH = 0;
      maxH = 55;
      break;
    case 2: 
      minH = 20;
      maxH = 100;
      break;
    case 3: 
      minH = 110;
      maxH = 180;
      break;
    case 4: 
      minH = 150;
      maxH = 255;
      break;
  }
  h = minH;
}

function Particle(x, y, xOfst, yOfst) {

    this.loc = createVector(x,y);
    this.randDegrees = random(360);
    this.vel = createVector(cos(radians(this.randDegrees)), sin(radians(this.randDegrees)));
    this.acc = createVector(0,0);
    this.vel.mult(random(5));

    this.life = 255;

  
    this.lifeSpan = 90;
    this.decay = 0.75;
    this.passedLife = 0;
    this.dead = false;
    var alpha, weight, weightRange, decay, xOfst, yOfst;
    this.weightRange = random(80,100);
    this.c = color(h, 255, 255, 10); 
    
    this.h = h;
    h += 0.5;
    if (h > maxH) {
      h = minH+h-maxH;
    }
    
    this.sizeMult = constrain(sin(frameCount*0.02), 0.05, 0.5);
    this.xOfst = xOfst;
    this.yOfst = yOfst;
  
  
  this.update = function(){

    if(this.passedLife>=this.lifeSpan){
      this.dead = true;
    }else{
      this.passedLife++;
    }
    
    alpha = float(this.lifeSpan-this.passedLife)/this.lifeSpan * 70+50;
    this.life-=5;
    weight = float(this.lifeSpan-this.passedLife)/this.lifeSpan * this.weightRange;
    
    this.acc.set(0,0);
    
    let rn = (noise((this.loc.x+frameCount+xOfst)*.01, (this.loc.y+frameCount+yOfst)*.01)-.5)*TWO_PI*4;
    let mag = noise((this.loc.y-frameCount)*.01, (this.loc.x-frameCount)*.01);
    let dir = createVector(cos(rn),sin(rn));
    this.acc.add(dir);
    this.acc.mult(mag);
    
    let randRn = random(TWO_PI);
    let randV = createVector(cos(randRn), sin(randRn));
    randV.mult(.25);
    this.acc.add(randV);
    
    this.vel.add(this.acc);
    this.vel.mult(this.decay);
    this.vel.limit(3);
    this.loc.add(this.vel);
  }
  
  this.display = function(){
    strokeWeight((this.lifeSpan-this.passedLife)*this.sizeMult);
    stroke(this.c, alpha);
    point(this.loc.x, this.loc.y);
  }

  this.removeParticle = function() {
    return this.life < 0;
  }
}