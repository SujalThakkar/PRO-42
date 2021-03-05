var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var bananas;
var jungle;
var ground2;

var fruit,appleimage;
var groundImage ;
var gameover;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground1.png");
  jungle = loadImage("jungle.jpg")
  
 
}
function setup() {
  createCanvas(windowWidth,windowHeight)
  monkey = createSprite(width/2 - 300,height - 40, 20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
 monkey.debug = false;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 
  ground = createSprite(width/2,height - 40,width*2,10);
  ground.visible = false;

   ground2 = createSprite(width/2 - 1000 ,height/2 - 100);
  ground2.addImage(jungle);
  ground2.scale = 2
  ground2.velocityX = -2
  ground2.depth = monkey.depth
  monkey.depth = monkey.depth + 1
  
  
  FoodGroup = createGroup();
  
  obstacleGroup = createGroup();
  
  score = 0 ;
 }


function draw() {
  background(0);
// background(rgb(170, 238, 11))
 // background("white")
  stroke("white")
  textSize(24);
  fill("white")
  text("Survival Time: "+ score,width/2 - 100,height/2 - 200);
   score.depth = monkey.depth + 1
  
  if (gameState === PLAY){
    
    //  score = score + Math.round(getFrameRate()/60);
    
    switch(score){
      case 10: monkey.scale = 0.12;
          break;
      case 20: monkey.scale = 0.14;
          break;
      case 40: monkey.scale = 0.16;
          break;
      case 80: monkey.scale = 0.18;
      default: break;
    }
    
    if(FoodGroup.isTouching(monkey)){
      score = score + 2
      FoodGroup.destroyEach();
    }
    
  
     ground2.velocityX = -(2 + 3* score/100)
  
  if(keyDown("space")&& monkey.y >= height - 140){
    monkey.velocityY = -14 
  }
  
    monkey.velocityY = monkey.velocityY + 0.6
  
  monkey.collide(ground);
  
  if (ground2.x < 0 ){
    ground2.x = ground2.width/2;
  }
    
    if (ground.x < 0 ){
    ground.x = ground.width/2;
  }
    
  spawnobstacle();
  
  spawnbanana();
  
  if (obstacleGroup.isTouching(monkey)){
  //  ground.velocity = 0
    monkey.scale = 0.12
    score = score - 2;
    obstacleGroup.destroyEach();
  // gameState = END ;
  }
    
  }
  
  else if (gameState === END){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  

  drawSprites();
  
  stroke("white")
  textSize(24);
  fill("white")
  text("Survival Time: "+ score,width/2 - 100,height/2 - 200);
  // score.depth = monkey.depth + 1
}

function spawnobstacle(){
  if(frameCount%100 === 0){
    var  obstacle = createSprite(width - 10,height - 60,20,20)
    obstacle.velocityX = -4
    obstacle.addImage(obstacleImage);
     obstacle.setCollider("circle",obstacle.X,obstacle.Y);
    obstacle.scale = 0.12;
    obstacle.debug = false;    
    obstacle.lifetime = 500
    obstacleGroup.add(obstacle);
  }
}

function spawnbanana(){
 if (frameCount%200 === 0){
  var banana = createSprite(width - 10,Math.round(random(height - 100,height - 60)),20,20);
   banana.velocityX = -5;
   banana.addImage(bananaImage);
   banana.scale = 0.1
   banana.lifetime = 500
    FoodGroup.add(banana);
 
 }
  
 }