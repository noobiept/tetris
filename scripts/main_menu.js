(function(window)
{
function MainMenu()
{

}

    // reference to the html elements
var MAIN_MENU;
var OPTIONS;
var HELP;


var ACTIVE_MENU;

MainMenu.init = function()
{
MAIN_MENU = document.querySelector( '#MainMenu' );
OPTIONS = document.querySelector( '#Options' );
HELP = document.querySelector( '#Help' );
};


MainMenu.open = function()
{
clearCanvas();

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



var back = OPTIONS.querySelector( '#Options-back' );

back.onclick = function()
    {
    MainMenu.open();
    };


$( OPTIONS ).css( 'display', 'block' );

centerElement( OPTIONS );

ACTIVE_MENU = OPTIONS;
};


MainMenu.openHelp = function()
{
$( ACTIVE_MENU ).css( 'display', 'none' );



var back = HELP.querySelector( '#Help-back' );

back.onclick = function()
    {
    MainMenu.open();
    };

$( HELP ).css( 'display', 'block' );

centerElement( HELP );

ACTIVE_MENU = HELP;
};



MainMenu.clear = function()
{
$( MAIN_MENU ).css( 'display', 'none' );
$( OPTIONS   ).css( 'display', 'none' );
$( HELP      ).css( 'display', 'none' );
};



MainMenu.tick = function()
{
STAGE.update();
};



window.MainMenu = MainMenu;

}(window));