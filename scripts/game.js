(function(window)
{
function Game()
{

}

    // number of ticks until the active piece moves down 1 position
var DELAY_START = 10;
var DELAY_LIMIT = DELAY_START;
var DELAY_COUNT = 0;

    // how much the counter increases per tick
var DELAY_STEP = 1;

    // the max level is the same as delay_start, since we're reducing the delay count as the level is increase, so eventually you get to a point where you can't reduce the delay anymore (its == 1), so that's the max level, with the fastest speed
var MAX_LEVEL = DELAY_START;
var CURRENT_LEVEL = 1;

    // number of cleared lines so far (count)
var CLEARED_LINES = 0;


var GAME_MENU_WIDTH;    // in pixels
var MESSAGE_COUNT;      // reference to the message's count html element
var MESSAGE_TEXT;       // reference to the message's text html element


    // current active piece on the map (falling)
var ACTIVE_PIECE = null;

    // has the next piece class (so, 'IPiece' or 'TPiece', etc)
var NEXT_PIECE_CLASS = null;
var NEXT_PIECE = null;  // has the next piece object


Game.start = function()
{
clearCanvas();

var numberOfColumns = Options.getNumberOfColumns();
var numberOfLines = Options.getNumberOfLines();

Game.setLevel( Options.getStartingLevel() );

CLEARED_LINES = 0;

GRID = new Grid( numberOfColumns, numberOfLines );

GAME_MENU_WIDTH = $( '#GameMenu' ).width();
MESSAGE_COUNT = document.getElementById( 'MessageCount' );
MESSAGE_TEXT = document.getElementById( 'MessageText' );

    // resize the canvas, according to the grid's dimension
CANVAS.width = GRID.width + GAME_MENU_WIDTH;
CANVAS.height = GRID.height;

NEXT_PIECE_CLASS = Game.chooseRandomPiece();

Game.newPiece();
Game.initGameMenu();

createjs.Ticker.addEventListener( 'tick', Game.tick );
};


Game.newPiece = function()
{
Game.clearMessage();
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


    // the next piece is the one determined before
var chosenPiece = NEXT_PIECE_CLASS;

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
        Game.end();
        return;
        }
    }


    // we randomly get a new piece, for next time
NEXT_PIECE_CLASS = Game.chooseRandomPiece();

    // and show it in the game menu
Game.showNextPiece( NEXT_PIECE_CLASS );


ACTIVE_PIECE = new chosenPiece();
ACTIVE_PIECE.addToContainer( GRID.container );
GRID.addPiece( ACTIVE_PIECE, pivotColumn, pivotLine );



    // reset the counter that deals with the movement of the active piece (since we added a new one)
DELAY_COUNT = 0;
};


Game.chooseRandomPiece = function()
{
var possiblePieces = [ IPiece, SPiece, TPiece, ZPiece, OPiece, JPiece, LPiece ];

var choose = getRandomInt( 0, possiblePieces.length - 1 );

return possiblePieces[ choose ];
};


/**
 * Initialize the game menu elements.
 */
Game.initGameMenu = function()
{
var gameMenu = document.querySelector( '#GameMenu' );

    // :: Current Level :: //

var currentLevel = gameMenu.querySelector( '#GameMenu-currentLevel span' );

if ( CURRENT_LEVEL >= MAX_LEVEL )
    {
    $( currentLevel ).text( 'max' );
    }

else
    {
    $( currentLevel ).text( CURRENT_LEVEL );
    }

    // :: Cleared Lines :: //

var clearedLines = gameMenu.querySelector( '#GameMenu-clearedLines span' );

$( clearedLines ).text( '0' );


    // :: Pause / Resume :: //

var pauseResume = gameMenu.querySelector( '#GameMenu-pauseResume' );

pauseResume.addEventListener( 'click', Game.togglePaused );


    // :: Quit :: //

var quit = gameMenu.querySelector( '#GameMenu-quit' );

quit.onclick = function()
    {
    Game.clear();
    MainMenu.open();
    };


    // :: Game Menu :: //

    // show the menu
$( gameMenu ).removeClass( 'hide' );

    // need to set the height of the menu to the same height of the canvas, so that it is position correctly
$( gameMenu ).css( 'height', CANVAS.height + 'px' );
};


/*
    Shows an image of the next piece to fall, in the game menu
 */

