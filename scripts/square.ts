/**
 * Represents a square of the grid.
 * A piece will be composed of several squares.
 */
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


/**
 * Get the current x position.
 */
Square.prototype.getX = function()
{
return this.shape.x;
};


/**
 * Get the current y position.
 */
Square.prototype.getY = function()
{
return this.shape.y;
};


/**
 * Move the square to the left position.
 */
Square.prototype.moveLeft = function()
{
this.shape.x -= Square.size;
};


/**
 * Move the square to the right position.
 */
Square.prototype.moveRight = function()
{
this.shape.x += Square.size;
};


/**
 * Move the square to the bottom position.
 */
Square.prototype.moveBottom = function()
{
this.shape.y += Square.size;
};


Square.size = 20;
