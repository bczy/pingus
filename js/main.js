//**************************
//***       PINGUS!     ****
//**************************
var pingus = [];

//*** sprites map ***/
var pingusImages = {
	walker : new Image(),
	faller 	: new Image(),
	floater  : new Image(),
	bridger  : new Image(),
	bridgerWalk  : new Image(),
	climber  : new Image(),
	digger  : new Image(),
	slider  : new Image(),
	miner  : new Image(),
	blocker  : new Image(),
	bomber  : new Image(),
	exit  : new Image(),
	splat  : new Image(),
	drownfall  : new Image(),
	drownwalk  : new Image(),
};
var holes = [], 	//made by digger & miner
		tiles = [];   //build by bridger

/********************* NPCs ******************/
var imgBackground,		//background canvas context
		img = new Image(),	//todo: still used?
		block = new Image(), imgWater = new Image(), exitImg = new Image();

// Level list
//TODO: level loader
var levels = [
	{
		toSave: 0, saved: 0, produced: 0, toProduced : 100, dead : 0 ,
		exit : { x : 0  , y: 0 }
	}
];
// Input events
var canvasCursor ,
		domCursor, //icons layout;
		redCursor  //red box

//graphical stuff
var layouts = [],
		selectedCapacity = "",
		ctx, canvas, 									//playable layout
		f = 0,												//frame count
		stats = true;

