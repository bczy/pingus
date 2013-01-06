var cursor = {
  x : 0,
  y : 0,
  buttonLeft : 0,
  buttonRight : 0
}

/*** CONTROLS ***/
function initControls(){
/*** MOUSE CURSOR COORDINATES UPDATE***/
  canvas.onmousemove = function(e)
  {
    var mouseX, mouseY;
    cursor.oldX = cursor.x;
    cursor.oldY = cursor.y;
    if(e.offsetX) {
      cursor.x = e.offsetX;
      cursor.y= e.offsetY;
    }
    else if(e.layerX) {
      cursor.x = e.layerX;
      cursor.y = e.layerY;
    }	
  }
  canvas.onmousedown = function(e)
  {
    if (e.button == 0)
      cursor.buttonLeft=1;
    else if (e.button == 1)
      cursor.buttonRight=1;
  }
  canvas.onmouseup = function(e)
  {
    if (e.button == 0)
      cursor.buttonLeft=0;
    else if (e.button == 1)
      cursor.buttonRight=0; 
  }
}