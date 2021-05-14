const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var bird, slingshot;
var gameState = "onsling";
var mConstraint;
var score = 0
function preload() {
    getBackgroundImg();
    bgAlternate = loadImage("../sprites/bg.png");
    sling1Img = loadImage("../sprites/sling1.png");
    sling2Img = loadImage("../sprites/sling2.png");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,590,1200,20);
    platform = new Ground(150, 475, 300, 240);

    box1 = new Box(800,540,70,70);
    box2 = new Box(1000,540,70,70);
    pig1 = new Pig(900, 540);
    log1 = new Log(900,500,280, PI/2);

    box3 = new Box(800,450,70,70);
    box4 = new Box(1000,450,70,70);
    pig2 = new Pig(900, 450);

    log3 =  new Log(900,410,280, PI/2);

    box5 = new Box(900,360,70,70);
    log4 = new Log(840,360,150, PI/7);
    log5 = new Log(960,360,150, -PI/7);
   
   
        
    bird = new Bird(270,170);

    console.log(bird.body);
    
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:270, y:170});


    let canvasmouse = Mouse.create(canvas.elt);
     canvasmouse.pixelRatio = pixelDensity();
        let options = {
        mouse: canvasmouse
        }
        mConstraint = MouseConstraint.create(engine, options);
        World.add(world, mConstraint);


        
       // console.log(mConstraint)  

    
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    else
    background(bgAlternate);
        noStroke();
        textSize(35);
        fill("white");
        textSize(20);
        text( score, width-200, 30);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();


    image (sling1Img,270,160);
    bird.display();
    image (sling2Img,245,160);

    slingshot.display();        

    if(gameState === "launched"){
        World.remove(world,mConstraint);
    }

    pig1.score();
    pig2.score();
   
}

// function mouseDragged(){
//     if(gameState !== "launched"){
//         Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
//     }
// }


function mouseReleased(){
    setTimeout(() => {
        slingshot.fly();
      }, 150);
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
        bird.trajectory = [];    
        Matter.Body.setVelocity(bird.body, { x : 0, y: 0});
        Matter.Body.setPosition(bird.body,{x:270,y:170});
        slingshot.attach(bird.body);
        Matter.Body.setAngle(bird.body,0);
        gameState = "onsling";
        World.add(world,mConstraint);
     }
}

async function getBackgroundImg()
{
    var bg;
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata", { mode: 'no-cors'});
   // console.log(response);
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);
    //console.log(hour);

    if(hour>=6 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    //console.log(dateTime);
}
