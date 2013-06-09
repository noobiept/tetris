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


Square.size = 10;

window.Square = Square;

}(window));