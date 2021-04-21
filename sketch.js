var gameState = "play";

var tower, towerImage;
var door, doorImage;
var climber, climberImage;
var invisibleBlock; 

var ghost, ghostImage, spookySound;

var doorsGroup;
var climbersGroup;
var invisibleBlockGroup;

function preload() {
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);  
  tower.addImage(towerImage);
  tower.velocityY= 1;
  
  ghost = createSprite(300,200);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  spookySound.play();
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("black");
  
  if (gameState === "play") {
    
      if (tower.y > 600){
    tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    if (keyDown("right")){
      ghost.x = ghost.x + 5;

    }

    if (keyDown("left")){
      ghost.x = ghost.x - 5;

    }
    
      ghost.velocityY = ghost.velocityY + 0.5;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
    
    drawSprites();
    
  }
  
  if (gameState === "end") {
    
    fill("yellow");
    textSize(40);
    text("GAME OVER", 230, 250);
    
  }
  
  
  
}

function spawnDoors(){
  
  if (frameCount % 250 === 0) {
    door = createSprite(200, 50);
    door.addImage(doorImage);
    
    climber = createSprite(200, 110);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(200,115,20,2);
    invisibleBlock.width = climber.width;
    
    door.x = Math.round(random(100, 400));
    climber.x = door.x;
    invisibleBlock.x = climber.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    invisibleBlock.debug = true;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
  
  
}


