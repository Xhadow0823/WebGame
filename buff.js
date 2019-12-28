class BuffItem{
    style = [medicine];
    constructor(x, y, type){
        this.world = WORLD;

        this.type = type;

        this.pos = createVector(x, y);
        this.r = 15;
        this.isOut = false;
    }
    update(){
        if(!this.world.pause && !this.isOut){
            this.pos.y += this.world.bgSpeed;
            if(this.pos.y >= this.world.height+this.r){
                this.isOut = true;
            }
        }
    }
    draw(){
        push();
        fill('yellow');
        circle(this.pos.x, this.pos.y, this.r*2);
        image(this.style[0], this.pos.x-this.r/2, this.pos.y-this.r, this.r, this.r*2)
        pop();
    }
}

class BuffCtrler{
    constructor(){
        this.Buffs = [];
        this.world = WORLD;
    }
    setBuff(x, y, type=0){
        this.Buffs.push(new BuffItem(x, y, type));
    }
    update(){
        for(let i = this.Buffs.length-1; i>=0; i--){
            if(this.Buffs[i].isOut){
                this.Buffs.splice(i, 1);
            }else{
                this.Buffs[i].update();
            }
        }
    }
    draw(){
        this.Buffs.forEach((item)=>{
            item.draw();
        });
    }
    eaten(aobj){
        let isHit = false;
        this.Buffs.forEach((item)=>{
            if(p5.Vector.dist(item.pos, aobj.pos)<=item.r+aobj.r){
                isHit = true;
                item.isOut = true;
                //do buff//////////
                aobj.getBuff(item.type);
            }
        });
        return isHit;
    }
}