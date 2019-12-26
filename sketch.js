// This is a testing file

let story;
let player;
let WORLD;
let BC;
let EC;
let ey;


let ret = false;

// PRELOAD BLOCK
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
    bg = loadImage('assets/starry-sky.jpg');
    urchin = loadImage('assets/sea_urchin.png');
    squid = loadImage('assets/squid.png');
    plastic_bag = loadImage('assets/plastic_bag.png');
    strawW = loadImage('assets/strawW.png');
    bottleG = loadImage('assets/plastic_bottleG.png');
    turtleB = loadImage('assets/turtle_back.png');
}
// END PRELOAD BLOCK

function setup() {
    story = new Story();loadStage();
    WORLD = new World();
    createCanvas(WORLD.width, WORLD.height);
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

    //for test
    shape();
    if (BC.hit(x + 25, y + 25, 25)) {
        console.log("HIT BOX");
    }

    if(ret){
        if(!player.moveto(450, 200)){  ret=false;}//for test
    }else{
        keyP();
    }

    //draw block
    BC.draw();
    EC.draw();
    ey.draw();//for test
    player.draw();
    WORLD.draw();  // UI, on the most top
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