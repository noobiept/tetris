(function(window)
{
function MainMenu()
{

}

    // reference to the html elements
var MAIN_MENU;
var OPTIONS_MENU;
var HELP_MENU;


var ACTIVE_MENU;

    // the canvas dimensions (for the main menu only, it may change for the game)
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 450;

MainMenu.init = function()
{
MAIN_MENU = document.querySelector( '#MainMenu' );
OPTIONS_MENU = document.querySelector( '#Options' );
HELP_MENU = document.querySelector( '#Help' );
};


MainMenu.open = function()
{
if ( ACTIVE_MENU )
    {
    ACTIVE_MENU.classList.add( 'hide' );
    }

ACTIVE_MENU = MAIN_MENU;
ACTIVE_MENU.classList.remove( 'hide' );

clearCanvas();

CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

var startGame = MAIN_MENU.querySelector( '#MainMenu-startGame' );
var options = MAIN_MENU.querySelector( '#MainMenu-options' );
var help = MAIN_MENU.querySelector( '#MainMenu-help' );

    // set events
startGame.onclick = function()
    {
    ACTIVE_MENU.classList.add( 'hide' );

    Game.start();
    };

options.onclick = function()
    {
    MainMenu.openOptions();
    };

help.onclick = function()
    {
    MainMenu.openHelp();
    };


ACTIVE_MENU = MAIN_MENU;
centerElement( MAIN_MENU );

createjs.Ticker.addEventListener( 'tick', MainMenu.tick );
};


MainMenu.openOptions = function()
{
ACTIVE_MENU.classList.add( 'hide' );
ACTIVE_MENU = OPTIONS_MENU;

OPTIONS_MENU.classList.remove( 'hide' );


    // :: number of columns :: //

var columns = OPTIONS_MENU.querySelector( '#Options-numberOfColumns' );
var columnsSpan = columns.querySelector( 'span' );

var numberOfColumns = Options.getNumberOfColumns();

$( columnsSpan ).text( numberOfColumns );


var columnsSlider = columns.querySelector( '#Options-numberOfColumns-slider' );

$( columnsSlider ).slider({
    min: 10,
    max: 30,
    step: 5,
    value: numberOfColumns,
    range: 'min',
    slide: function( event, ui )
        {
        $( columnsSpan ).text( ui.value );

        Options.setNumberOfColumns( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });


    // :: number of lines :: //

var lines = OPTIONS_MENU.querySelector( '#Options-numberOfLines' );
var linesSpan = lines.querySelector( 'span' );

var numberOfLines = Options.getNumberOfLines();

$( linesSpan ).text( numberOfLines );


var linesSlider = lines.querySelector( '#Options-numberOfLines-slider' );

$( linesSlider ).slider({
    min: 15,
    max: 40,
    step: 5,
    value: numberOfLines,
    range: 'min',
    slide: function( event, ui )
        {
        $( linesSpan ).text( ui.value );

        Options.setNumberOfLines( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });


    // :: starting level :: //


var level = OPTIONS_MENU.querySelector( '#Options-startingLevel' );
var levelSpan = level.querySelector( 'span' );

var startingLevel = Options.getStartingLevel();

$( levelSpan ).text( startingLevel );


var levelSlider = level.querySelector( '#Options-startingLevel-slider' );

$( levelSlider ).slider({
    min: 1,
    max: Game.getMaxLevel(),
    step: 1,
    value: startingLevel,
    range: 'min',
    slide: function( event, ui )
        {
        $( levelSpan ).text( ui.value );

        Options.setStartingLevel( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });


    // :: Required Lines to Level Up :: //

var linesToLevel = OPTIONS_MENU.querySelector( '#Options-linesToLevelUp' );
var linesToLevelSpan = linesToLevel.querySelector( 'span' );

var linesToLevelValue = Options.getLinesToLevelUp();

$( linesToLevelSpan ).text( linesToLevelValue );


var linesToLevelSlider = linesToLevel.querySelector( '#Options-linesToLevelUp-slider' );

$( linesToLevelSlider ).slider({
    min: 1,
    max: 15,
    step: 1,
    value: linesToLevelValue,
    range: 'min',
    slide: function( event, ui )
        {
        $( linesToLevelSpan ).text( ui.value );

        Options.setLinesToLevelUp( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });



    // :: Other :: //

var back = OPTIONS_MENU.querySelector( '#Options-back' );

back.onclick = function()
    {
    MainMenu.open();
    };


centerElement( OPTIONS_MENU );
};


MainMenu.openHelp = function()
{
var back = HELP_MENU.querySelector( '#Help-back' );

back.onclick = function()
    {
    MainMenu.open();
    };


ACTIVE_MENU.classList.add( 'hide' );
ACTIVE_MENU = HELP_MENU;
ACTIVE_MENU.classList.remove( 'hide' );

centerElement( HELP_MENU );
};


MainMenu.tick = function()
{
STAGE.update();
};



window.MainMenu = MainMenu;

}(window));