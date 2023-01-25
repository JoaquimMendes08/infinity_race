var playerImg;
var car1;
var car2;
var car3;
var roadImg;
var gameOverImg;
var startImg;
var bonus;

var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0

function preload(){
 
    playerImg = loadImage("car-player.png");
    car1 = loadImage("car1.png");
    car2 = loadImage("car2.png");
    car3 = loadImage("car3.png");
    roadImg = loadImage("Road.png");
    gameOverImg = loadImage("gameOver.png");
    startImg = loadImage("start.png");

    carSound = loadSound("car_sound.mp3");

    bonus = loadAnimation("blueCar.png", "blueCar2.png", "blueCar3.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(750, 560, 20, 20);
    player.addImage(playerImg);
    player.scale = 0.5;
    player.depth = 3;
        
    road = createSprite(width / 2.6, 200);
    road.addImage(roadImg);
    road.scale = 1.3;
    road.depth = 1;
    
    gameOver = createSprite(width / 2, height - 400, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 2;
    gameOver.depth = 2;

    start = createSprite(width / 2, height - 400, 50, 50);
    start.addImage(startImg);
    start.scale = 0.5;
    start.depth = 2;

    whiteCarG = new Group()
    blackCarG = new Group()
    niceCarG = new Group() 
    bonusG = new Group()
    
    edges = createEdgeSprites();

    score = 0
}

function draw() {
    
    background("white")
    
    score = score + Math.round(getFrameRate() / 60);

    if (gameState === PLAY){
        
        road.velocityY = (6 + 3 * score / 150);

        if(carSound.isPlaying() == false){
            carSound.play();
        }

        if(player.isTouching(bonusG)){
            score += 10
            bonus.destroy();
        }

        //player.x = World.mouseX
        //player.velocityX = 2
 
        player.setCollider("rectangle", 0, 0, 150, 450);
        whiteCarG.setColliderEach("rectangle", 0, 0, 100, 250);
        niceCarG.setColliderEach("rectangle", 0, 0, 150, 450);
        blackCarG.setColliderEach("rectangle", 0, 0, 100, 250);
        bonusG.setColliderEach("rectangle", 0, 0, 100, 250);
        
        if(keyIsDown(RIGHT_ARROW)){
            player.position.x += 25
            start.visible = false
        }
        
        if(keyIsDown(LEFT_ARROW)){
            player.position.x -= 25;
            start.visible = false
        }
        
        spawnWhiteCars();
        spawnBlackCars();
        spawnNiceCars();
        spawnBonus();

        player.collide(edges);

        if(road.y > height){
            road.y = height/4;
            score += 1
        }


        if(player.isTouching(whiteCarG)){ 
            gameState = END
        }

        if(player.isTouching(blackCarG)){
            gameState = END
        }

        if(player.isTouching(niceCarG)){
            gameState = END
        }
        
        }
        
        if(gameState === END){
            
            gameOver.visible = true;

            player.velocityX = 0;
            road.velocityY = 0;
                     
            whiteCarG.setVelocityYEach(0);
            blackCarG.setVelocityYEach(0);
            niceCarG.setVelocityYEach(0);
            bonusG.setVelocityYEach(0);
            
            whiteCarG.setLifetimeEach(-1);
            blackCarG.setLifetimeEach(-1);
            niceCarG.setLifetimeEach(-1);
            bonusG.setLifetimeEach(-1);

            carSound.stop();

            score = 0

            
        }


    drawSprites();


    textSize(45);
    fill("white");
    text("your score: " + score, 30, 50);

    textSize(45);
    fill("black");
    text("your score: " + score, 30, 50);

    if(gameState === END){

        textSize(35);
        fill("white");
        text("you died... ", 30, 80);

        textSize(35);
        fill("white");
        text("no more score ", 30, 110);

        textSize(35);
        fill("black");
        text("you died...", 30, 80);

        textSize(35);
        fill("black");
        text("no more score", 30, 110);
    }
}

function spawnWhiteCars(){
    if(World.frameCount % 70 == 0){
        whiteCar = createSprite(Math.round(random(50, width-50), 40, 10, 10))
        whiteCar.addImage(car1)
        whiteCar.scale = 0.8;
        whiteCar.velocityY = road.velocityY
        whiteCar.lifetime = 400
        whiteCarG.add(whiteCar)
        whiteCarG.depth = 2;
        //whiteCar.debug = true;
     
    }
}

function spawnBlackCars(){
    if(World.frameCount % 250 == 0){
        blackCar = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        blackCar.addImage(car2);
        blackCar.scale = 0.8;
        blackCar.velocityY = road.velocityY;
        blackCar.lifetime = 400;
        blackCarG.add(blackCar);
        blackCarG.depth = 3;
        //blackCar.debug = true;
        
    }
}

function spawnNiceCars(){
    if(World.frameCount % 150 == 0){
        niceCar = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        niceCar.addImage(car3);
        niceCar.scale = 0.35;
        niceCar.velocityY = road.velocityY;
        niceCar.lifetime = 400;
        niceCarG.add(niceCar);
        niceCarG.depth = 3;
        //niceCar.debug = true;
    }
}

function spawnBonus(){
    if(World.frameCount % 100 == 0){
        bonus = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        bonus.addAnimation("blueCar.png", "blueCar2.png", "blueCar3.png");
        bonus.scale = 0.8;
        bonus.velocityY = road.velocityY;
        bonus.lifetime = 400;
        bonusG.add(bonus);
        bonusG.depth = 3;
        //bonus.debug = true;
    }
}



