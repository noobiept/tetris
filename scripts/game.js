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

var CURRENT_LEVEL = 1;


var GAME_MENU_WIDTH = 200;  // in pixels


Game.start = function()
{
clearCanvas();

var startingX = 50;
var startingY = 10;
var numberOfColumns = Options.getNumberOfColumns();
var numberOfLines = Options.getNumberOfLines();

CURRENT_LEVEL = Options.getStartingLevel();

    // resize the canvas, according to the grid's dimension
CANVAS.width = numberOfColumns * Square.size + 2 * startingX + GAME_MENU_WIDTH;
CANVAS.height = numberOfLines * Square.size + 2 * startingY;

centerCanvas();

GRID = new Grid( startingX, startingY, numberOfColumns, numberOfLines );

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


Game.initGameMenu = function()
{
var gameMenu = document.querySelector( '#GameMenu' );

    // :: Current Level :: //

var currentLevel = gameMenu.querySelector( '#GameMenu-currentLevel span' );

currentLevel.innerText = CURRENT_LEVEL;


    // :: Pause / Resume :: //

var pauseResume = gameMenu.querySelector( '#GameMenu-pauseResume' );

var isPaused = false;

pauseResume.onclick = function()
    {
    if ( isPaused )
        {
        isPaused = false;
        pauseResume.innerText = 'Pause';

        resume();
        }

    else
        {
        isPaused = true;
        pauseResume.innerText = 'Resume';

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

var numberOfColumns = Options.getNumberOfColumns();
var numberOfLines = Options.getNumberOfLines();

    // show the menu (has to be before doing the calculations below)
$( gameMenu ).css( 'display', 'block' );

    // set the width of the menus
$( gameMenuTop ).css( 'width', GAME_MENU_WIDTH + 'px' );
$( gameMenuBottom ).css( 'width', GAME_MENU_WIDTH + 'px' );

    // left is same for both menus (top/bottom)
var left = canvasPosition.left + numberOfColumns * Square.size + GAME_MENU_WIDTH / 2; // text is center aligned, so divide by 2

var topMenu_top = canvasPosition.top;
var bottomMenu_top = topMenu_top + numberOfLines * Square.size - $( gameMenuBottom ).height();


$( gameMenuTop ).css( 'top', topMenu_top + 'px' );
$( gameMenuTop ).css( 'left', left + 'px' );

$( gameMenuBottom ).css( 'top', bottomMenu_top + 'px' );
$( gameMenuBottom ).css( 'left', left + 'px' );
};



Game.clear = function()
{
$( '#GameMenu-pauseResume' ).text( 'Pause' );

$( '#GameMenu' ).css( 'display', 'none' );
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