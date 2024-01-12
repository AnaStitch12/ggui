const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

var corda;
var cenoura;
var corda_cenoura;
var caixa;
var botao;
var balao;
var balao1;
var reiniciar

var sfundo;
var scortando
var scomendo4
var air



 function preload ()
 {

scomendo4 = loadSound("eating_sound.mp3")
scortando = loadSound("rope_cut.mp3")
sfundo = loadSound("sound1.mp3")
air = loadSound("air.wav")






}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,680,600,20);

  corda = new Rope(8,{x:220,y:25});

  cenoura = Bodies.circle(280,280,20);
  Matter.Composite.add(corda.body,cenoura);
  balao=createButton('Balao')
  balao.position(20,250)

  balao1=createButton('Balao1')
  balao1.position(425,250)

caixa = createSprite(Math.round(random(50,450)),620,100,100);

parede = createSprite()

  corda_cenoura = new Link(corda,cenoura);
 
botao=createButton("tesoura")
botao.position(215,15)
botao.mouseClicked(()=>{
  drop()})

balao.mouseClicked(()=>{
  assoprar(0,0,0.01,0)
})
balao1.mouseClicked(()=>{
  assoprar(0,0,-0.01,0)
})
reiniciar=createButton('reiniciar')
reiniciar.position(50,70)
reiniciar.mouseClicked(()=>{
  window.location.reload()
})


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  sfundo.play()
  sfundo.setVolume(0.1)
  
}



function draw() 
{
  background(51);

  ground.show();
  corda.show();
  

  push();
  fill('orange');
  if(cenoura!=null){
    ellipse(cenoura.position.x,cenoura.position.y,20,20);
  }
 
  pop();

  if(collide(cenoura,caixa)==true) {
   
    caixa.shapeColor='lightgreen'
    scomendo4.play()
  
  }
  
if(collide(cenoura,ground.body)==true){
  ground.shapeColor='red'
}


  Engine.update(engine);
  
drawSprites()



 
   
}

function collide(corpo,caixa){
  if(corpo!= null){
    var distancia = dist (corpo.position.x,corpo.position.y,caixa.position.x,caixa.position.y)
    console.log("dhoreqhiher3nsyfiuiuew")
   if(distancia <= 80){
    World.remove(world, cenoura)
    cenoura = null
     return true
   }else{
    return false
   }
   
   

  }
}




function assoprar(x1,y1,x2,y2){
  Matter.Body.applyForce(cenoura, {x:x1,y:y1}, {x:x2, y:y2})
}



function drop(){
  corda.break()
  corda_cenoura.dettach()
  corda_cenoura=null
  scortando.play()    
  
}