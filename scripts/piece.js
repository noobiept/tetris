/*
    Base class for all the pieces
 */

(function(window)
{
/*
    Derived classes need to implement:

        this.color = 'a_color';
        this.possible_rotations = [
                [
                    { x: ..., y: ... },
                    { x: ..., y: ... },
                    { x: ..., y: ... }
                ],

                (...)
            ];

        this.current_position = 0;
 */
function Piece()
{
var color = this.color;

var pivot = new Square( this, this.pivot_color );
var square1 = new Square( this, color );
var square2 = new Square( this, color );
var square3 = new Square( this, color );

this.all_squares = [ square1, square2, square3, pivot ];
this.pivot_square = pivot;
this.other_squares = [ square1, square2, square3 ];
}


/**
 * Add the piece squares to a container (can be the grid container element, or other element if its positioned outside of the grid).
 */
Piece.prototype.addToContainer = function( container )
{
for (var a = 0 ; a < this.all_squares.length ; a++)
    {
    container.addChild( this.all_squares[ a ].shape );
    }
};


/**
 * Position a piece in a given x/y position (unrelated to the grid).
 */
Piece.prototype.positionIn = function( x, y )
{
var pivot = this.pivot_square;
var other = this.other_squares;
var currentRotation = this.getCurrentRotation();

pivot.shape.x = x;
pivot.shape.y = y;

for (var a = 0 ; a < currentRotation.length ; a++)
    {
    var rotation = currentRotation[ a ];
    var square = other[ a ];

    square.shape.x = x + rotation.column * Square.size;
    square.shape.y = y + rotation.line * Square.size;
    }
};


Piece.prototype.getCurrentRotation = function()
{
return this.possible_rotations[ this.current_rotation ];
};


Piece.prototype.rotate = function()
{
var grid = this.grid_object;
var rotation = this.possible_rotations[ this.current_rotation ];

var pivot = this.pivot_square;
var others = this.other_squares;

var square;
var nextSquare;
var position;
var i;


    // check if you can rotate the piece
for (i = 0 ; i < others.length ; i++)
    {
    square = others[ i ];

    position = rotation[ i ];

    var nextColumn = pivot.column + position.column;
    var nextLine = pivot.line + position.line;


        // check if its within the grid's limits
    if ( nextColumn < 0 || nextColumn >= grid.numberOfColumns || nextLine >= grid.numberOfLines )
        {
        return false;
        }

    nextSquare = grid.grid_array[ nextColumn ][ nextLine ];

        // check if its not taken that spot
    if ( nextSquare && nextSquare.isInStack )
        {
        return false;
        }
    }


    // apply the rotation (change the squares position)
this.setPosition( pivot.column, pivot.line );

return true;
};


Piece.prototype.rotateLeft = function()
{
var tempCurrentRotation = this.current_rotation;

this.current_rotation--;

if ( this.current_rotation < 0 )
    {
    this.current_rotation = 3;
    }

    // if rotating wasn't possible, we stay in the current rotation
if ( !this.rotate() )
    {
    this.current_rotation = tempCurrentRotation;
    }
};



Piece.prototype.rotateRight = function()
{
var tempCurrentRotation = this.current_rotation;

this.current_rotation++;

if ( this.current_rotation > 3 )
    {
    this.current_rotation = 0;
    }

    // if rotating wasn't possible, we stay in the current rotation
if ( !this.rotate() )
    {
    this.current_rotation = tempCurrentRotation;
    }
};


/*
    Increases the speed that the pieces falls down
 */
Piece.prototype.softDrop = function()
{
Game.setFallDownSpeed( 5 );
};


/*
    Back to normal speed
 */
Piece.prototype.stopSoftDrop = function()
{
Game.setFallDownSpeed( 1 );
};


Piece.prototype.hardDrop = function()
{
    // move the piece bottom continuously until it can't move anymore
while ( GRID.movePiece( this, 0, 1 ) )
    {
        // empty
    }
};


Piece.prototype.remove = function()
{
var parent = this.pivot_square.shape.parent;
var all = this.all_squares;

    // check if it is currently part of the canvas/stage
if ( parent )
    {
    for (var a = 0 ; a < all.length ; a++)
        {
        parent.removeChild( all[ a ].shape );
        }
    }

this.all_squares.length = 0;
this.pivot_square = null;
this.other_squares.length = 0;
};


window.Piece = Piece;
}(window));