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
    }
    updateStage(){
        // if fullfill this stage
        // then goto next stage
        
        if(!this.stages[this.stage].instaned){
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
}

//let story = new Story();


function loadStage(){  //was called in setup()
story.addStage(new class{
    instaned = false;
    moved = false;
    setBuff = false;

    instan = [
        {x:constrain(randomGaussian(250, 100),100, 400), y:-500},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-530},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-780},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-700},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-1200},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-1250},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-100},
        {x:constrain(randomGaussian(250, 100),100, 400), y:-150}
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
        {x:250, y:-5000, type:0},
        {x:250, y:-11500, type:3},
        {x:250, y:-1300, type:4},
        {x:250, y:-2000, type:2}
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
}
