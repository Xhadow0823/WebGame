class Bullet {
    constructor(x, y){
        this.pos = createVector(x, y);
        this.isOut = false;

        this.r = 7.5;
        this.belong = 0;
        this.speed = createVector(0, -5);
    }
    update(){
        // check isOut
        if((this.pos.x<0-this.r||this.pos.x>width+this.r)||
        (this.pos.y<0-this.r||this.pos.y>height+this.r)){
            this.isOut = true;
        }else{
            // renew the pos
            this.pos.add(this.speed);
        }
    }
    draw(){
        fill('red');
        circle(this.pos.x, this.pos.y, 2*this.r);
    }
}


class BulletCtrler {

    constructor(){
        this.Bullets = [];
    }
    shoot(x, y){
        //appeend
        this.Bullets.push(new Bullet(x,y));
    }
    update(){
        // check and delete bullet
        for(let i = this.Bullets.length-1; i>=0; i--){
            if(this.Bullets[i].isOut){
                console.log("OUT");
                this.Bullets.splice(i, 1);
            }else{
                this.Bullets[i].update();
            }
        }
    }
    draw(){
        this.Bullets.forEach((item,idx)=>{
            item.draw();
        });
    }
    hit(ox, oy, oor=0){  //return:bool
        //check if hit
        let isHit = false;
        this.Bullets.forEach((item,idx)=>{
            if(p5.Vector.dist(item.pos,createVector(ox, oy))<=item.r+oor){
                item.isOut = true;
                isHit = true;
                console.log(item.pos.x, item.pos.y);
            }
        });
        return(isHit?true:false);
    }
}