
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


    Dependencies:

        - jquery : 2.0
        - jqueryui : 1.10

            - slider
            - blitzer theme

        - easeljs : 0.6

    to doo:

        - you can rotate when a piece is added, and it overlaps the top of the grid (doesnt affect the game though)
 */


    // createjs
var STAGE;

    // other stuff
var CANVAS;

var GRID;


// keys being pressed/held
var KEYS_HELD = {
    leftArrow  : false,     // move left
    rightArrow : false      // move right
    };




window.onload = function()
{
Options.load();

CANVAS = document.querySelector( '#mainCanvas' );

STAGE = new createjs.Stage( CANVAS );

createjs.Ticker.setInterval( 50 );


MainMenu.init();
MainMenu.open();
};


window.onunload = function()
{
Options.save();
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

        Game.getActivePiece().softDrop();
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


var activePiece = Game.getActivePiece();

switch( event.keyCode )
    {
    case EVENT_KEY.leftArrow:

        KEYS_HELD.leftArrow = false;
        return false;

    case EVENT_KEY.rightArrow:

        KEYS_HELD.rightArrow = false;
        return false;

    case EVENT_KEY.downArrow:

        activePiece.stopSoftDrop();
        return false;

    case EVENT_KEY.space:

        activePiece.hardDrop();
        return false;

    case EVENT_KEY.a:

        activePiece.rotateLeft();
        return false;

    case EVENT_KEY.d:

        activePiece.rotateRight();
        return false;
    }

return true;
};



function clearCanvas()
{
MainMenu.clear();

createjs.Ticker.removeAllEventListeners( 'tick' );
STAGE.removeAllChildren();
STAGE.update();
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


