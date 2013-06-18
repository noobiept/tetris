
/*
    - Each piece/element has 4 square blocks
    - a random sequence of pieces falls down
    - we can rotate it (90 degrees each time, both ways)
    - need to create a horizontal line to clear the line
    - when a certain number of lines is cleared, we change the level of the game, which increases the speed of the falling pieces
    - game ends when a piece reaches the top


    Movement:

        = left arrow  : move left
        - right arrow : move right
        - down arrow  : soft drop
        - space       : hard drop
        - a           : rotate left
        - d           : rotate right



    reference:

        - http://en.wikipedia.org/wiki/Tetris


    to doo:

        - adjust the canvas width/height according to the grid's dimensions (to fit)
        - clear a line when its formed an horizontal line
 */




    // createjs
var STAGE;

    // other stuff
var CANVAS;


    // current active piece on the map (falling)
var ACTIVE_PIECE = null;


var GRID;


// keys being pressed/held
var KEYS_HELD = {
    leftArrow  : false,     // move left
    rightArrow : false      // move right
    };



window.onload = function()
{
var canvasWidth = 800;
var canvasHeight = 650;

CANVAS = document.querySelector( '#mainCanvas' );

CANVAS.width = canvasWidth;
CANVAS.height = canvasHeight;

centerCanvas();

STAGE = new createjs.Stage( CANVAS );

createjs.Ticker.setInterval( 50 );
createjs.Ticker.addListener( tick );

startGame();
};



window.onkeydown = function( event )
{
if ( !event )
    {
    event = window.event;
    }


switch( event.keyCode )
    {
    case EVENT_KEY.leftArrow:

        KEYS_HELD.leftArrow = true;
        return false;

    case EVENT_KEY.rightArrow:

        KEYS_HELD.rightArrow = true;
        return false;

    case EVENT_KEY.downArrow:

        ACTIVE_PIECE.softDrop();
        return false;
    }

return true;
};


window.onkeyup = function( event )
{
if ( !event )
    {
    event = window.event;
    }


switch( event.keyCode )
    {
    case EVENT_KEY.leftArrow:

        KEYS_HELD.leftArrow = false;
        return false;

    case EVENT_KEY.rightArrow:

        KEYS_HELD.rightArrow = false;
        return false;

    case EVENT_KEY.downArrow:

        ACTIVE_PIECE.stopSoftDrop();
        return false;

    case EVENT_KEY.space:

        ACTIVE_PIECE.hardDrop();
        return false;

    case EVENT_KEY.a:

        ACTIVE_PIECE.rotateLeft();
        return false;

    case EVENT_KEY.d:

        ACTIVE_PIECE.rotateRight();
        return false;
    }

return true;
};





function startGame()
{
clearCanvas();

var startingX = 50;
var startingY = 10;

GRID = new Grid( startingX, startingY, 20, 30 );

newPiece();
}


function clearCanvas()
{
STAGE.removeAllChildren();
}



function newPiece()
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
    }

//var possiblePieces = [ IPiece, SPiece, TPiece ];
//
//var choose = getRandomInt( 0, possiblePieces.length - 1 );
//
//var piece = new possiblePieces[ choose ]( GRID );

var type = IPiece;

var rotation = type.POSSIBLE_ROTATIONS[ 0 ];


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
        startGame();
        return;
        }
    }


ACTIVE_PIECE = new IPiece( GRID, pivotColumn, pivotLine );

    // reset the counter that deals with the movement of the active piece (since we added a new one)
DELAY_COUNT = 0;
}




/*
    center the canvas in the middle of window
 */

function centerCanvas()
{
var left = $( window ).width() / 2 - CANVAS.width / 2;
var top = $( window ).height() / 2 - CANVAS.height / 2;

$( CANVAS ).css( 'left', left + 'px' );
$( CANVAS ).css( 'top', top + 'px' );
}


function pause()
{
createjs.Ticker.setPaused( true );
}


function resume()
{
createjs.Ticker.setPaused( false );
}



var DELAY = 10;
var DELAY_COUNT = 0;
var DELAY_STEP = 1;


function tick()
{
DELAY_COUNT += DELAY_STEP;


movement_tick();



if ( DELAY_COUNT >= DELAY )
    {
    DELAY_COUNT = 0;

    ACTIVE_PIECE.moveBottom();
    }

STAGE.update();
}





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