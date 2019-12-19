class Player extends GameObject{
    constructor(x, y){
        super(x, y);

        this.BC = BC;
        this.dc = 300;
        this.dccnt = 0;
    }
    update(){  //overload
        if(this.dccnt > this.dc){
            this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID);
            this.dccnt = 0;
        }else{
            this.dccnt += deltaTime;
        }
    }
}