/**************************************************************/
/****                                                      ****/
/****                    GAMELOOP  FUNCTION                ****/
/****                                                      ****/
/**************************************************************/
function gameloop(){
	// are we changing selected capacity by clicking on job list?
	if (domCursor.click){
		if (domCursor.y < 32 && domCursor.x > domCursor.width - 32 * 9){
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

	//let's clear game.drawingPanel
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.clearRect(0,0,canvas.width,canvas.height); //... : ? ctx.fillStyle = 'rgb(1,1,1)';
	ctx.drawImage(exitImg, game.level.exit.x, game.level.exit.y);

	for (var i = 0 ; i < layouts.length; i++){
		layouts[i].draw();
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
		if (pingu.x > game.level.exit.x - 20 && pingu.x < game.level.exit.x + 20 &&
				pingu.y > game.level.exit.x - 20 && pingu.y < game.level.exit.y + 20){
			pingu.exiting = true;
			pingu.countFrame++;
			if (pingu.countFrame == 6){
				pingus.splice(i,1);
				game.level.saved++;
			}
		}
		else if (pingu.bomber){
			//todo
			console.log("bomber")
			pingu.countFrame++;
			if (pingu.countFrame == 12){
				pingus.splice(i,1);
				game.level.dead++;
			}
		}
		//does the canvasCursor is upon the mouse?
		if (pingu.x < canvasCursor.x && pingu.x + 32 > canvasCursor.x
				&& pingu.y < canvasCursor.y && pingu.y + 32 > canvasCursor.y){
			if (f%70 === 0){
					console.log(pingu.x + " " + canvasCursor.x);
					console.log(pingu.y + " " + canvasCursor.y);
			}
			ctx.strokeStyle = "rgba(199,0,0,0.7)";
			ctx.strokeRect(pingu.x + 2, pingu.y + 2 , 28, 28);
			ctx.stroke();
			if (canvasCursor.click){
				console.log(pingu.capacities);
				pingu.capacities.push(selectedCapacity);
			}
		}
		pingu.live();
		if (pingu.state == -2){
			pingus.splice(i,1);
		}

		if (game.level.produced < game.level.toProduced && f % 60 == 1){
				pingus.push(new Pingu(0,50));
				game.level.produced++;
		}


		//TODO: state machine to complete
		if (game.level.produced == game.level.toProduced){
				ctx.fillStyle = "rgb(255,0,0)";
				ctx.fillText("Win!",canvas.width / 2 - 30,canvas.height / 2 - 30);
				if (game.level.saved <= game.level.toSave){
					ctx.fillText(game.level.saved + "/" + game.level.produced, canvas.width / 2 - 30,canvas.height / 2 - 70);
					return ;
				}
		}
		ctx.putImageData(imgBackground,0,0);
	}
}
function run(){
	f++;
	gameloop();
	requestAnimFrame(run);
	//total frame count
	if (stats)
		stats.update();
}
function loadNPCImages(){
	//level elements
	exitImg.src = "src/exitSnow.png";
	imgWater.src = "src/water.png";
	block.src = "src/snowBlock.png";
}
function loadPingusImages(){
	pingusImages.walker.src = "src/walker.png"
	pingusImages.faller.src = "src/faller.png"
	pingusImages.splat.src = "src/splat.png";
	pingusImages.floater.src = "src/floater.png";
	pingusImages.slider.src = "src/slider.png";
	pingusImages.blocker.src = "src/blocker.png";
	pingusImages.bomber.src = "src/bomber.png";
	pingusImages.bridger.src = "src/bridger.png";
	pingusImages.bridgerWalk.src = "src/bridgerWalk.png";
	pingusImages.climber.src = "src/climber.png";
	pingusImages.digger.src = "src/digger.png";
	pingusImages.drownfall.src = "src/drownfall.png";
	pingusImages.drownwalk.src = "src/drownwalk.png";
	pingusImages.exit.src = "src/exit.png";
	pingusImages.miner.src = "src/miner.png";
	pingusImages.slider.src = "src/slider.png";
}
//===========================================
//=========          INIT            ========
//===========================================
window.onload = function(){
	canvas = document.createElement("canvas");
	ctx = canvas.getContext('2d');
	canvas.style.position = "absolute";
	canvas.style.top = "33px";
	ctx.canvas.width = 800;
	ctx.canvas.height = 500;
	document.getElementById("game").appendChild(canvas);
	canvasCursor = new Controller(canvas);
	canvas.onmousedown = function(e)
	{
		console.log("click");
		console.log(canvasCursor);
	}
	canvas.onmousemove = function(e)
	{
		if (e.buttonLeft)
			this.click = this.click ? false : true;
		this.oldX = this.x;
		this.oldY = this.y;
		if(e.offsetX) {
			this.x = e.offsetX;
			this.y= e.offsetY;
		}
		else if(e.layerX) {
			this.x = e.layerX;
			this.y = e.layerY;
		}
	}

	var icons = document.createElement("div");
	icons.style.backgroundImage = "url('src/jobs.png')";
	icons.style.backgroundPosition = "2px 2px";
	icons.style.backgroundRepeat = "no-repeat";
	icons.style.position = "absolute";
	icons.style.top = "0px";
	icons.style.border = "solid 1px #000";
	icons.style.height = "32px";
	icons.style.width = "800px";
	document.getElementById("game").appendChild(icons);
	domCursor = new Controller(icons);

	redCursor = document.createElement("div");
	redCursor.style.border = "solid 1px #F00";
	redCursor.style.position = "absolute";
	redCursor.style.top = "0px";
	redCursor.style.height = "28px";
	redCursor.style.width = "28px";

	document.getElementById("game").appendChild(redCursor);
	console.log( (canvasCursor));

	//load ressources
	loadPingusImages();
	loadNPCImages();

	// create background temporary image
	var bgCanvas = document.createElement('canvas');
	bgCtx = canvas.getContext('2d');
	bgCtx.width = 800;
	bgCtx.height = 500;
	for (var i = 0 ; i < 600 ; i+=90){
		bgCtx.drawImage(block, i, 100);
	}
	for (var i = 0 ; 200 + i  < canvas.width ; i+=90){
		bgCtx.drawImage(block,200 + i, 200);
	}
	for (var i = 0 ; i  < 600 ; i += 90){
		bgCtx.drawImage(block, i, 400);
	}
	for (var i = 0 ; i  < canvas.width ; i += 512){
		bgCtx.drawImage(imgWater, i, canvas.height - 32);
	}
	imgBackground = bgCtx.getImageData(0,0,800,600);

	// TODO: game state machine to complete
	game = { };
	game.level = levels[0];
	game.pause = false;
	game.game = false;
	game.loading = false;

	// framerate
	if (stats){
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.right = '600px';
		stats.domElement.style.top = '0px';
		stats.domElement.style.zIndex = 100;
		document.body.appendChild( stats.domElement );
	}
	run();
}
