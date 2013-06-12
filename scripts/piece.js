/*
    Base class for all the pieces
 */

(function(window)
{
function Piece( gridObject )
{
    // this is set by the derived classes
this.shapes = null;
this.gridObject = gridObject;
}



Piece.prototype.moveLeft = function()
{
var shapes = this.shapes;
var square;
var i;

    // check if not at the limit
for (i = 0 ; i < shapes.length ; i++)
    {
    square = shapes[ i ];

    if ( square.getX() <= 0 )
        {
        return;
        }
    }


    // move 1 square to the left
for (i = 0 ; i < shapes.length ; i++)
    {
    shapes[ i ].moveLeft();
    }
};



Piece.prototype.moveRight = function()
{
var shapes = this.shapes;
var square;
var i;

    // check if not at the limit
for (i = 0 ; i < shapes.length ; i++)
    {
    square = shapes[ i ];

        // its centered at top left
    if ( square.getX() + Square.size >= this.gridObject.width )
        {
        return;
        }
    }


    // move 1 square to the left
for (i = 0 ; i < shapes.length ; i++)
    {
    shapes[ i ].moveRight();
    }
};


Piece.prototype.moveBottom = function()
{
var shapes = this.shapes;

for ( var i = 0 ; i < shapes.length ; i++ )
    {
    shapes[ i ].moveBottom();
    }
};


var TEMP = 1;

Piece.prototype.rotateLeft = function()
{
TEMP *= -1;

    // square3 is the center piece, so rotate the others around that
var center = this.shapes[ 2 ];

var others = [ this.shapes[ 0 ], this.shapes[ 1 ], this.shapes[ 3 ] ];

    // relative to the center
var relativeX;
var relativeY;

var shape;

for (var i = 0 ; i < others.length ; i++)
    {
    shape = others[ i ];

    relativeX = center.getX() - shape.getX();
    relativeY = center.getY() - shape.getY();

    shape.shape.x = relativeY * TEMP + center.getX();
    shape.shape.y = relativeX * TEMP + center.getY();
    }



};

Piece.prototype.rotateRight = function()
{
    // square3 is the center piece, so rotate the others around that
var center = this.shapes[ 2 ];

var others = [ this.shapes[ 0 ], this.shapes[ 1 ], this.shapes[ 3 ] ];

    // relative to the center
var relativeX;
var relativeY;

var shape;

for (var i = 0 ; i < others.length ; i++)
    {
    shape = others[ i ];

    relativeX = center.getX() - shape.getX();
    relativeY = center.getY() - shape.getY();

    shape.shape.x = (relativeY * TEMP + center.getX()) ;
    shape.shape.y = (relativeX * TEMP + center.getY());
    }

TEMP *= -1;
};


Piece.prototype.softDrop = function()
{

};


Piece.prototype.hardDrop = function()
{

};



window.Piece = Piece;

}(window));