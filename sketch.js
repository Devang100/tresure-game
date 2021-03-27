var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var score;
var PLAY=1;
var OVER=0;
var gameState=PLAY;
var game_over,g_over;
var restart,reset_img;
var loot,loot_img;
var bground;
var policehorn;
var cone,cone_img;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  g_over = loadImage("gameover.png");
  reset_img = loadImage("RESET.png");
  loot_img = loadImage("loot.png");
  policehorn = loadSound("Policecar8211sirenone.mp3");
  cone_img = loadImage("cone.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  score=0
  // Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  


  //creating boy running
  boy = createSprite(width/2,height-70,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  game_over = createSprite(width/2,height-200,20,20);
  game_over.addImage(g_over);
  
  restart = createSprite(width/2,height-120,20,20);
  restart.addImage("reset",reset_img);
  restart.scale = 0.5;


  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  lootG=new Group();
  coneG=new Group();

  }

function draw() {

  background(0);
   if(touches.length>0||boy.x ===World.mouseX){
    touches = [];
  }
  boy.x = touches.x
  boy.x = World.mouseX
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createLootbox();
    createcone();

   
    if(gameState===PLAY){
      
      boy.visible = true;
      game_over.visible =false;
      restart.visible = false;
      
      cashG.velocityY = -(6 + 5*score/10);
      diamondsG.velocityY = -(6 + 5*score/10);
      jwelleryG.velocityY = -(6 + 5*score/10);
      swordGroup.velocityY = -(6 + 5*score/10);
      coneG.velocityY = -(6 + 5*score/10);
  
     
       if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score=score+1;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score=score+5;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score=score+3;
      
    }
         else if(coneG.isTouching(boy)) {
      coneG.destroyEach();
      score=score-2;
      
      
      
    }
    else if(lootG.isTouching(boy)) {
      lootG.destroyEach();
      score=score+10;
      
      
    }
 else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = OVER;
    }
  }
      path.velocityY = 8;
      if(path.y > height ){
        path.y = height/2;
  }
    }
  
  else if(gameState===OVER){
    
    game_over.visible = true;
    boy.visible = false;
    restart.visible = true;
    path.velocityY = 0;
    createChanges();
   
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    
    
    
  }

  drawSprites();
  textSize(25);
  fill("black");
  text("Treasure: "+ score,width/2-60,height-530);

}


function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.21;
  cash.velocityY = 7;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 180 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.06;
  diamonds.velocityY = 7;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 150 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.25;
  jwellery.velocityY = 7;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.15;
  sword.velocityY = 7;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function createChanges(){
    cashG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    coneG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    lootG.setVelocityEach(0);
    cashG.setLifetimeEach(-1);
    coneG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1); 
    lootG.setLifetimeEach(-1);
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    coneG.destroyEach();
    swordGroup.destroyEach();
    lootG.destroyEach();
}
function createLootbox(){
    if (World.frameCount % 500 == 0) {
  var loot = createSprite(Math.round(random(50, width-50),40, 10, 10));
  loot.addImage(loot_img);
  loot.velocityY = 7;
  loot.scale = 0.75;
  loot.lifetime = 150;
  lootG.add(loot);
  }
  
  
}
function createcone() {
  if (World.frameCount % 120 == 0) {
  var cone = createSprite(Math.round(random(50, width-50),100, 10, 10));
  cone.addImage(cone_img);
  cone.scale=0.50;
  cone.velocityY = 7;
  cone.lifetime = 150;
  coneG.add(cone);
  }
}

function reset(){
  gameState = PLAY;
  score = 0

  
}