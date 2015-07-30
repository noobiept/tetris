var STAGE;      // createjs Stage object
var CANVAS;     // canvas html element


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
