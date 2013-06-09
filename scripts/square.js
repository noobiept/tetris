(function(window)
{
function Square( x, y, color )
{
    // width/height
var size = Square.size;

var shape = new createjs.Shape();

shape.x = x;
shape.y = y;

var g = shape.graphics;

g.beginFill( color );
g.drawRoundRect( 0, 0, size, size, 2 );


this.shape = shape;
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




Square.size = 10;

window.Square = Square;

}(window));