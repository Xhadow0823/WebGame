class Stage{
    instaned = false;
    moved = false;

    instan = [
        {x:400, y:-870},
        {x:550, y:-870},
        {x:650, y:-870},
        {x:800, y:-870}
    ];
    path = [
        {x:400, y:650},
        {x:550, y:660},
        {x:650, y:640},
        {x:800, y:630}
    ]
    
    pass(){
        // check ECaaaa
        if(EC.Enemies.length == 0){
            return true;
        }else{
            return false;
        }
    }
}

class Story{
    constructor(){
        this.stages = [];
        this.stage = 0;

        /////
        this.stageOpc = 255;
    }
    updateStage(){
        // if fullfill this stage
        // then goto next stage
        this.showStageN();
        
        if(!this.stages[this.stage].instaned){
            this.stageOpc = 255;
            this.stages[this.stage].instan.forEach((item, idx)=>{
                EC.instantiate(item.x, item.y);
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
    gotoStage(){
        //pass
    }
    showStageN(){
        push();
        if(this.stageOpc>0){
            fill(255, this.stageOpc--);
            textAlign(CENTER);
            textSize(64);
            text('Stage'+(this.stage+1), 250, 150);
        }
        pop();
    }
}

//let story = new Story();


function loadStage(){  //be called in setup()
story.addStage(new class{
    instaned = false;
    moved = false;
    setBuff = false;

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
            console.log('score : ', player.life);
            return true;
        }else{
            return false;
        }
    }
});
story.addStage(new class{
    instaned = false;
    moved = false;
    setBuff = false;

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
            console.log('score : ', player.life);
            return true;
        }else{
            return false;
        }
    }
});

let gameover = false;
story.addStage(new class{
    instaned = true;
    moved = true;
    setBuff = true;
    pass(){
        //  infinity stage
        if(gameover===true){
            console.log('end INFINITY');
            return true;
        }else{
            return false;
        }
    }
});

story.addStage(new class{
    instaned = true;
    moved = true;
    setBuff = true;
    pass(){
        //  end stage
        //console.log('END');
        return false;
    }
});
}  //loadStage() end
