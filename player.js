class Player extends GameObject{
    constructor(x, y){
        super(x, y);

        this.dir = -1;
        this.BC = BC;

        this.dc = 1500;
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