/*global Square, Game, STAGE, createjs*/

(function(window)
{
/**
 * Create the grid where the game will be played.
 * Also add a border around the playable area, and have some margin around it.
 */
function Grid( numberOfColumns, numberOfLines )
{
this.margin = 20;
this.border_thickness = 5;
this.numberOfColumns = numberOfColumns;
this.numberOfLines = numberOfLines;

    // the playable area
this.inner_width = numberOfColumns * Square.size;
this.inner_height = numberOfLines * Square.size;

    // margin + border
this.separation_length = this.margin + this.border_thickness;

    // full width/height (margin + border + inner area + border + margin)
this.width = 2 * this.separation_length + this.inner_width;
this.height = 2 * this.separation_length + this.inner_height;


    // tells which squares of the grid are occupied
this.grid_array = [];

for (var i = 0 ; i < numberOfColumns ; i++)
    {
    this.grid_array[ i ] = [];

    for (var k = 0 ; k < numberOfLines ; k++)
        {
        this.grid_array[ i ][ k ] = null;
        }
    }

this.container = this.draw();
}


/**
 * Draw the grid lines.
 */
Grid.prototype.draw = function()
{
var margin = this.margin;
var thickness = this.border_thickness;
var separation = this.separation_length;
var innerWidth = this.inner_width;
var innerHeight = this.inner_height;

    // top line
var top = new createjs.Shape();

top.x = separation;
top.y = separation;

var g = top.graphics;

g.beginFill( 'white' );
g.drawRect( 0, -thickness, innerWidth, thickness );

STAGE.addChild( top );


    // bottom line
var bottom = new createjs.Shape();

bottom.x = separation;
bottom.y = separation + innerHeight;

g = bottom.graphics;

g.beginFill( 'white' );
g.drawRect( 0, 0, innerWidth, thickness );

STAGE.addChild( bottom );

    // left line
var left = new createjs.Shape();

left.x = margin;
left.y = margin;

g = left.graphics;

g.beginFill( 'white' );
g.drawRect( 0, 0, thickness, innerHeight + 2 * thickness );

STAGE.addChild( left );

    // right line
var right = new createjs.Shape();

right.x = this.separation_length + innerWidth;
right.y = margin;

g = right.graphics;

g.beginFill( 'white' );
g.drawRect( 0, 0, thickness, innerHeight + 2 * thickness );

STAGE.addChild( right );


    // container
var container = new createjs.Container();

container.x = 0;
container.y = 0;

STAGE.addChild( container );


return container;
};


/**
 * Add a square to the grid, given it column/line position.
 */
Grid.prototype.addSquare = function( square, column, line )
{
this.grid_array[ column ][ line ] = square;

square.column = column;
square.line = line;

square.shape.x = this.separation_length + column * Square.size;
square.shape.y = this.separation_length + line * Square.size;
};


/**
 * Remove a piece from the grid.
 */
Grid.prototype.clearPiece = function( pieceObject )
{
var all = pieceObject.all_squares;
var square;

for (var i = 0 ; i < all.length ; i++)
    {
    square = all[ i ];

    this.grid_array[ square.column ][ square.line ] = null;
    }
};


/**
 * Add a piece to the grid.
 */
Grid.prototype.addPiece = function( pieceObject, column, line )
{
var other = pieceObject.other_squares;
var pivot = pieceObject.pivot_square;
var currentRotation = pieceObject.getCurrentRotation();

this.addSquare( pivot, column, line );


for (var a = 0 ; a < currentRotation.length ; a++)
    {
    var rotation = currentRotation[ a ];
    var square = other[ a ];
    var squareColumn = column + rotation.column;
    var squareLine = line + rotation.line;

    this.addSquare( square, squareColumn, squareLine );
    }
};


/**
 * Move a piece to a different position.
 * Moves 'columnMove/lineMove' from the current position.
 */
Grid.prototype.movePiece = function( piece, columnMove, lineMove )
{
var all = piece.all_squares;
var pivot = piece.pivot_square;

    // check if we can move the piece
for (var a = 0 ; a < all.length ; a++)
    {
    var square = all[ a ];
    var nextColumn = square.column + columnMove;
    var nextLine = square.line + lineMove;

        // check if we're not at the grid's limits
    if ( nextColumn < 0 || nextColumn >= this.numberOfColumns ||
         nextLine   < 0 || nextLine   >= this.numberOfLines )
        {
        return false;
        }

        // check if it doesn't collide with the stacked squares
    var nextSquare = this.grid_array[ nextColumn ][ nextLine ];

    if ( nextSquare && nextSquare.pieceObject !== piece )
        {
        return false;
        }
    }


    // clear the previous position
this.clearPiece( piece );
this.addPiece( piece, pivot.column + columnMove, pivot.line + lineMove );

return true;
};


/**
 * Rotate a piece to the next rotation.
 */
Grid.prototype.rotatePiece = function( piece, nextRotationPosition )
{
var nextRotation = piece.possible_rotations[ nextRotationPosition ];
var pivot = piece.pivot_square;

    // check if you can rotate the piece
for (var a = 0 ; a < nextRotation.length ; a++)
    {
    var position = nextRotation[ a ];
    var column = pivot.column + position.column;
    var line = pivot.line + position.line;

        // check if its within the grid's limits
    if ( column < 0 || column >= this.numberOfColumns ||
         line   < 0 || line   >= this.numberOfLines )
        {
        return false;
        }

    var square = this.grid_array[ column ][ line ];

    if ( square && square.pieceObject !== piece )
        {
        return false;
        }
    }


this.clearPiece( piece );
piece.current_rotation = nextRotationPosition;
this.addPiece( piece, pivot.column, pivot.line );

return true;
};


/**
 * Check for any completed line.
 */
Grid.prototype.checkClearedLines = function()
{
var line, column;
var square;


    // go through all the lines, starting from the bottom
for (line = this.numberOfLines - 1 ; line >= 0 ; line--)
    {
        // and through all the columns
    for (column = 0 ; column < this.numberOfColumns ; column++)
        {
        square = this.grid_array[ column ][ line ];

            // check if there's a square in each column position
        if ( !square )
            {
            break;
            }
        }

        // means the loop passed through all the columns (so, the line contains all the squares filled)
    if (column == this.numberOfColumns)
        {
        this.clearLine( line );

            // since we're removing one line (and everything above goes one line below), we need to check the same line again
        line += 1;
        }
    }
};


/**
 * There's a line completed with squares in all positions.
 * We remove that line, and move what was on top of it 1 line down.
 */
Grid.prototype.clearLine = function( clearedLine )
{
var square;
var column, line;

for (column = 0 ; column < this.numberOfColumns ; column++)
    {
    square = this.grid_array[ column ][ clearedLine ];

        // we should have a complete line in this point?...
    if ( square )
        {
        this.container.removeChild( square.shape );

        this.grid_array[ column ][ clearedLine ] = null;
        }
    }

    // move the stacked squares 1 square below
for (column = 0 ; column < this.numberOfColumns ; column++)
    {
    for (line = clearedLine - 1 ; line >= 0 ; line--)
        {
        square = this.grid_array[ column ][ line ];

        if ( square && square.isInStack )
            {
            square.shape.y += Square.size;

            this.grid_array[ column ][ line + 1 ] = this.grid_array[ column ][ line ];

            this.grid_array[ column ][ line ] = null;
            }
        }
    }

Game.oneMoreClearedLine();
};


window.Grid = Grid;
}(window));
