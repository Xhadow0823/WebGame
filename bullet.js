class Bullet {
    style = [urchin, squid, plastic_bag];
    constructor(x, y, dir=1, belong=null){
        this.pos = createVector(x, y);
        this.isOut = false;
        this.forced = true;
        this.dir = createVector(0, dir);
        this.cate = 2;

        this.rot = true;
        this.rotSpeed = 3;
        this.deg = (this.rot?randomGaussian(0,180):0);
        this.r = 15;
        this.belong = belong;
        this.speed = 5;
        this.acc = +0.01;
    }
    update(){
        // check isOut
        if((this.pos.x<0-this.r||this.pos.x>width+this.r)||
        (this.pos.y<0-this.r||this.pos.y>height+this.r)){
            this.isOut = true;
        }else{
            // renew the pos
            this.pos.add(this.dir.copy().mult(this.speed));
        }
        if(!this.isOut && this.forced){
            this.speed += this.acc;
        }
    }
    draw(pause){
        push();
            fill('red');
            //rect(this.pos.x, this.pos.y, this.r*2, this.r*2);
            translate(this.pos.x, this.pos.y);
            angleMode(DEGREES);
            if(!pause && this.rot){
                this.deg = (this.deg + this.rotSpeed)%360;
            }
            rotate(this.deg);
            rectMode(CENTER);
            //rect(0, 0, this.r*2, this.r*2);
            image(this.style[this.cate], 0-this.r, 0-this.r,
                  this.r*2, this.r*2);
            //circle(this.pos.x, this.pos.y, 2*this.r);
        pop();
    }
}


class BulletCtrler {
    constructor(){
        this.Bullets = [];
        this.world = WORLD;
    }
    shoot(x, y, dir=-1, belong=null){
        //appeend
        this.Bullets.push(new Bullet(x,y, dir, belong));
    }
    clear(){
        this.Bullets = [];
        // console.log('all bullets were cleared');
    }
    update(){
        // check and delete bullet
        for(let i = this.Bullets.length-1; i>=0; i--){
            if(this.Bullets[i].isOut){
                //console.log("OUT");
                this.Bullets.splice(i, 1);
            }else{
                this.Bullets[i].update();
            }
        }
    }
    draw(){
        this.Bullets.forEach((item,idx)=>{
            item.draw(this.world.pause);
        });
    }
    hit(ox, oy, oor=0){  //return:bool
        //check if hit
        let isHit = false;
        this.Bullets.forEach((item,idx)=>{
            if(p5.Vector.dist(item.pos,createVector(ox, oy))<=item.r+oor){
                item.isOut = true;
                isHit = true;
                //console.log('HIT at : ',item.pos.x, item.pos.y);
            }
        });
        return(isHit?true:false);
    }
    hitO(aobj){  //return:bool
        //check if hit
        let isHit = false;
        this.Bullets.forEach((item,idx)=>{
            if(p5.Vector.dist(item.pos,aobj.pos)<=item.r+aobj.size/2
                && (aobj.GOID!=item.belong||item.belong==null)){
                item.isOut = true;
                isHit = true;
                aobj.hurt();
                //console.log('HIT at : ', item.pos.x, item.pos.y);
            }
        });
        return(isHit?true:false);
    }
}