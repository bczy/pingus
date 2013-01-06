/*** MAIN OBJECTS (Ennemies, explosions & missiles) ***/
/*************** dig holes ****************/
function Element(x,y){
  this.x = x;
  this.y = y;
}

//=========================================================== 
//***************          Pingu !           **************//
//=========================================================== 
function Pingu(x,y,level){
  this.direction = -1;
  this.previousDirection = 0;
  this.state = 0;
  this.x = x;
  this.y = y - 12;
  this.speed = 0;
  this.frame = 0;
  this.countFrame = 0;
  this.job = [];
  this.drown = false;
  this.blocking = false;
  this.exiting = false;
  this.bomber = false;
  this.miner = false;
  this.capacities = { build : 2 , floater: 2};
  //===========================================================
  //====		 PINGU LIFE CYCLE		    ===
  //===========================================================
  this.live = function(){	
    //==========================
    // behaviour management
    //==========================
    var imageData = ctx.getImageData(this.x + 15, this.y + 32 + ~~(this.speed), 1, 1).data;
    var digging = false;
    for (var i = 0 ; i < this.job.length ; i++){
      if (this.job[i] == "digger"){
	digging = true;
      }
      else if (this.job[i] == "blocker" && this.direction != -1){
	this.blocking = true;
      }
      else if (this.job[i] == "bridger" && this.direction != -1){
	this.bridger = true;
      }
      else if (this.job[i] == "bomber" && this.direction != -1){
	this.bomber = true;
      }
      else if (this.job[i] == "miner" && this.direction != -1){
	this.miner = true;
      }
    }
    if (this.bomber){
    }
    else if (this.exiting){
    }
    else if (this.bridger){
      var tilePosition = !this.direction ? this.x + 30 : this.x - 6;
      tiles.push( new Element(tilePosition , this.y + 30));
      this.countFrame+=1;
      if (this.countFrame % 280 == 0 ){
	this.bridger = false;
	for (var i = 0; i < this.job.length ; i++){
	    if (this.job[i] == "bridger")
	      this.job.splice(i,1);
	    i--;
	}
      }
    }
    else if (this.blocking){
    }
    else if (this.drown){
    }
    else if (this.miner){
      var imageDataMiner = ctx.getImageData(this.x +15, this.y + 33 , 1, 1).data;
      if ((imageDataMiner[0] == 255 || imageDataMiner[1] == 255 || imageDataMiner[2] == 255) && imageDataMiner[3] == 255){
	this.direction = this.previousDirection;
	for (var i = 0 ; i < this.job.length ; i++){
	  if (this.job[i] == "miner"){
	      this.job.splice(i,1);
	      i--;
	  }
	}
      }
      else{
	if (this.frame % 12 == 0){
	  this.y += 1;
	  this.x += this.direction ? -2 : 2;
	}
	ctx.drawImage(pingusImages.miner,(64) + 32 * ((this.frame) % 6) , this.direction ? 0 : 32 , 32, 32, this.x, this.y + 1, 32, 32);
	holes.push(new Element(this.x + 33, this.y + 33));
      }
    }
    else if (digging){
      if (imageData[8] + imageData[9] + imageData[10] == 0){
	digging = false;
	this.direction = -1;
	for (var i = 0 ; i < this.job.length ; i++){
	  if (this.job[i] == "digger"){
	      this.job.splice(i,1);
	      i--;
	  }
	}
      }
      else{
	this.y += 1;
	ctx.drawImage(pingusImages.digger,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
	holes.push(new Element(this.x, this.y + 33));
      }
    }
    //are we falling?
    if (this.direction == -1 && !this.blocking && !this.drown && !this.bridger && !this.exiting && !this.bomber && !this.miner ){
      //we check if we hit the floor
      if (this.y < canvas.height - 69 && imageData[0] + imageData[1] + imageData[2] > 600){
	//Pingu hits the floor and continues its walk
	var canFloat = false;
	for (var j = 0 ; j < this.job.length ; j++){
	  if (this.job[j] == "floater"){
	    canFloat = true; 
	  }
	}
	if (this.speed > 2.8 && !canFloat)
	  this.state = -1;
	this.direction = this.previousDirection;
	this.y += 1;
      }
      else{
	// Coordinates update
	this.y += 0.0 + this.speed;
	this.speed+=0.02;
	if (this.y > canvas.height - 53)
	  this.drown = true;
      }
    }
    //we check if the floor is still under
    else if ((imageData[0] + imageData[1] + imageData[2] < 600) && !this.bridger && !this.miner){
      this.previousDirection = this.direction;  
      this.direction = -1;
    }
    //going to the right
    else if (this.direction == 0 && !digging && !this.drown && !this.blocking && !this.bridger && !this.miner){
      this.x += 2;
      this.speed=0;
      if (this.x > canvas.width-32){
	this.direction = 1;
      }
    }
    //to the left
    else if (!digging && !this.drown && !this.blocking && !this.bridger && !this.miner){
      this.x -= 2;
      this.speed = 0;
      if (this.x < 0)
	this.direction=0;
    }

    //=======================================================
    //Animations and coords update
    //=======================================================
    if (this.bridger){
      ctx.drawImage(pingusImages.bridger,(64) + 32 * ((this.frame) % 6) , !this.direction ? 32 : 0 , 32, 32, this.x, this.y + 1, 32, 32);
      if (f % 6 == 0 && this.frame % 6 == 0){
	this.x += this.direction ? -10 : 10;
	this.y -= 2;
      }
    }
    else if (this.bomber){
	ctx.drawImage(pingusImages.bomber, (64) + 32 * ((this.frame) % 12), 0 , 32, 32, this.x, this.y + 1, 32, 32);
    }
    else if (this.exiting){
      if (this.direction)
	ctx.drawImage(pingusImages.exit,(64) + 32 * ((this.frame) % 4) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
      else
	ctx.drawImage(pingusImages.exit,(64) + 32 * ((this.frame) % 4) , 32 , 32, 32, this.x, this.y + 1, 32, 32);
    }
    else if (this.blocking){
      ctx.drawImage(pingusImages.blocker,(64) + 32 * ((this.frame) % 4) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
    }
    else if (this.state != -1 && !digging && !this.drown && !this.miner){
      if (this.direction >= 0){
	for (var i = 0; i < pingus.length ; i++){
	  var pingu = pingus[i];
	  var mirror = this.direction ? 0 : 0;
	  if (pingu.blocking == true && 
		  this.x + mirror > pingu.x && this.x + mirror < pingu.x + 32 
		  && this.y + mirror > pingu.y && this.y < pingu.y  + 31){
	      this.direction = this.direction ? 0 : 1;
	  }
	}
	var imgData = ctx.getImageData(this.x + (this.direction ? 32 : -2), this.y + 30, 2,2);
	if (imgData.data[0] == 2 && imgData.data[1] == 1 && imgData.data[2] == 2)
	  this.y -= 2;
	ctx.putImageData(imgData,0,0);
      }
      //Ok so we're walking or falling
      switch (this.direction){
	// Rendering...
	case 1: //right direction
	  ctx.drawImage(pingusImages.walker,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
	break;
	case 0: //left direction
	  ctx.drawImage(pingusImages.walker,(64) + 32 * ((this.frame) % 6) , 32, 32, 32, this.x, this.y + 1, 32, 32);
	break;
	default: //falling ( = -1 )
	  var floating = false;
	  if (this.speed > 2){
	    for (var i = 0 ; i < this.job.length ; i++){
	      if (this.job[i] == "floater"){
		floating = true;
		//Floating
		ctx.drawImage(pingusImages.floater,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
		break;
	      }
	    }
	  }
	  //falling
	  if (!floating){
	    ctx.drawImage(pingusImages.faller,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);
	  }
	break;
      }
    }
    //splat
    else if (!digging && !this.drown && !this.miner){
      ctx.drawImage(pingusImages.splat,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);	
    }
    //gloups
    else if (!digging && this.drown && !this.miner){
      ctx.drawImage(pingusImages.drownfall,(64) + 32 * ((this.frame) % 6) , 0 , 32, 32, this.x, this.y + 1, 32, 32);	
      this.y += 0.3;
      this.countFrame+=1;
      if (this.countFrame > 15)
      {
	  this.state = -2;
      }
    }
    if ( f % 7 == 0 )
      this.frame+=1; //animation	
  }
}