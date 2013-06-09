
/*
    - Each piece/element has 4 square blocks
    - a random sequence of pieces falls down
    - we can rotate it (90 degrees each time, both ways)
    - need to create a horizontal line to clear the line
    - when a certain number of lines is cleared, we change the level of the game, which increases the speed of the falling pieces
    - game ends when a piece reaches the top


    reference:

        - http://en.wikipedia.org/wiki/Tetris
 */




    // createjs
var STAGE;

    // other stuff
var CANVAS;

var ALL_PIECES = [];


    // current active piece on the map (falling)
var ACTIVE_PIECE;


// keys being pressed/held
var KEYS_HELD = {
    leftArrow  : false,     // move left
    rightArrow : false,     // move right
    downArrow  : false,     // soft drop
    space      : false,     // hard drop
    a          : false,     // rotate left
    d          : false      // rotate right
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

    case EVENT_KEY.downArrow:

        KEYS_HELD.downArrow = true;
        return false;

    case EVENT_KEY.space:

        KEYS_HELD.space = true;
        return false;

    case EVENT_KEY.a:

        KEYS_HELD.a = true;
        return false;

    case EVENT_KEY.d:

        KEYS_HELD.d = true;
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

        KEYS_HELD.downArrow = false;
        return false;

    case EVENT_KEY.space:

        KEYS_HELD.space = false;
        return false;

    case EVENT_KEY.a:

        KEYS_HELD.a = false;
        return false;

    case EVENT_KEY.d:

        KEYS_HELD.d = false;
        return false;
    }

return true;
};





function startGame()
{
var piece = new IPiece( 100, 100 );

ACTIVE_PIECE = piece;

ALL_PIECES.push( piece );
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

if ( DELAY_COUNT >= DELAY )
    {
    DELAY_COUNT = 0;

    for ( var i = 0 ; i < ALL_PIECES.length ; i++ )
        {
            // each piece falls its size each time
        ALL_PIECES[ i ].shape.y += Square.size;
        }
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

else if ( KEYS_HELD.downArrow )
    {

    }

else if ( KEYS_HELD.space )
    {

    }

else if ( KEYS_HELD.a )
    {

    }

else if ( KEYS_HELD.d )
    {

    }
}