class Stage{
    instaned = false;
    moved = false;

    instan = [
        {x:50, y:87},
        {x:75, y:87},
        {x:25, y:87},
        {x:00, y:87}
    ];
    path = [
        {x:400, y:150},
        {x:550, y:160},
        {x:650, y:140},
        {x:800, y:130}
    ]
    
    pass(){
        // check EC
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

let story = new Story();

story.addStage(new Stage());