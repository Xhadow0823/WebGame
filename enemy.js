class Enemy extends GameObject {
    constructor(x, y){
        super(x, y);
        this.fullLife = this.life = 5;
        this.speed = 2;

        this.BC = BC;  //refference
        
        this.dc = 550;
        this.dccnt = 0;
    }
    update(){  //overload
        if(this.dccnt > this.dc){
            this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID);
            this.dccnt = 0;
        }else{
            this.dccnt += deltaTime;
        }
    }
    draw(){  //extend
        super.draw();
        push();
        fill(255);
        rect(this.pos.x-this.size/2, this.pos.y-this.size/2-15,
             this.size*this.life/this.fullLife, 5);
        pop();
    }
}

class EnemyCtrler{
    constructor(){
        this.Enemies = [];
        this.BC = BC;
    }
    instantiate(x, y){
        this.Enemies.push(new Enemy(x, y));
    }
    update(){
        for(let i = this.Enemies.length-1; i >= 0; i--){
            if(this.Enemies[i].life>0){
                this.Enemies[i].update();
                this.BC.hitO(this.Enemies[i]);
            }else{
                this.Enemies.splice(i, 1);
                console.log('DIE');
            }
        }
        //tmp
        this.Enemies.forEach((item,idx)=>{
            item.update();
            this.BC.hitO(item);
        });
    }
    draw(){
        this.Enemies.forEach((item,idx)=>{
            item.draw();
        });
    }
}