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

function Piece( gridObject, column, line )
{
var container = gridObject.container;


var centerX = parseInt( gridObject.numberOfColumns / 2, 10 ) * Square.size;


var color = this.color;

var pivot = new Square( this, centerX, 0, this.pivot_color );
    
var square1 = new Square( this, centerX, 0, color );  // the positions will be updated later
var square2 = new Square( this, centerX, 0, color );
var square3 = new Square( this, centerX, 0, color );

this.all_squares = [ square1, square2, square3, pivot ];
this.pivot_square = pivot;
this.other_squares = [ square1, square2, square3 ];
this.grid_object = gridObject;


container.addChild( square1.shape );
container.addChild( square2.shape );
container.addChild( square3.shape );
container.addChild( pivot.shape );


this.setPosition( column, line, false );
}


/**
    Positions the piece in the grid

    The position values is in square size (not x/y) and 0-based

    clearPreviousPosition to clear the grid before changing the position, not needed when adding a piece for the first time, but has to be done when moving (default is true)

    @param {number} pivotColumn
    @param {number} pivotLine
    @param {Boolean} [clearPreviousPosition=true]
 */

Piece.prototype.setPosition = function( pivotColumn, pivotLine, clearPreviousPosition )
{
var grid = this.grid_object;

if ( clearPreviousPosition !== false )
    {
        // clear the current position on the grid
    grid.clearPiece( this );
    }

var pivot = this.pivot_square;

this.column = pivotColumn;
this.line = pivotLine;

    // the column/line of the piece is the same as the pivot, so set to both
pivot.column = pivotColumn;
pivot.line = pivotLine;

var pivotX = pivotColumn * Square.size;
var pivotY = pivotLine * Square.size;

pivot.shape.x = pivotX;
pivot.shape.y = pivotY;


var currentRotations = this.possible_rotations[ this.current_rotation ];
var other_squares = this.other_squares;

var other;
var rotation;

for (var i = 0 ; i < currentRotations.length ; i++)
    {
    other = other_squares[ i ];
    rotation = currentRotations[ i ];

    other.shape.x = pivotX + rotation.column * Square.size;
    other.shape.y = pivotY + rotation.line * Square.size;

    other.column = pivotColumn + rotation.column;
    other.line = pivotLine + rotation.line;
    }

this.grid_object.addPiece( this );
};



Piece.prototype.moveLeft = function()
{
var grid = this.grid_object;
var squares = this.all_squares;
var square;
var i;


    // check if we can move the piece
for (i = 0 ; i < squares.length ; i++)
    {
    square = squares[ i ];

        // check if not at the grid's limit
    if ( square.column - 1 < 0 )
        {
        return;
        }

        // check if it doesn't collide with the stacked squares
    var nextSquare = grid.grid_array[ square.column - 1 ][ square.line ];

    if ( nextSquare && nextSquare.pieceObject !== this )
        {
        return;
        }
    }


    // move 1 square to the left
this.setPosition( this.column - 1, this.line );
};



Piece.prototype.moveRight = function()
{
var grid = this.grid_object;
var squares = this.all_squares;
var square;
var i;

    // check if we can move the piece
for (i = 0 ; i < squares.length ; i++)
    {
    square = squares[ i ];

        // check if not at the grid's limit
    if ( square.column + 1 >= grid.numberOfColumns )
        {
        return;
        }


        // check if it doesn't collide with the stacked squares
    var nextSquare = grid.grid_array[ square.column + 1 ][ square.line ];

    if ( nextSquare && nextSquare.pieceObject !== this )
        {
        return;
        }
    }


    // move 1 square to the right
this.setPosition( this.column + 1, this.line );
};



Piece.prototype.moveBottom = function()
{
var squares = this.all_squares;
var grid = this.grid_object;

var square;
var stackSquare;


for (var i = 0 ; i < squares.length ; i++)
    {
    square = squares[ i ];

        // check if reached bottom of the grid
    if ( square.line + 1 >= grid.numberOfLines )
        {
        newPiece();
        return false;
        }

        // check if it has other squares below (and therefore, can't go down anymore)
    stackSquare = grid.grid_array[ square.column ][ square.line + 1 ];

    if ( stackSquare && stackSquare.pieceObject !== this )
        {
        newPiece();
        return false;
        }
    }

    // if everything is ok, move 1 line down
this.setPosition( this.column, this.line + 1 );

return true;
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
DELAY_STEP = 5;
};

/*
    Back to normal speed
 */

Piece.prototype.stopSoftDrop = function()
{
DELAY_STEP = 1;
};


Piece.prototype.hardDrop = function()
{
while ( this.moveBottom() )
    {
        // empty
    }
};



window.Piece = Piece;

}(window));