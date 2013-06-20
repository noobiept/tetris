(function(window)
{
/*
    startingX/Y is in pixels
 */

function Grid( startingX, startingY, numberOfColumns, numberOfLines )
{
this.draw( startingX, startingY, numberOfColumns, numberOfLines );


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
}


/*
    Draw the grid lines
 */

Grid.prototype.draw = function( startingX, startingY, numberOfColumns, numberOfLines )
{
var width = numberOfColumns * Square.size;
var height = numberOfLines * Square.size;

var thickness = 5;

    // top line
var top = new createjs.Shape();

top.x = startingX;
top.y = startingY;

var g = top.graphics;

g.beginFill( 'white' );
g.drawRect( 0, -thickness, width, thickness );

STAGE.addChild( top );


    // bottom line
var bottom = new createjs.Shape();

bottom.x = startingX;
bottom.y = startingY + height;

g = bottom.graphics;

g.beginFill( 'white' );
g.drawRect( 0, 0, width, thickness );

STAGE.addChild( bottom );

    // left line
var left = new createjs.Shape();

left.x = startingX;
left.y = startingY;

g = left.graphics;

g.beginFill( 'white' );
g.drawRect( -thickness, 0, thickness, height ); // the -thickness in x is to take out the grid's own width out of the grid dimensions

STAGE.addChild( left );

    // right line
var right = new createjs.Shape();

right.x = startingX + width;
right.y = startingY;

g = right.graphics;

g.beginFill( 'white' );
g.drawRect( 0, 0, thickness, height );

STAGE.addChild( right );


    // container

var container = new createjs.Container();

container.x = startingX;
container.y = startingY;

STAGE.addChild( container );


    // object properties
this.startingX = startingX;
this.startingY = startingY;
this.numberOfColumns = numberOfColumns;
this.numberOfLines = numberOfLines;
this.width = width;
this.height = height;
this.container = container;
};


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



Grid.prototype.addPiece = function( pieceObject )
{
var all = pieceObject.all_squares;
var square;

for (var i = 0 ; i < all.length ; i++)
    {
    square = all[ i ];

    this.grid_array[ square.column ][ square.line ] = square;
    }
};


/*
    Check for any completed line
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
};



window.Grid = Grid;

}(window));