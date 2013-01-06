var layouts = [],
    selectedCapacity = "",
    ctx, canvas, //html5 things
    f = 0,	//frame count
    stats = false;
    
//TODO: level loader
// level list
var levels = [
  { 
    toSave: 0, saved: 0, produced: 0, toProduced : 20, dead : 0 , 
    exit : { x : 0  , y: 0 } 
  }
];


/*** NPCs ***/
var holes = [], tiles = [];
var img = new Image(), block = new Image(), imgWater = new Image(), exitImg = new Image();

//**************************
//*** our little pingus ****
//**************************
var pingus = [];

//*** IMAGES ***/
var pingusImages = {
  walker : new Image(),
  faller : new Image(),
  floater  : new Image(),
  splat  : new Image(),
  slider  : new Image(),
  basher  : new Image(),
  blocker  : new Image(),
  boarder  : new Image(),
  bomber  : new Image(),
  bridger  : new Image(),
  bridger_walk  : new Image(),
  climber  : new Image(),
  digger  : new Image(),
  drownfall  : new Image(),
  drownwalk  : new Image(),
  exit  : new Image(),
  miner  : new Image(),
  superman  : new Image(),
  tumble  : new Image(),
  waiter  : new Image(),
};
/**************************************************************/
/****                                                      ****/
/****                    GAMELOOP  FUNCTION                ****/
/****                                                      ****/
/**************************************************************/
function gameloop(){
  //TODO: in dom please
  // are upon cursors?
  //todo: get right hud
  if (cursor.y < 32 && cursor.x > canvas.width - 32 * 9){
    if (cursor.buttonLeft){
      // pingus job and capacities updates
      switch (rest){
	case 1:
	break;
	case 2:
	  selectedCapacity = "digger";
	break;
	case 3:
	  selectedCapacity = "blocker";
	break;
	case 4:
	  selectedCapacity = "miner";
	break;
	case 5:
	  selectedCapacity = "bomber";
	break;
	case 6:
	  selectedCapacity = "bridger";
	break;
	case 7:
	  selectedCapacity = "climber";
	break;
	case 8:
	  selectedCapacity = "digger";
	break;
	case 9:
	  selectedCapacity = "floater";
	break;
      }
    }
  }
  
  //TODO: state machine
  if (this.game.level.saved + this.game.level.dead == this.game.level.toProduced){      
       ctx.fillStyle = "rgb(255,0,0)";
       ctx.fillText("Win!",canvas.width / 2 - 30,canvas.height / 2 - 30);
       ctx.fillText(this.game.level.saved + "/" + this.game.level.produced);
       return ; 
  }
  
  //let's clear this.game.drawingPanel
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.clearRect(0,0,canvas.width,canvas.height); //... : ? ctx.fillStyle = 'rgb(1,1,1)';  
  ctx.drawImage(exitImg, this.game.level.exit.x, this.game.level.exit.y);

  for (var i = 0 ; i < layouts.length; i++){
    layouts[i].draw();
  }
  for (var i = 0 ; i < 600 ; i+=90){
    ctx.drawImage(block, i, 100);
  }
  for (var i = 0 ; 200 + i  < canvas.width ; i+=90){
    ctx.drawImage(block,200 + i, 200);
  }
  for (var i = 0 ; i  < 600 ; i += 90){
    ctx.drawImage(block, i, 400);
  }
  for (var i = 0 ; i  < canvas.width ; i += 512){
    ctx.drawImage(imgWater, i, canvas.height - 32);
  }
   
  for (var i = 0 ; i < holes.length ; i++){
    ctx.clearRect(holes[i].x,holes[i].y - 3,32,4);
  }
  ctx.fillStyle = "rgba(2,1,2,1)";
  for (var i = 0 ; i < tiles.length ; i++){
    ctx.fillRect(tiles[i].x,tiles[i].y , 15, 6);
  }
  
  // pingus loop 
  for (var i = 0 ; i < pingus.length ; i++){
    var pingu = pingus[i];
    //is he in front of the exit???
    if (pingu.x > this.game.level.exit.x - 20 && pingu.x < this.game.level.exit.x + 20 && 
	pingu.y > this.game.level.exit.x - 20 && pingu.y < this.game.level.exit.y + 20){
      pingu.exiting = true;
      pingu.countFrame++;
      if (pingu.countFrame == 6){
	pingus.splice(i,1);
	this.game.level.saved++;
      }
    }
    else if (pingu.bomber){
      pingu.countFrame++;
      if (pingu.countFrame == 12){
	pingus.splice(i,1);
	this.game.level.dead++;
      }
    }
    //does the cursor is upon the mouse?
    if (pingu.x < cursor.x && pingu.x + 32 > cursor.x 
	&& pingu.y < cursor.y && pingu.y + 32 > cursor.y){
      ctx.strokeStyle = "rgba(199,0,0,0.7)";
      ctx.strokeRect(pingu.x + 2, pingu.y + 2 , 28, 28);
      ctx.stroke();
      if (cursor.buttonLeft){
	    pingu.job.push(selectedCapacity);
      }
    }
    pingu.live();
    if (pingu.state == -2){
      pingus.splice(i,1);
    }
  }
  if (this.game.level.produced < this.game.level.toProduced && f % 40 == 0){
      pingus.push(new Pingu(0,50));
      this.game.level.produced++;
  }
}
function run(){
  gameloop();
  requestAnimFrame(run);
  //total frame count
  f++;
  if (stats) 
     stats.update();
}
function loadPingusImages(){
  //level elements
  exitImg.src = 'src/exitSnow.png';
  imgWater.src = "src/water.png";
  block.src = "src/snowBlock.png"
  pingusImages.walker.src = "src/walker.png"
  pingusImages.faller.src = "src/faller.png"
  pingusImages.splat.src = "src/splat.png";
  pingusImages.floater.src = "src/floater.png";
  pingusImages.slider.src = "src/slider.png";
  pingusImages.basher.src = "src/basher.png";
  pingusImages.blocker.src = "src/blocker.png";
  pingusImages.boarder.src = "src/boarder.png";
  pingusImages.bomber.src = "src/bomber.png";
  pingusImages.bridger.src = "src/bridger.png";
  pingusImages.bridger_walk.src = "src/bridger_walk.png";
  pingusImages.climber.src = "src/climber.png";
  pingusImages.digger.src = "src/digger.png";
  pingusImages.drownfall.src = "src/drownfall.png";
  pingusImages.drownwalk.src = "src/drownwalk.png";
  pingusImages.exit.src = "src/exit.png";
  pingusImages.miner.src = "src/miner.png";
  pingusImages.slider.src = "src/slider.png";
  pingusImages.superman.src = "src/superman.png";
  pingusImages.tumble.src = "src/tumble.png";
  pingusImages.waiter.src = "src/waiter.png";

}
//===========================================
//=========          INIT            ========
//===========================================  
window.onload = function(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  initControls();
  loadPingusImages();
  ctx.canvas.width = 800;
  ctx.canvas.height = 500;
  this.game = { };
  this.game.level = levels[0];
  // STATS
  if (stats){
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.getElementById("jobs").appendChild( stats.domElement );
  }
  run();
}