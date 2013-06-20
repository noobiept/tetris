(function(window)
{
function Game()
{

}

    // number of ticks until the active piece moves down 1 position
var DELAY = 10;
var DELAY_COUNT = 0;

    // how much the counter increases per tick
var DELAY_STEP = 1;



Game.start = function()
{
clearCanvas();

var startingX = 50;
var startingY = 10;

GRID = new Grid( startingX, startingY, OPTIONS.numberOfColumns, OPTIONS.numberOfLines );

Game.newPiece();

createjs.Ticker.addListener( Game.tick );
};




Game.newPiece = function()
{
var i;
var square;

if ( ACTIVE_PIECE )
    {
        // the previous active piece now is part of the stack
    for (i = 0 ; i < ACTIVE_PIECE.all_squares.length ; i++)
        {
        square = ACTIVE_PIECE.all_squares[ i ];

        square.isInStack = true;
        }


        // check if any line is cleared (since we're adding a new piece, means the previous one is part of the stack, so the right moment to clear the lines)
    GRID.checkClearedLines();
    }

var possiblePieces = [ IPiece, SPiece, TPiece, ZPiece, OPiece, JPiece, LPiece ];

var choose = getRandomInt( 0, possiblePieces.length - 1 );

var chosenPiece = possiblePieces[ choose ];


var rotation = chosenPiece.POSSIBLE_ROTATIONS[ 0 ];


        // center the element in the grid
var pivotColumn = parseInt( GRID.numberOfColumns / 2, 10 );
var pivotLine = 0;
var gridSquare;
var column, line;

    // check if the piece will collide with an existing square in the stack (if so, its game over, the stack has reached the top)
for (i = 0 ; i < rotation.length ; i++)
    {
    column = pivotColumn + rotation[ i ].column;
    line = pivotLine + rotation[ i ].line;

    gridSquare = GRID.grid_array[ column ][ line ];

    if ( gridSquare )
        {
        Game.start();
        return;
        }
    }


ACTIVE_PIECE = new chosenPiece( GRID, pivotColumn, pivotLine );

    // reset the counter that deals with the movement of the active piece (since we added a new one)
DELAY_COUNT = 0;
};



Game.setFallDownSpeed = function( step )    //HERE improve this
{
DELAY_STEP = step;
};



Game.tick = function()
{
DELAY_COUNT += DELAY_STEP;

movement_tick();


if ( DELAY_COUNT >= DELAY )
    {
    DELAY_COUNT = 0;

    ACTIVE_PIECE.moveBottom();
    }

STAGE.update();
};



function movement_tick()
{
if ( KEYS_HELD.leftArrow )
    {
    ACTIVE_PIECE.moveLeft();
    }

else if ( KEYS_HELD.rightArrow )
    {
    ACTIVE_PIECE.moveRight();
    }
}


window.Game = Game;

}(window));