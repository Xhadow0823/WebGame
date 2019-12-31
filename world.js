class World{
    constructor(){
        this.state = 0;  //0:init , 1:game, 2:end
        this.diff = 0;  //0:easy, 1 hard

        this.width = 500;
        this.height = 650;
        
        this.pause = false;
        this.mute = false;
        this.bgSpeed = 2;
        this.score = 0;  //deprecated

        this.ui = new UI;
        this.CHEAT = false;

        /////
        this.acc1 = false;
        this.acc2 = false;
        this.acc3 = false;
        this.acc4 = false;
        this.acc5 = false;
        this.acc6 = false;
        this.acc7 = false;
        /////
        this.cheatCnt = 0;
        this.stageOpc = 255;
        /////
        this.b1y = -this.height;
        this.b2y = 0;
    }
    updateState(){
        if(player.life<=0 && !this.CHEAT){  //player die
            this.state = 2;
            this.pause = true;
            if(!this.acc3){
                console.log('get acc 3');
                this.acc3 = true;
                //reveal something
                reveal('how_dare_you');  //DOMCtrler.js
                failS.play();
                this.ui.currentAcc = "how_dare_you!!";
                this.ui.accOpc = 255;
            }
            if(story.stage == story.finalStage && !this.upload){
                failS.play();
                let name = prompt("Your Name? ", 'anonymous');
                this.upload = true;
                console.log(name, story.score);
                updateScore(name, story.score);  //statCtrler.js
                //upload score////////////////////
            }
        }
        if(player.bMode==1 && player.bType==1 && !this.acc1){
            console.log('get acc 1');
            this.acc1 = true;
            //reveal something
            reveal('ode');  //DOMCtrler.js
            this.ui.currentAcc = "ode!!";
            this.ui.accOpc = 255;
        }
        if(player.bMode==1 && player.bType==2 && !this.acc2){
            console.log('get acc 2');
            this.acc2 = true;
            //reveal something
            reveal('muscular_dolphin');  //DOMCtrler.js
            this.ui.currentAcc = "So Strong!!";
            this.ui.accOpc = 255;
        }
        if(story.stage==story.finalStage && !this.acc4){
            console.log('get acc 4');
            this.acc4 = true;
            //reveal something
            reveal('korea_fish');  //DOMCtrler.js
            this.ui.currentAcc = "JOKER!!";
            this.ui.accOpc = 255;
        }
        if(player.dc<=300 && player.bType==2 && !this.acc5){
            console.log('get acc 5');
            this.acc5 = true;
            //reveal something
            reveal('crab_rave');  //DOMCtrler.js
            this.ui.currentAcc = "Faster!!";
            this.ui.accOpc = 255;
        }
        if(story.stage==1 && !this.acc6){
            console.log('get acc 6');
            this.acc6 = true;
            //reveal something
            reveal('hodara');  //DOMCtrler.js
            this.ui.currentAcc = "First time!!";
            this.ui.accOpc = 255;
        }
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
        this.updateState();
        switch(this.state){
            case 0:
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
                break;
            case 1:
                story.updateStage();
                break;
            case 2:
                break;
        }
    }
    draw(){
        this.ui.showDetail();
        this.ui.showPause(this.pause);
        this.ui.showGetAcc();
        switch(this.state){
            case 0:
                this.ui.initM();
                break;
            case 1:
                break;
            case 2:
                this.ui.showEnd();
                break;
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
        this.currentAcc = "";
        this.accOpc = 0;
    }
    draw(){

    }
    showPause(){
        if(WORLD.pause && WORLD.state!=2){  //2:end not show rect
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
            textAlign(RIGHT, TOP);
            text(`SCORE: ${story.score}`, 495, 5);
        }
        pop();
    }
    showGetAcc(){
        push();
        if(this.accOpc>0){
            fill(255, 204, 0, this.accOpc-=0.5);
            textAlign(LEFT);
            textSize(18);
            text('Unlock accomplishment : '+this.currentAcc, 5, 62);
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

        textSize(12);
        textAlign(LEFT);
        text('© 2019-2020 dev by xhadow0823',5, 645);
        pop();
    }
    showEnd(){
        if(WORLD.state === 2){
            push();
            fill('red');
            textSize(32);
            textAlign(CENTER);
            text('YOU DIE!!', 250, 250);
            pop();
        }
    }
}