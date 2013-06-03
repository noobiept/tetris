
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


function startGame()
{
ALL_PIECES.push( new IPiece( 100, 100 ) );
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

if ( DELAY_COUNT >= DELAY )
    {
    DELAY_COUNT = 0;

    for ( var i = 0 ; i < ALL_PIECES.length ; i++ )
        {
        ALL_PIECES[ i ].shape.y += 5;
        }

    STAGE.update();
    }
}