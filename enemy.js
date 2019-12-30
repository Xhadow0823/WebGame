class Enemy extends GameObject {
    constructor(x, y, pType = 2, cate=0){
        super(x, y);
        this.cate = cate;  //overload

        this.fullLife = this.life = 5;
        this.isOut = false;
        this.speed = 0.8;
        this.pType = pType;
        this.bType = 3;  //bottle

        this.BC = BC;  //refference
        this.world = WORLD;
        /////
        this.dc = 1500;
        this.dccnt = 0;
    }
    update(){  //overload
        if(this.pos.y-this.r > this.world.height){
            this.isOut = true;
            return;
        }
        if(this.dccnt > this.dc){
            switch(this.pType){
                case 0:  // |
                default:
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 90, this.bType);
                    break;
                case 1:  // /\
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 135, this.bType);
                    break;
                case 2:  // /|\
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 90, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 135, this.bType);
                    break;
                case 3:  // \/ /\
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 135, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 135, this.bType);
                    break;
                case 4:  // \|/-\|/-
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 90, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 1, this.GOID, 135, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 0, this.GOID, 0, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, 0, this.GOID, 180, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 45, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 135, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 90, this.bType);
                    break;
            }
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
    instantiate(x, y, type, cate){
        this.Enemies.push(new Enemy(x, y, type, cate));
    }
    update(){
        for(let i = this.Enemies.length-1; i >= 0; i--){
            if(this.Enemies[i].isOut){  // out of field
                this.Enemies.splice(i, 1);
                this.world.score--;
                if(story.infinityMode){
                    story.score-=10;
                }
                console.log('OUT');
            }
            else if(this.Enemies[i].life<=0){  //was killed
                this.Enemies.splice(i, 1);
                enemyDsty.play();
                if(story.infinityMode){
                    story.score+=10;
                }
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