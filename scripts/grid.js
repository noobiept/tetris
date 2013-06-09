(function(window)
{
/*
    startingX/Y is in pixels
    squaresWidth/height is in number of squares
 */

function Grid( startingX, startingY, squaresWidth, squaresHeight )
{
this.draw( startingX, startingY, squaresWidth, squaresHeight );
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
};


window.Grid = Grid;

}(window));