class GameObject {
    style = [plastic_bag, turtleB, turtleF, kfh];
    constructor(x, y){
        this.pos = createVector(x, y);  //createVector(x, y);
        this.dir = 1;

        this.cate = 1;
        
        this.world = WORLD;
        this.GOID = this.constructor.name.hashCode();
        this.speed = 3;
        this.r = 25;
        this.life = 1;
        this.fullLife = 1;
    }
    update(){
        // pass
    }
    draw(){
        push();
        fill(150, 100);
        if(this.world.CHEAT){
            circle(this.pos.x, this.pos.y, this.r*2);
        }
        image(this.style[this.cate], this.pos.x-this.r, this.pos.y-this.r,
              this.r*2, this.r*2);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y+this.r/2*this.dir);
        pop();
    }
    move(x, y){
        if(this.pos.y > this.world.height+this.r-7 && y>0) y=0;
        if(this.pos.y < 0-this.r+7 && y<0) y=0;
        if(this.pos.x > this.world.width+this.r-7 && x>0) x=0;
        if(this.pos.x < 0-this.r+7 && x<0) x=0;
        this.pos.add(createVector(x, y).mult(this.speed));
    }
    moveto(x, y){  //return bool
        if(p5.Vector.dist(createVector(x, y),this.pos)<=this.r){
            return false;
        }
        this.pos.add(createVector(x, y).sub(this.pos).normalize().mult(this.speed));
        return true;
    }
    hurt(){
        this.life--;
    }
}

