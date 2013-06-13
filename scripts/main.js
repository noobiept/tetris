
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

        - have the active piece move only one step when key is pressed, but if key is being pressed after a certain time, then it moves faster (as I have now, the key being held)
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
var canvasHeight = 400;

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

        ACTIVE_PIECE.softDrop();
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
var startingY = 50;

GRID = new Grid( startingX, startingY, 20, 30 );

newPiece();
}


function newPiece()
{
//var piece = new IPiece( GRID );
//var piece = new SPiece( GRID );
var piece = new TPiece( GRID );

ACTIVE_PIECE = piece;
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



var DELAY = 5;
var DELAY_COUNT = 0;


function tick()
{
DELAY_COUNT++;


movement_tick();

GRID.stack.checkCollision();

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