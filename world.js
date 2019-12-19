
class World{
    constructor(){
        this.state = 0;
        //0 : test,
        this.pause = false;
        this.bgSpeed = 2;

        this.ui = new UI;
        this.CHEAT = false;

        /////
        this.b1y = -height;
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
    }
    draw(){
        this.ui.showPause(this.pause);
        this.ui.showDetail();
    }
    background(pause){
        image(bg, 0, this.b1y, width, height);
        image(bg, 0, this.b2y, width, height);
        if(!pause){
            this.b1y += this.bgSpeed;  this.b2y += this.bgSpeed;
            if(this.b1y >= height){  this.b1y = -height;}
            if(this.b2y >= height){  this.b2y = -height;}
        }
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