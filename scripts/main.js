
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
        - end game when it reaches the top of the grid
        - when rotating the piece, check collision with the bottom of the grid as well (its getting off the grid)
 */




    // createjs
var STAGE;

    // other stuff
var CANVAS;


    // current active piece on the map (falling)
var ACTIVE_PIECE;


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
var startingX = 50;
var startingY = 10;

GRID = new Grid( startingX, startingY, 20, 30 );

newPiece();
}


function newPiece()
{
//var possiblePieces = [ IPiece, SPiece, TPiece ];
//
//var choose = getRandomInt( 0, possiblePieces.length - 1 );
//
//var piece = new possiblePieces[ choose ]( GRID );


var piece = new IPiece( GRID );

ACTIVE_PIECE = piece;


    // reset the counter that deals with the movement of the active piece (since we added a new one)
DELAY_COUNT = 0;

    // check if piece collides with stack (if so, its game over, since its colliding as a new piece spawns)
//HERE
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