class GameObject {
    constructor(x, y){
        this.pos = createVector(x, y);;  //createVector(x, y);
        this.dir = 1;
        
        this.GOID = this.constructor.name.hashCode();
        this.speed = 3;
        this.size = 50;
        this.life = 1;
    }
    update(){
        // pass
    }
    draw(){
        fill(150, 100);
        circle(this.pos.x, this.pos.y, this.size);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y+this.size/2*this.dir);
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

