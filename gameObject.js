class GameObject {
    style = [urchin, squid, plastic_bag];
    constructor(x, y){
        this.pos = createVector(x, y);;  //createVector(x, y);
        this.dir = 1;

        this.cate = 2;
        
        this.GOID = this.constructor.name.hashCode();
        this.speed = 3;
        this.size = 50;
        this.life = 1;
        this.fullLife = 1;
    }
    update(){
        // pass
    }
    draw(){
        push();
        fill(150, 100);
        circle(this.pos.x, this.pos.y, this.size);
        image(this.style[this.cate], this.pos.x-this.size/2, this.pos.y-this.size/2,
              this.size, this.size);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y+this.size/2*this.dir);
        pop();
    }
    move(x, y){
        this.pos.add(createVector(x, y).mult(this.speed));
    }
    moveto(x, y){  //return bool
        if(p5.Vector.dist(createVector(x, y),this.pos)<=this.size){
            return false;
        }
        this.pos.add(createVector(x, y).sub(this.pos).normalize().mult(this.speed));
        return true;
    }
    hurt(){
        this.life--;
    }
}

