class World{
    constructor(){
        this.state = 0;  //0:init
        this.diff = 0;  //0:easy, 1 hard

        this.width = 500;
        this.height = 650;
        
        this.pause = false;
        this.mute = false;
        this.bgSpeed = 2;
        this.score = 0;

        this.ui = new UI;
        this.CHEAT = false;

        /////
        this.cheatCnt = 0;
        this.stageOpc = 255;
        /////
        this.b1y = -this.height;
        this.b2y = 0;
    }
    updateState(){

    }
    setState(st){
        this.state = st;
    }

    initGame(){
        player.fullLife = player.life = (this.diff?1:5);
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
    changeMute(){
        this.mute = !this.mute;
        if(this.mute){
            BGM.setVolume(0);
        }else{
            BGM.setVolume(1);
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
    update(mx, my){
        if(this.state === 0){
            if(mx>250-60 && mx<250+60
                && my>440-20 && my<490+20){
                if(my<440+20){
                    // click start
                    console.log('start');
                    this.initGame();
                    this.state = 1;
                    shoot3.play();
                }else if(my>490-20){
                    this.diff = 1 - this.diff;
                    shoot3.play();
                }
            }
        }
        switch(this.state){
            case 0:
                
                break;
            case 1:
                story.updateStage();
        }
    }
    draw(){
        this.ui.showDetail();
        this.ui.showPause(this.pause);
        if(this.state === 0){
            this.ui.initM();
        }
    }
    background(){
        push();
            image(bg, 0, this.b1y, this.width, this.height);
            image(bg, 0, this.b2y, this.width, this.height);
            image(ll, 0, 0, this.width, this.height);
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
            if(WORLD.mute){
                image(muteS, 425, 575, 50, 50);
            }
        }
    }
    showDetail(){  //title display
        push();
        fill('navy');
        let offX = 45;
        text("LIVES ", 5, 15);
        for(let i = 0; i < player.life; i++){
            fill(255);
            rect(offX, 5, 10, 10);
            offX += 15;
        }
        fill('navy');
        if(player.inBuff){
            text("BUFF", 5, 30);
        }
        if(WORLD.CHEAT){
            text("CHEAT MODE", 5, 45);
        }
        if(story.infinityMode){
            console.log("LL");
            textAlign(RIGHT, TOP);
            text(`SCORE: ${story.score}`, 495, 5);
        }
        pop();
    }
    initM(){
        push();
        fill(155);
        textSize(32);
        textAlign(CENTER);
        rectMode(CENTER);
        
        //rect(250, 325, 500, 650);
        image(mn, 0, 0, 500, 650);

        fill('red');
        rect(250, 440, 120, 40);

        fill('white');
        text('Start', 250, 450);

        fill('red');
        rect(250, 490, 120, 40);

        fill('white');
        text((WORLD.diff?'Hard':'Easy'), 250, 500);
        pop();
    }
}