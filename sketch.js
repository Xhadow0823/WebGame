// This is a testing file

let BC = new BulletCtrler;

function setup(){
    createCanvas(windowWidth, 500);
}

function draw(){
    background(0);
    shape();
    BC.update();
    BC.draw();

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