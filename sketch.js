// This is a testing file

let gObjTest;
let zawarudo;
let ey;


let ret = false;

// preload block
let bg;
function preload(){
    //TOOLS

    //ASSETS
    bg = loadImage('starry-sky.jpg');
}
// END PRELOAD BLOCK

function setup() {
    createCanvas(windowWidth, 500);
    gObjTest = new Player(width/2, height/2);
    zawarudo = new World();
    ey = new Enemy(200, 200);
}

let tt = new Timer(5000);
function draw() {
    background(0);
    zawarudo.background();
    
    //update blobk
    if (!zawarudo.pause) {
        zawarudo.update();
        BC.update();
        EC.update();
        ey.update();
        gObjTest.update();
    }
    shape();
/*
    if(tt!=null && tt.wait()){
        console.log("Time's up!");
        delete tt;
    }
*/

    if(ret){
        gObjTest.moveto(450, 200);
    }else{
        keyP();
    }

    if (BC.hit(x + 25, y + 25, 25)) {
        console.log("HIT BOX");
    }

    BC.hitO(gObjTest);
    BC.hitO(ey);

    //draw block
    BC.draw();
    EC.draw();
    ey.draw();
    gObjTest.draw();
    zawarudo.draw();  // on the most top
}

let x = 50;
let y = 50;

function shape() {
    fill(255);
    rect(x, y, 50, 50);
}

function mouseClicked() {
    BC.shoot(mouseX, mouseY);
    //EC.instantiate(mouseX, mouseY);
}

function keyP() {
    let x = 0, y = 0;
    if (keyIsDown(65)) {
        x = -1;
    }
    if (keyIsDown(68)) {
        x = +1;
    }
    if (keyIsDown(87)) {
        y = -1;
    }
    if (keyIsDown(83)) {
        y = +1;
    }
    gObjTest.move(x, y);
}

function keyPressed() {  //callback
    if (keyCode === 27) {
        zawarudo.changePause();
        if(zawarudo.pause){
            console.log('ZA WARUDO');
        }
    }
    else if(keyCode === 71){
        ret = !ret;
    }
}