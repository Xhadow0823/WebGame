
class World{
    constructor(){
        this.state = 0;
        //0 : test,
        this.pause = false;

        this.CHEAT = false;
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
            // show the UI
        }else{
            // close the UI
        }
    }
    update(){
        //pass
    }
    draw(){
        let size = 50;
        let baseX = width/2;
        let baseY = height/2;
        if(this.pause){
            fill(255);
            rect(baseX-size/2, baseY-size/2, size*.4, size);
            rect(baseX-size/2+size*.6, baseY-size/2, size*.4, size);
        }
    }
}