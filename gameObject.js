class GameObject {
    constructor(x, y){
        this.pos = createVector(x, y);;  //createVector(x, y);

        this.speed = 5;
        this.size = 50;
    }
    update(){
        // pass
    }
    draw(){
        fill('green');
        circle(this.pos.x, this.pos.y, this.size);
    }
    move(x, y){
        this.pos.add(createVector(x, y).mult(this.speed));
    }
    moveto(x, y){  //return bool
        if(p5.Vector.dist(createVector(x, y),this.pos)<=this.speed){
            return false;
        }
        this.pos.add(createVector(x, y).sub(this.pos).normalize().mult(this.speed));
        return true;
    }
}

