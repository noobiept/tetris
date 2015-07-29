(function(window)
{
function Square( pieceObject, color )
{
    // width/height
var size = Square.size;
var shape = new createjs.Shape();

var g = shape.graphics;

g.beginFill( color );
g.drawRoundRect( 0, 0, size, size, 2 );

this.isInStack = false;
this.shape = shape;
this.column = -1;
this.line = -1;
this.pieceObject = pieceObject;
}


Square.prototype.getX = function()
{
return this.shape.x;
};


Square.prototype.getY = function()
{
return this.shape.y;
};


Square.prototype.moveLeft = function()
{
this.shape.x -= Square.size;
};


Square.prototype.moveRight = function()
{
this.shape.x += Square.size;
};


Square.prototype.moveBottom = function()
{
this.shape.y += Square.size;
};


Square.size = 20;

window.Square = Square;
}(window));