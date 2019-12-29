class World{
    constructor(){
        this.state = 0;
        //0 : test,
        this.width = 500;
        this.height = 650;
        
        this.pause = false;
        this.mute = false;
        this.bgSpeed = 2;
        this.score = 0;

        this.ui = new UI;
        this.CHEAT = false;

        this.cheatCnt = 0;
        /////
        this.b1y = -this.height;
        this.b2y = 0;
    }
    initialize(){

    }
    updateState(){

    }
    setState(st){
        this.state = st;
    }

    changePause(){
        this.pause = !this.pause;
        if(this.pause){
            pauseSnd.play();
            BGM.pause();
        }else{
            pauseEndSnd.play();
            BGM.play();
        }
    }
    cheatMode(k){
        switch(this.cheatCnt){
            case 0:
                if(k==67)this.cheatCnt++;
                break;
            case 1:
                if(k==72)this.cheatCnt++;
                break;
            case 2:
                if(k==69)this.cheatCnt++;
                break;
            case 3:
                if(k==65)this.cheatCnt++;
                break;
            case 4:
                if(k==84)this.CHEAT = true;
                break;
        }
    }
    update(){
        //pass
        story.updateStage();
    }
    draw(){
        this.ui.showDetail();
        this.ui.showPause(this.pause);
    }
    background(){
        push();
            image(bg, 0, this.b1y, this.width, this.height);
            image(bg, 0, this.b2y, this.width, this.height);
            if(!this.pause){
                this.b1y += this.bgSpeed;  this.b2y += this.bgSpeed;
                if(this.b1y >= this.height){  this.b1y = -this.height;}
                if(this.b2y >= this.height){  this.b2y = -this.height;}
            }
        pop();
    }
}

class UI{
    constructor(){
        
    }
    draw(){

    }
    showPause(pause){
        if(pause){
            let size = 50;
            let baseX = width/2;
            let baseY = height/2;
            fill(200, 80);
            rect(0, 0, width, height);
            fill(255);
            rect(baseX-size/2, baseY-size/2, size*.4, size);
            rect(baseX-size/2+size*.6, baseY-size/2, size*.4, size);
        }
    }
    showDetail(){  //title display
        push();
        fill(255);
        let offX = 45;
        text("LIVES ", 5, 15);
        for(let i = 0; i < player.life; i++){
            rect(offX, 5, 10, 10);
            offX += 15;
        }
        if(player.inBuff){
            text("BUFF", 5, 30);
        }
        if(WORLD.CHEAT){
            text("CHEAT MODE", 5, 45);
        }
        pop();
    }
}