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

    instan = [
        {x:83, y:-100},
        {x:166, y:-100},
        {x:249, y:-100},
        {x:332, y:-100}
    ];
    path = [
        {x:250, y:1000},
        {x:250, y:1000},
        {x:250, y:1000},
        {x:250, y:1000}
    ]
    
    pass(){
        // check ECaaaa
        if(EC.Enemies.length == 0){
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
    pass(){
        //  end stage
        //console.log('END');
        return false;
    }
});
}
