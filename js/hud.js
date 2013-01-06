//=====================	===================================
// Layout Text Object
// == Parameters:
// coordinates (=center), fontSize (=22px), border(=null)
//========================================================
function Layout(width, height, backgroundStyle, border, duration){
  this.border = arguments.length == 4 ? border : { };
  if (border){
    this.border.size = border.size || 2;
    this.border.color = border.color || rgb("0,200,250");
  }
  this.draw = function(){
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.strokeRect(size, coordinates.x || canvas.width / 2 - 50, canvas.height / 2 - 15);
    if (arguments.length === 3){
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 15);
    }
  }
}

//========================================================
// Layout Text Object
// == Parameters:
// coordinates (layout(=null) & fontSize (=22px)
//========================================================
function TextLayout(texts, layout, font){
  //'initiating' object 
  this.fontSize = (font.size || "22px") + (font.fontFamily || " bold 'Mountains of Christmas'");
  this.x = coordinates.x || canvas.width / 2 - font.size * getLongestText(texts);
  this.y = coordinates.y || canvas.height / 2 - font.size * getLongestText(texts);
  this.width = canvas.width || coordinates.x
  this.layout = layout || new Layout();
  
  // Display functions
  this.draw = function(message, size, x, y){
    if (0 === this.font)
      canvas.font = this.font;  
    this.layout.draw(); 
  }
  this.update = function(texts){
    this.texts[texts[0]] = texts[1];
  }
  
  this.displayLayoutBack = function(){
  }
}

//========================================================
// ... Returns longest string of a string array
//========================================================
function getLongestText(arrays) {
 var l = 0;
 for (var i = 0; i < arrays.length; i++) {
  if (arrays[l].length < arrays[i].length) {
   l = arrays;
  }
 }
 return l;
}