// This is a testing file

let BC = new BulletCtrler;
let gObjTest = null;
let zawarudo = new World();

function setup() {
    createCanvas(windowWidth, 500);
    gObjTest = new GameObject(width/2, height/2);
}

function draw() {
    background(0);
    shape();

    //update blobk
    if (!zawarudo.pause) {
        BC.update();
    }

    //draw block
    BC.draw();
    zawarudo.draw();

    keyP();
    gObjTest.draw();
    if (BC.hit(x + 25, y + 25, 25)) {
        console.log("HIT");
    }
    BC.hitO(gObjTest);
}

let x = 50;
let y = 50;

function shape() {
    fill(255);
    rect(x, y, 50, 50);
}

function mouseClicked() {
    BC.shoot(mouseX, mouseY);
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
function keyPressed() {
    if (keyCode === 27) {
        zawarudo.changePause();
        if(zawarudo.pause){
            console.log('ZA WARUDO');
        }
    }
}