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


var GAME_MENU_WIDTH = 160;  // in pixels


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

    // resize the canvas, according to the grid's dimension
CANVAS.width = GRID.width + GAME_MENU_WIDTH;
CANVAS.height = GRID.height;

centerCanvas();

NEXT_PIECE_CLASS = Game.chooseRandomPiece();

Game.newPiece();
Game.initGameMenu();

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
        Game.start();
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

var isPaused = false;

pauseResume.onclick = function()
    {
    if ( isPaused )
        {
        isPaused = false;
        $( pauseResume ).text( 'Pause' );

        resume();
        }

    else
        {
        isPaused = true;
        $( pauseResume ).text( 'Resume' );

        pause();
        }
    };


    // :: Quit :: //

var quit = gameMenu.querySelector( '#GameMenu-quit' );

quit.onclick = function()
    {
    if ( isPaused )
        {
        resume();
        }

    Game.clear();

    MainMenu.open();
    };


    // :: Position Game Menu :: //

var canvasPosition = $( CANVAS ).position();

var gameMenuTop = gameMenu.querySelector( '#GameMenu-top' );
var gameMenuBottom = gameMenu.querySelector( '#GameMenu-bottom' );


    // show the menu (has to be before doing the calculations below)
$( gameMenu ).css( 'display', 'block' );

    // set the width of the menus
$( gameMenuTop ).css( 'width', GAME_MENU_WIDTH + 'px' );
$( gameMenuBottom ).css( 'width', GAME_MENU_WIDTH + 'px' );

    // left is same for both menus (top/bottom)
var left = canvasPosition.left + GRID.width;


var topMenu_top = canvasPosition.top + 100; //HERE
var bottomMenu_top = canvasPosition.top + CANVAS.height - $( gameMenuBottom ).height();


$( gameMenuTop ).css( 'top', topMenu_top + 'px' );
$( gameMenuTop ).css( 'left', left + 'px' );

$( gameMenuBottom ).css( 'top', bottomMenu_top + 'px' );
$( gameMenuBottom ).css( 'left', left + 'px' );
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

piece.positionIn( GRID.width + GAME_MENU_WIDTH / 2, 20 );
piece.addToContainer( STAGE );

NEXT_PIECE = piece;
};



Game.clear = function()
{
$( '#GameMenu-pauseResume' ).text( 'Pause' );

$( '#GameMenu' ).css( 'display', 'none' );

createjs.Ticker.removeListener( Game.tick );
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



Game.tick = function()
{
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