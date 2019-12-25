// This is a testing file

let story;
let player;
let WORLD;
let BC;
let EC;
let ey;


let ret = false;

// preload block
let bg;
let urchin;
let squid;
let plastic_bag;
let strawW;
let bottleG;
let turtleB;
function preload(){
    //TOOLS

    //ASSETS
    bg = loadImage('starry-sky.jpg');
    urchin = loadImage('sea_urchin.png');
    squid = loadImage('squid.png');
    plastic_bag = loadImage('plastic_bag.png');
    strawW = loadImage('strawW.png');
    bottleG = loadImage('plastic_bottleG.png');
    turtleB = loadImage('turtle_back.png');
}
// END PRELOAD BLOCK

function setup() {
    createCanvas(windowWidth, windowHeight);
    story = new Story();loadStage();
    WORLD = new World();
    BC = new BulletCtrler();
    EC = new EnemyCtrler();
    player = new Player(width/2, height/2);
    ey = new Enemy(200, 200);
}

function draw() {
    background(255);
    WORLD.background();
    
    //update blobk
    if (!WORLD.pause) {
        WORLD.update();
        BC.update();
        EC.update();
        ey.update();
        player.update();
        BC.hitO(player);
        BC.hitO(ey);
    }
    shape();

    if(ret){
        player.moveto(450, 200);
    }else{
        keyP();
    }

    if (BC.hit(x + 25, y + 25, 25)) {
        console.log("HIT BOX");
    }



    //draw block
    BC.draw();
    EC.draw();
    ey.draw();
    player.draw();
    WORLD.draw();  // on the most top
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
    player.move(x, y);
}

function keyPressed() {  //callback
    if (keyCode === 27) {
        WORLD.changePause();
        if(WORLD.pause){
            console.log('ZA WARUDO');
        }
    }
    else if(keyCode === 71){
        ret = !ret;
    }
}