class Bullet {
    constructor(x, y, dir=1, belong=null){
        this.pos = createVector(x, y);
        this.isOut = false;
        this.forced = false;
        this.dir = createVector(0, dir);

        this.r = 7.5;
        this.belong = belong;
        this.speed = 5;
        this.acc = createVector(0, -0.1);
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
            this.speed.add(this.acc);
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

let BC = new BulletCtrler();