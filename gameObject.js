class GameObject {
    constructor(x, y){
        this.pos = null;  //createVector(x, y);

        this.speed = 5;
        this.size = 50;
    }
    update(){
        // pass
    }
    draw(){

        circle(this.pos.x, this.pos.y, this.size);
    }
    move(x, y){
        this.pos.add(createVector(x, y).mult(this.speed));
    }
}