Game.showNextPiece = function( nextPieceClass )
{
if ( NEXT_PIECE )
    {
    NEXT_PIECE.remove();
    NEXT_PIECE = null;
    }

var piece = new nextPieceClass();

piece.positionIn( GRID.width + GAME_MENU_WIDTH / 2 - Square.size / 2, 20 );
piece.addToContainer( STAGE );

NEXT_PIECE = piece;
};



Game.clear = function()
{
Game.setPaused( false );

$( '#GameMenu' ).addClass( 'hide' );

createjs.Ticker.removeEventListener( 'tick', Game.tick );
};



Game.setFallDownSpeed = function( step )
{
DELAY_STEP = step;
};


Game.getActivePiece = function()
{
return ACTIVE_PIECE;
};





Game.oneMoreClearedLine = function()
{
CLEARED_LINES++;

$( '#GameMenu-clearedLines span' ).text( CLEARED_LINES );


    // move up one level, once the number of cleared lines is reached
if ( (CLEARED_LINES % Options.getLinesToLevelUp()) == 0 )
    {
    Game.setLevel( CURRENT_LEVEL + 1 );
    }
};



Game.setLevel = function( level )
{
if ( level >= MAX_LEVEL )
    {
    CURRENT_LEVEL = MAX_LEVEL;

    DELAY_LIMIT = 1;

    $( '#GameMenu-currentLevel span' ).text( 'max' );
    }

else
    {
    CURRENT_LEVEL = level;

    DELAY_LIMIT = DELAY_START - level + 1;

    $( '#GameMenu-currentLevel span' ).text( CURRENT_LEVEL );
    }
};


Game.getMaxLevel = function()
{
return MAX_LEVEL;
};


/**
 * Show a message in the game menu.
 * When the same message is trying to be shown, it will show a counter of the times it was tried.
 */
Game.showMessage = function( text )
{
var currentText = $( MESSAGE_TEXT ).text();

    // same message, add to the counter
if ( text === currentText )
    {
    var count = Number( MESSAGE_COUNT.getAttribute( 'data-count' ) ) + 1;

    MESSAGE_COUNT.setAttribute( 'data-count', count.toString() );
    $( MESSAGE_COUNT ).text( count + 'x' );
    }

else
    {
    MESSAGE_COUNT.setAttribute( 'data-count', '0' );
    $( MESSAGE_COUNT ).text( '' );
    $( MESSAGE_TEXT ).text( text );
    }
};


/**
 * Game has ended. Show a message and then restart the game.
 */
Game.end = function()
{
window.alert( 'Game Over!' );

Game.start();
};


/**
 * Clear the current message.
 */
Game.clearMessage = function()
{
MESSAGE_COUNT.setAttribute( 'data-count', '0' );
MESSAGE_COUNT.innerHTML = '';
MESSAGE_TEXT.innerHTML = '';
};


/**
 * Toggle between the pause/resume state.
 */
Game.togglePaused = function()
{
Game.setPaused( !Game.isPaused() );
};


/**
 * Pause/resume the game.
 */
Game.setPaused = function( state )
{
createjs.Ticker.paused = state;

KEYS_HELD.leftArrow = false;
KEYS_HELD.rightArrow = false;

if ( ACTIVE_PIECE )
    {
    ACTIVE_PIECE.stopSoftDrop();
    }

if ( state )
    {
    $( '#GameMenu-pauseResume' ).text( 'Resume' );
    }

else
    {
    $( '#GameMenu-pauseResume' ).text( 'Pause' );
    }
};


/**
 * Tells if the game is currently paused or not.
 */
Game.isPaused = function()
{
return createjs.Ticker.paused;
};


Game.tick = function()
{
if ( createjs.Ticker.paused )
    {
    return;
    }

DELAY_COUNT += DELAY_STEP;

movement_tick();


if ( DELAY_COUNT >= DELAY_LIMIT )
    {
    DELAY_COUNT = 0;

        // move bottom
    var successful = GRID.movePiece( ACTIVE_PIECE, 0, 1 );

    if ( !successful )
        {
        Game.newPiece();
        }
    }

STAGE.update();
};


function movement_tick()
{
if ( KEYS_HELD.leftArrow )
    {
        // move left
    GRID.movePiece( ACTIVE_PIECE, -1, 0 );
    }

else if ( KEYS_HELD.rightArrow )
    {
    GRID.movePiece( ACTIVE_PIECE, 1, 0 );
    }
}


window.Game = Game;
}(window));