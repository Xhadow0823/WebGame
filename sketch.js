// This is a testing file

let story;
let player;
let WORLD;
let BC;
let EC;
let BFC;
let ey;


let ret = false;

// PRELOAD BLOCK
//TX
let bg;
let urchin;
let squid;
let plastic_bag;
let strawW;
let bottleG;
let turtleB;
let turtleF;
let medicine;
let kfh;
//SE
let BGM;
let pauseSnd;
let pauseEndSnd;
let enemyDsty;
let getBuffSnd;
let addLifeSnd;
let shoot1;
let shoot2;
let shoot3;
let shoot4;
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
    turtleF = loadImage('assets/turtle_front.png');
    medicine = loadImage('assets/medicine.png');
    kfh = loadImage('assets/koreaFish.jpg');
    //SE
    //soundFormats('mp3');
    BGM = loadSound('sounds/game_maoudamashii_8_piano01.mp3');
    pauseSnd = loadSound('sounds/setPause.mp3');
    pauseEndSnd = loadSound('sounds/pauseEnd.mp3');
    enemyDsty = loadSound('sounds/enemyDestroied.mp3');
    getBuffSnd = loadSound('sounds/getBuff2.mp3');
    addLifeSnd = loadSound('sounds/addLife.mp3');
    shoot1 = loadSound('sounds/shoot (1).mp3');
    shoot2 = loadSound('sounds/shoot (2).mp3');
    shoot3 = loadSound('sounds/shoot (3).mp3');
    shoot4 = loadSound('sounds/shoot (4).mp3');
}
// END PRELOAD BLOCK

function setup() {
    BGM.loop();
    story = new Story();loadStage();
    WORLD = new World();
    createCanvas(WORLD.width, WORLD.height);
    BC = new BulletCtrler();
    EC = new EnemyCtrler();
    player = new Player(width/2, height/2);
    //ey = new Enemy(200, 200);
    BFC = new BuffCtrler();
}

function draw() {
    background(255);
    WORLD.background();
    
    //update blobk
    if (!WORLD.pause) {
        WORLD.update();
        BC.update();
        EC.update();
        BFC.update();
        //ey.update();
        player.update();
        BC.hitO(player);
        BFC.eaten(player);
        //BC.hitO(ey);
    }

    /*
    //for test
    shape();
    if (BC.hit(x + 25, y + 25, 25)) {
        console.log("HIT BOX");
    }
    */

    if(ret){
        if(!player.moveto(450, 200)){  ret=false;}//for test
    }else{
        keyP();
    }

    //draw block
    BC.draw();
    EC.draw();
    BFC.draw();
    //ey.draw();//for test
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
/*
<script src="p5.js"></script>
<script src="p5.sound.min.js"></script>
<script src="tools.js"></script>
<script src="world.js"></script>
<script src="bullet.js"></script>
<script src="gameObject.js"></script>
<script src="player.js"></script>
<script src="enemy.js"></script>
<script src="buff.js"></script>
<script src="story.js"></script>
<script src="sketch.js"></script>
*/