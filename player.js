class Player extends GameObject{
    constructor(x, y){
        super(x, y);

        this.dir = -1;
        this.BC = BC;
        this.bType = 0;
        this.bMode = 0;

        /////
        this.dc = 400;
        this.dccnt = 0;

        this.bdccnt = 0;
    }
    update(){  //overload
        if(this.dccnt > this.dc){
            switch(this.bMode){
                case 0:
                default:
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 90, this.bType);
                    break;
                case 1:  //squid mode
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 90, this.bType);
                    break;
            }
            this.dccnt = 0;
        }else{
            this.dccnt += deltaTime;
        }
    }
    changeBMode(mode){
        this.bMode = mode;
    }
    getBuff(buff, time){
        switch(buff){
            case 0:  //get extra life
            default:
                this.life += 1;
                break;
            case 1:
                break;
        }
        /*
        setTimeout(()=>{
            //this.dc = 1500;
        }, time);
        */
    }
}