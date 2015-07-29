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
createjs.Ticker.removeAllEventListeners( 'tick' );
STAGE.removeAllChildren();
STAGE.update();
}


function pause()
{
createjs.Ticker.setPaused( true );
}


function resume()
{
createjs.Ticker.setPaused( false );
}


