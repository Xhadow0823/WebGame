class Story{
    constructor(){
        this.stages = [];
        this.stage = 0;

        this.infinityMode = false;
        this.score = 0;
        this.finalStage = 3;
        /////
        this.stageOpc = 255;
    }
    updateStage(){
        // if fullfill this stage
        // then goto next stage
        this.showStageN();

        if(this.stages[this.stage].isInfinity===true){
            this.stages[this.stage].update();
            return;
        }
        
        if(!this.stages[this.stage].instaned){
            this.stageOpc = 255;
            this.stages[this.stage].instan.forEach((item, idx)=>{
                EC.instantiate(item.x, item.y, item.type, item.cate);
            });
            this.stages[this.stage].instaned = true;
            console.log('instaned');
        }
        if(!this.stages[this.stage].setBuff){
            this.stages[this.stage].buffs.forEach((item)=>{
                BFC.setBuff(item.x, item.y, item.type);
            });
            this.stages[this.stage].setBuff = true;
        }
        if(!this.stages[this.stage].moved){
            let moved = true;
            for(let i = 0; i < EC.Enemies.length; i++){
                moved=!EC.Enemies[i].moveto(this.stages[this.stage].path[i].x,
                                    this.stages[this.stage].path[i].y) && moved;
            }
            console.log('moving');
            this.stages[this.stage].moved = moved;
        }
        if(this.stages[this.stage].pass()){
            this.stage++;
        }
    }
    addStage(newstage){
        this.stages.push(newstage);
    }
    gotoStage(s){
        this.Stage = s;
    }
    showStageN(){
        push();
        if(this.stageOpc>0){
            fill(255, this.stageOpc--);
            textAlign(CENTER);
            textSize(64);
            text('Stage'+(this.stages[this.stage].name), 250, 150);
        }
        pop();
    }
}

//let story = new Story();


function loadStage(){  //be called in setup()
story.addStage(new class{  //Stage1
    instaned = false;
    moved = false;
    setBuff = false;
    name = "1";

    instan = [
        {x:constrain(randomGaussian(250, 100),100, 400), y:-500, type:1},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-530, type:1},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-780, type:2},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-700, type:1},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-1200, type:1},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-1250, type:2},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-100, type:2},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-150, type:1}
    ];
    path = [
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3, y:1000},
        {x:500/3*2, y:1000}
    ]
    
    buffs = [
        {x:constrain(randomGaussian(250, 100),50, 450), y:-5000, type:0},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-11000, type:3},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-1300, type:4},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-2000, type:2}
    ]

    pass(){
        // check ECaaaa
        if(EC.Enemies.length == 0){
            console.log('Stage1:  score : ', player.life);
            return true;
        }else{
            return false;
        }
    }
});
story.addStage(new class{  //Stage2
    instaned = false;
    moved = false;
    setBuff = false;
    name = "2";

    instan = [
        {x:constrain(randomGaussian(250, 100),100, 400), y:-500, type:3},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-530, type:4},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-120, type:3},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-150, type:3}
    ];
    path = [
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3, y:1000},
        {x:500/3*2, y:1000}
    ]
    
    buffs = [
        {x:constrain(randomGaussian(250, 100),50, 450), y:-5000, type:0},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-11000, type:1},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-1300, type:4},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-2000, type:2}
    ]

    pass(){
        // check ECaaaa
        if(EC.Enemies.length == 0){
            console.log('Stage2:  score : ', player.life);
            return true;
        }else{
            return false;
        }
    }
});
story.addStage(new class{  //Stage3
    instaned = false;
    moved = false;
    setBuff = false;
    name = "3";

    instan = [
        {x:constrain(randomGaussian(250, 100),100, 400), y:-500, type:3},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-530, type:4},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-120, type:3},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-150, type:3},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-800, type:4, cate:3}
    ];
    path = [
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3, y:1000},
        {x:500/3*2, y:1000},
        {x:500/3*2, y:1000}
    ]
    
    buffs = [
        {x:constrain(randomGaussian(250, 100),50, 450), y:-5000, type:0},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-10000, type:1},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-1300, type:4},
        {x:constrain(randomGaussian(250, 100),50, 450), y:-2000, type:2}
    ]

    pass(){
        // check ECaaaa
        if(EC.Enemies.length == 0){
            console.log('Stage3:  score : ', player.life);
            return true;
        }else{
            return false;
        }
    }
});

story.addStage(new class{  //Stage ∞ 
    instaned = true;
    moved = true;
    setBuff = true;
    init = false;
    isInfinity = true;//////////
    name = " ∞ ";

    ///////////////////////
    dc = 8000;
    dccnt = 0;
    iLimit = 2;
    bLimit = 2;
    infInit(){
        story.stageOpc = 255;
        player.fullLife = player.life = 9;
        story.infinityMode = true;
        this.init = true;
    }
    update(){
        if(!this.init){
            this.infInit();
        }
        if(this.dccnt >= this.dc){
            let ri = random(1, this.iLimit);
            for(let i = 0; i < ri; i++){
                let item = {x:constrain(randomGaussian(250, 100),100, 400),
                            y:-constrain(randomGaussian(100, 100),10, 500),
                            type:floor(random(5))};
                EC.instantiate(item.x, item.y, item.type);
            }
            let rb = random(1, this.bLimit);
            for(let i = 0; i < rb; i++){
                let item = {x:constrain(randomGaussian(250, 100),50, 450),
                            y:-constrain(randomGaussian(1000, 900),10, 5000),
                            type:floor(random(0, 6))};
                BFC.setBuff(item.x, item.y, item.type);
            }
            // if() then add limit

            this.dccnt = 0;

        }
        this.dccnt += deltaTime;
        EC.Enemies.forEach((item)=>{
            item.moveto(500/3*floor(random(1, 3)),
                        1000);
        })
    }

    pass(){
        // check ECaaaa
        return false;
    }
});
}  //loadStage() end
