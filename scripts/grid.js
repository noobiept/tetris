(function(window)
{
/*
    startingX/Y is in pixels
    squaresWidth/height is in number of squares
 */

function Grid( startingX, startingY, squaresWidth, squaresHeight )
{
this.draw( startingX, startingY, squaresWidth, squaresHeight );

this.stack = new Stack();
}


/*
    Draw the grid lines
 */

Grid.prototype.draw = function( startingX, startingY, squaresWidth, squaresHeight )
{
var width = squaresWidth * Square.size;
var height = squaresHeight * Square.size;

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
this.squaresWidth = squaresWidth;
this.squaresHeight = squaresHeight;
this.width = width;
this.height = height;
this.container = container;
};


/*
    Check if a position of a square is within the grid (only checks the left/right grid limit)
 */

Grid.prototype.isWithin = function( x, y )
{
var leftLimit = this.startingX;
var rightLimit = leftLimit + this.width;

var globalPosition = this.container.localToGlobal( x, y );

x = globalPosition.x;


if ( x < leftLimit || x + Square.size > rightLimit )
    {
    return false;
    }

return true;
};


Grid.prototype.hitBottom = function( x, y )
{
var globalPosition = this.container.localToGlobal( x, y );


if ( globalPosition.y >= this.startingY + this.height )
    {
    return true;
    }

return false;
};


/*
    Checks if a square x/y position collides with a stacked square on the grid
 */

Grid.prototype.collision = function( x, y )
{
var stackSquares = this.stack.all_squares;
var square;

for (var i = 0 ; i < stackSquares.length ; i++)
    {
    square = stackSquares[ i ];

    if ( checkCollision( x, y, square.getX(), square.getY() ) )
        {
        return true;
        }
    }

return false;
};




window.Grid = Grid;

}(window));