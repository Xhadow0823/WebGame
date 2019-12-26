
class World{
    constructor(){
        this.state = 0;
        //0 : test,
        this.width = 500;
        this.height = 650;
        
        this.pause = false;
        this.bgSpeed = 2;
        this.score = 0;

        this.ui = new UI;
        this.CHEAT = false;

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
    }
    update(){
        //pass
        story.updateStage();
    }
    draw(){
        this.ui.showPause(this.pause);
        this.ui.showCHEAT(this.pause);
        //this.ui.showDetail();
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
    showCHEAT(){
        text("CHEAT", width/2+50, height/2);
    }
    showDetail(){
        let dw = 100;
        let dh = 300;
        let baseX = 0;  //width-dw;
        let baseY = height-dh;
        fill(200, 150);
        rect(baseX, baseY, dw, dh);
        //text(content, baseX, baseY+25);
    }
}