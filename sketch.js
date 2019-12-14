// This is a testing file
function setup(){
    createCanvas(windowWidth, 500);
}

function draw(){
    background(0);
    shape();
}

let x = 50;
let y = 50;

function shape(){
    fill(255);
    rect(x, y ,50 ,50);
}