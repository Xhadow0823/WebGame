// This is a testing file

let BC = new BulletCtrler;
let gObjTest = new GameObject;

function setup(){
    createCanvas(windowWidth, 500);
    gObjTest.pos = createVector(50, 50);
}

function draw(){
    background(0);
    shape();
    BC.update();
    BC.draw();

    keyP();
    gObjTest.draw();
    if(BC.hit(x+25, y+25, 25)){
        console.log("HIT");
    }
}

let x = 50;
let y = 50;

function shape(){
    fill(255);
    rect(x, y ,50 ,50);
}

function mouseClicked(){
    BC.shoot(mouseX, mouseY);
}

function keyP() {
    let x = 0, y = 0;
    if (keyIsDown(LEFT_ARROW)) {
        x = -1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x = +1;
    }
    if (keyIsDown(UP_ARROW)) {
        y = -1;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y = +1;
    }
    gObjTest.move(x, y);
}