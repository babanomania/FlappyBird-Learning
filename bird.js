function Bird() {
    this.y = height/2;
    this.x = 64;
  
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.bird_color = '#009688';
    this.score = 0;

    this.addBrain = function( pipes ){
        this.brain = new BirdBrain( pipes, this );
    }
  
    this.show = function() {
      fill(this.bird_color);
      ellipse(this.x, this.y, 32, 32);
    }
  
    this.up = function() {
      this.velocity += this.lift;
    }
  
    this.update = function() {

        var brain_decides = this.brain.decide();
        if( brain_decides[0] > brain_decides[1] ){
            this.up();
        }

        this.velocity += this.gravity;
        this.y += this.velocity;
    
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
  
    }
  
  }
  