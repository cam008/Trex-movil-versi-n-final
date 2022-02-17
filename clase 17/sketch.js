var trex, treximg 
var ground, groundimg
var groundInvisible
var nubeimg
var obstaculo1img, obstaculo2img, obstaculo3img, obstaculo4img, obstaculo5img, obstaculo6img
var score = 0
var obstaclesGroup
var cloudsGroup
var nubes
//var obstaculos
var trexCollided
var gameOverimg
var gameOverSprite
var restartSprite
var restartimg
var dieSound
var checkPointSound
var jumpSound

gameState = "playing"

function preload(){
  treximg = loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimg = loadAnimation("ground2.png")
  nubeimg = loadAnimation("nube.png")
  obstaculo1img = loadImage("obstacle1.png")
  obstaculo2img = loadImage("obstacle2.png")
  obstaculo3img = loadImage("obstacle3.png")
  obstaculo4img = loadImage("obstacle4.png")
  obstaculo5img = loadImage("obstacle5.png")
  obstaculo6img = loadImage("obstacle6.png")

  trexCollided = loadImage("trex_collided.png")
  gameOverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")

  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  jumpSound = loadSound("jump.mp3")
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  trex = createSprite(50,160,10,10);
  trex.addAnimation("trexRunning", treximg)
  trex.scale =0.7
  //trex.debug = true
  trex.setCollider("circle", 0, 0, 35)

  ground = createSprite(width,height -30,400,10)
  ground.addAnimation("groundDesierto", groundimg)

  groundInvisible = createSprite(width, height -25, width *4, 10)
  groundInvisible.visible = false

  trex.addImage("trex_collided", trexCollided)

  gameOverSprite = createSprite(width/2,height/2,10,10)
  gameOverSprite.addImage("gameOver.png", gameOverimg)
  gameOverSprite.scale = 0.1

  restartSprite = createSprite(width/2,height/3)
  restartSprite.addImage("restart.png", restartimg)
  restartSprite.scale = 0.5

  gameOverSprite.visible = false
  restartSprite.visible = false
}

function draw() 
{
  background(rgb(250, 235, 215));
  drawSprites();
  
  text(" Score: " + score, width -120, 20)
  
  trex.collide(groundInvisible)

if (gameState === "playing"){
  console.log("playing")
  ground.velocityX = -7

  if (touches.length > 0 || keyDown("space")){
    trex.velocityY = -10
    touches = []
    jumpSound.play();
  }
  trex.velocityY += 0.8
  

  if(ground.x < 0){
    ground.x = width /2
  }

  spawnClouds();
  spawnObstacles();

  if (obstaclesGroup.isTouching(trex)){
    dieSound.play();

    gameState = "gameOver"

    trex.velocityY = 0
    
  }
 if (frameCount%10 === 0){
   score += 10
 }
   if (frameCount%100 === 0){
   checkPointSound.play();
   console.log("sonido check point", frameCount)
 }
}

if (gameState === "gameOver"){
ground.velocityX = 0
obstaclesGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)
obstaclesGroup.setLifetimeEach(-1)
cloudsGroup.setLifetimeEach(-1)

trex.changeImage("trex_collided",trexCollided)

gameOverSprite.visible = true
restartSprite.visible = true

if (mousePressedOver(restartSprite)){
  gameState = "playing"
  
  gameOverSprite.visible = false
  restartSprite.visible = false

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("trexRunning", treximg)

}

}



}

function spawnClouds(){
  if (frameCount % 100 === 0){
  nubes = createSprite(width , height /2, 10, 10)

  nubes.y = Math.round(random(height /2, height /8))

  nubes.velocityX = -7
  nubes.addAnimation("nubes", nubeimg)
  nubes.scale = 0.2

    nubes.lifetime = 400

    nubes.depth = trex.depth
    trex.depth += 1

    cloudsGroup.add(nubes)
}

}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstaculos = createSprite(width +50, height-28, 10, 10)
    
    obstaculos.velocityX = -7
    obstaculos.scale = 0.7

    
    var numeroAleatorio = Math.round(random(1,6));
    switch(numeroAleatorio){

      case 1: obstaculos.addImage(" obstaculo1 ", obstaculo1img);
      break;
    
      case 2: obstaculos.addImage(" obstaculo2 ", obstaculo2img);
      break;

      case 3: obstaculos.addImage(" obstaculo3 ", obstaculo3img);
      break;

      case 4: obstaculos.addImage(" obstaculo4 ", obstaculo4img);
      break;

      case 5: obstaculos.addImage(" obstaculo5 ", obstaculo5img);
      break;

      case 6: obstaculos.addImage(" obstaculo6 ", obstaculo6img);
      break;

     default: 
     break;
  
    }
    obstaculos.lifetime = 400
    obstaclesGroup.add(obstaculos)
  }
  

  }



