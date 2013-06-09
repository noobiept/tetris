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



Piece.prototype.rotateLeft = function()
{
    // in derived class
};


Piece.prototype.rotateRight = function()
{
    // in derived class
};


Piece.prototype.softDrop = function()
{

};


Piece.prototype.hardDrop = function()
{

};



window.Piece = Piece;

}(window));