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


window.Grid = Grid;

}(window));