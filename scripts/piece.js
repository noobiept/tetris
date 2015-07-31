(function(window)
{
/**
 * Base class for all the pieces.
 *
 * Derived classes need to implement:
 *
 *     this.color = 'a_color';
 *     this.pivot_color = 'a_color';
 *     this.possible_rotations = [
 *             [
 *                 { column: ..., line: ... },
 *                 { column: ..., line: ... },
 *                 { column: ..., line: ... }
 *             ],
 *             // (...)
 *         ];
 *     this.current_rotation = 0;
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


/**
 * Get the current rotation of this piece (where the squares are positioned around the pivot).
 */
Piece.prototype.getCurrentRotation = function()
{
return this.possible_rotations[ this.current_rotation ];
};


/**
 * Rotate this piece to the left (anti-clockwise).
 */
Piece.prototype.rotateLeft = function()
{
var nextPosition = this.current_rotation - 1;

if ( nextPosition < 0 )
    {
    nextPosition = this.possible_rotations.length - 1;
    }


var rotated = Game.getGrid().rotatePiece( this, nextPosition );

if ( rotated === false )
    {
    Game.showMessage( "Couldn't rotate left!" );
    }

else
    {
    Game.clearMessage();
    }
};


/**
 * Rotate this piece to the right (clockwise).
 */
Piece.prototype.rotateRight = function()
{
var nextPosition = this.current_rotation + 1;

if ( nextPosition >= this.possible_rotations.length )
    {
    nextPosition = 0;
    }

var rotated = Game.getGrid().rotatePiece( this, nextPosition );

if ( rotated === false )
    {
    Game.showMessage( "Couldn't rotate right!" );
    }

else
    {
    Game.clearMessage();
    }
};


/**
 * Move this piece downward continuously until it reaches either the stack, or the bottom of the grid.
 */
Piece.prototype.hardDrop = function()
{
var grid = Game.getGrid();

    // move the piece bottom continuously until it can't move anymore
while ( grid.movePiece( this, 0, 1 ) )
    {
        // empty
    }
};


/**
 * Remove this piece from the game.
 */
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