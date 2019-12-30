class Bullet {
    style = [urchin, squid, strawW, bottleG];
    constructor(x, y, dir=1, belong=null, ang = 90, type=0){
        this.bOffsetX = 0;  this.bOffsetY = 0;
        this.pos = createVector(x+this.bOffsetX, y+this.bOffsetY*dir);
        this.isOut = false;
        this.forced = true;
        angleMode(DEGREES)
        this.dir = createVector(cos(ang), dir).normalize();
        this.cate = 3;
        this.shape = 1;  //0:circle, 1:rect
        this.nHit = false;

        this.rot = false;
        this.rotSpeed = 3;
        this.deg = (this.rot?randomGaussian(0,180):0);
        this.r = 15;  this.width = 10;  this.height = 240;
        this.belong = belong;
        this.speed = 1.5;
        this.acc = +0.01;

        switch(type){
            case 0:  //urchin
            default:
                this.cate = 0;
                this.shape = 0;
                this.r = 15;
                this.rot = true;  this.rotSpeed = 3;
                this.deg = (this.rot?randomGaussian(0,180):0);
                this.pos = createVector(x, y);
                break;
            case 1:  //squid
                this.cate = 1;
                this.shape = 1;
                this.forced = true;
                this.width = 20;  this.height = 40;
                this.pos = createVector(x, y+40*dir);
                break;
            case 2:  //strawW
                this.cate = 2;
                this.shape = 1;
                this.width = 10;  this.height = 240;
                this.nHit = true;
                this.pos = createVector(x, y-120*dir);
                break;
            case 3:  //bottle
                this.cate = 3;
                this.shape = 1;
                this.width = 15;  this.height = 45;
                this.rot = true;  this.rotSpeed = 3;
                this.deg = (this.rot?randomGaussian(0,180):0);
                this.pos = createVector(x, y);
                break;
            case 4:
                break;
        }
    }
    update(){
        // check isOut
        if(this.shape){
            if((this.pos.x<0-this.width/2||this.pos.x>width+this.width/2)||
            (this.pos.y<0-this.height/2||this.pos.y>height+this.height/2)){
                this.isOut = true;
            }    
        }else if((this.pos.x<0-this.r||this.pos.x>width+this.r)||
            (this.pos.y<0-this.r||this.pos.y>height+this.r)){
            this.isOut = true;
        }
        if(!this.isOut){
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
            if(this.shape){
                if(WORLD.CHEAT){
                    rect(0, 0, this.width, this.height);
                }
                image(this.style[this.cate], 0-this.width/2, 0-this.height/2,
                    this.width, this.height);
            }else{
                if(WORLD.CHEAT){
                    circle(0, 0, 2*this.r);
                }
                image(this.style[this.cate], 0-this.r, 0-this.r,
                    this.r*2, this.r*2);
            }
        pop();
    }
}


class BulletCtrler {
    constructor(){
        this.Bullets = [];
        this.world = WORLD;
    }
    shoot(x, y, dir=-1, belong=null, ang=90, btype=0){
        //appeend
        this.Bullets.push(new Bullet(x,y, dir, belong, ang, btype));
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
            if(item.shape==0){  //circle bullet
                if(p5.Vector.dist(item.pos,aobj.pos)<=item.r+aobj.r
                && (aobj.GOID!=item.belong||item.belong==null)){
                    isHit = true;
                    if(!item.nHit){
                        item.isOut = true;
                    }
                    aobj.hurt();
                    //console.log('HIT at : ', item.pos.x, item.pos.y);
                }
            }else{  //rect bullet
                let dx = abs(aobj.pos.x - (item.pos.x));
                let dy = abs(aobj.pos.y - (item.pos.y));

                if(dx > (item.width/2 + aobj.r)){  return;}
                if(dy > (item.height/2 + aobj.r)){  return;}

                if(dx <= (item.width/2) && (aobj.GOID!=item.belong||item.belong==null)){
                    isHit = true;
                    if(!item.nHit){
                        item.isOut = true;
                    }
                    aobj.hurt();
                    return ;
                }
                if(dy <= (item.height/2) && (aobj.GOID!=item.belong||item.belong==null)){
                    isHit = true;
                    if(!item.nHit){
                        item.isOut = true;
                    }
                    aobj.hurt();
                    return ;
                }

                let cor_sq = pow(dx - item.width/2, 2) + 
                             pow(dy - item.height/2, 2);
                if(cor_sq <= pow(aobj.r,2) && (aobj.GOID!=item.belong||item.belong==null)){
                    isHit = true;
                    if(!item.nHit){
                        item.isOut = true;
                    }
                    aobj.hurt();
                    return;
                }
            }
        });
        return isHit;
    }
}