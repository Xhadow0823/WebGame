class Enemy extends GameObject {
    constructor(x, y){
        super(x, y);
        this.fullLife = this.life = 5;
        this.isOut = false;
        this.speed = 2;

        this.BC = BC;  //refference
        this.world = WORLD;
        /////
        this.dc = 800;
        this.dccnt = 0;
    }
    update(){  //overload
        if(this.pos.y+this.r > this.world.height){
            this.isOut = true;
            return;
        }
        if(this.dccnt > this.dc){
            this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID);
            this.dccnt = 0;
        }else{
            this.dccnt += deltaTime;
        }
    }
    draw(){  //extend
        super.draw();
        push();  //life bar
        fill(255);
        rect(this.pos.x-this.r, this.pos.y-this.r-15,
             this.r*2*this.life/this.fullLife, 5);
        pop();
    }
}

class EnemyCtrler{
    constructor(){
        this.Enemies = [];
        this.BC = BC;
        this.world = WORLD;
    }
    instantiate(x, y){
        this.Enemies.push(new Enemy(x, y));
    }
    update(){
        for(let i = this.Enemies.length-1; i >= 0; i--){
            if(this.Enemies[i].isOut){  // out of field
                this.Enemies.splice(i, 1);
                this.world.score--;
                console.log('OUT');
            }
            else if(this.Enemies[i].life<=0){  //was killed
                this.Enemies.splice(i, 1);
                console.log('DIE');
            }
            else{
                this.Enemies[i].update();
                this.BC.hitO(this.Enemies[i]);
            }
        }
    }
    draw(){
        this.Enemies.forEach((item,idx)=>{
            item.draw();
        });
    }
}