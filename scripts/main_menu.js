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
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

MainMenu.init = function()
{
MAIN_MENU = document.querySelector( '#MainMenu' );
OPTIONS_MENU = document.querySelector( '#Options' );
HELP_MENU = document.querySelector( '#Help' );
};


MainMenu.open = function()
{
clearCanvas();

CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

centerCanvas();

var startGame = MAIN_MENU.querySelector( '#MainMenu-startGame' );
var options = MAIN_MENU.querySelector( '#MainMenu-options' );
var help = MAIN_MENU.querySelector( '#MainMenu-help' );

    // set events
startGame.onclick = function()
    {
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

$( MAIN_MENU ).css( 'display', 'block' );

ACTIVE_MENU = MAIN_MENU;

centerElement( MAIN_MENU );

createjs.Ticker.addEventListener( 'tick', MainMenu.tick );
};


MainMenu.openOptions = function()
{
$( ACTIVE_MENU ).css( 'display', 'none' );


    // :: number of columns :: //

var columns = OPTIONS_MENU.querySelector( '#Options-numberOfColumns' );
var columnsSpan = columns.querySelector( 'span' );

var numberOfColumns = Options.getNumberOfColumns();

columnsSpan.innerText = numberOfColumns;


var columnsSlider = columns.querySelector( '#Options-numberOfColumns-slider' );

$( columnsSlider ).slider({
    min: 10,
    max: 40,
    step: 5,
    value: numberOfColumns,
    range: 'min',
    slide: function( event, ui )
        {
        columnsSpan.innerText = ui.value;

        Options.setNumberOfColumns( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });


    // :: number of lines :: //

var lines = OPTIONS_MENU.querySelector( '#Options-numberOfLines' );
var linesSpan = lines.querySelector( 'span' );

var numberOfLines = Options.getNumberOfLines();

linesSpan.innerText = numberOfLines;


var linesSlider = lines.querySelector( '#Options-numberOfLines-slider' );

$( linesSlider ).slider({
    min: 10,
    max: 40,
    step: 5,
    value: numberOfLines,
    range: 'min',
    slide: function( event, ui )
        {
        linesSpan.innerText = ui.value;

        Options.setNumberOfLines( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });


    // :: starting level :: //


var level = OPTIONS_MENU.querySelector( '#Options-startingLevel' );
var levelSpan = level.querySelector( 'span' );

var startingLevel = Options.getStartingLevel();

levelSpan.innerText = startingLevel;


var levelSlider = level.querySelector( '#Options-startingLevel-slider' );

$( levelSlider ).slider({
    min: 1,
    max: 20,
    step: 1,
    value: startingLevel,
    range: 'min',
    slide: function( event, ui )
        {
        levelSpan.innerText = ui.value;

        Options.setStartingLevel( parseInt( ui.value, 10 ) );

        centerElement( OPTIONS_MENU );
        }
    });



var back = OPTIONS_MENU.querySelector( '#Options-back' );

back.onclick = function()
    {
    MainMenu.open();
    };


$( OPTIONS_MENU ).css( 'display', 'block' );

centerElement( OPTIONS_MENU );

ACTIVE_MENU = OPTIONS_MENU;
};


MainMenu.openHelp = function()
{
$( ACTIVE_MENU ).css( 'display', 'none' );



var back = HELP_MENU.querySelector( '#Help-back' );

back.onclick = function()
    {
    MainMenu.open();
    };

$( HELP_MENU ).css( 'display', 'block' );

centerElement( HELP_MENU );

ACTIVE_MENU = HELP_MENU;
};



MainMenu.clear = function()
{
$( MAIN_MENU    ).css( 'display', 'none' );
$( OPTIONS_MENU ).css( 'display', 'none' );
$( HELP_MENU    ).css( 'display', 'none' );
};



MainMenu.tick = function()
{
STAGE.update();
};



window.MainMenu = MainMenu;

}(window));