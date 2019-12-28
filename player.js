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

        this.inBuff = false;
    }
    update(){  //overload
        if(this.dccnt > this.dc){
            switch(this.bMode){
                case 0:
                default:
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 90, this.bType);
                    break;
                case 1:  //shotgun mode
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 30, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 60, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 90, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 120, this.bType);
                    this.BC.shoot(this.pos.x, this.pos.y, -1, this.GOID, 150, this.bType);
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
    getBuff(buff){
        if(!this.inBuff){
            this.inBuff = true;
            this.logAtr();
        }else{
            this.resetAtr();
        }
        switch(buff){
            case 0:  //get extra life
            default:
                this.life += 1;
                break;
            case 1:  //straw btype
                this.bType = 2;
                this.dc = 1500;
                this.resetAfter(15000);  // problem: not work with pause
                break;
            case 2:  //full auto bullet
                this.dc = 100;
                this.resetAfter(4000);
                break;
            case 3:  //shotgun mode
                this.dc = 750;
                this.bMode = 1;
                this.resetAfter(4000);
                break;
            case 4:  //squid mode
                this.bType = 1;
                this.dc = 300;
                this.resetAfter(5000);
                break;
            case 5:  //smaller player
                this.r = 15;
                this.speed = 5;
                this.resetAfter(5000);
                break;
        }
    }
    resetAfter(time){
        setTimeout(()=>{
            this.resetAtr();
        }, time);
    }
    logAtr(){  //return closure
        let old_dir = this.dir;
        let old_BC = this.BC;
        let old_bType = this.bType;
        let old_bMode = this.bMode;
        let old_dc = this.dc;
        let old_speed = this.speed;
        let old_r = this.r;
        function reset(){  //closure
            this.dir = old_dir;
            this.BC = old_BC;
            this.bType = old_bType;
            this.bMode = old_bMode;
            this.dc = old_dc;
            this.speed = old_speed;
            this.r = old_r;
        }
        this.resetAtr = reset;
    }
    resetAtr = null;
}