import * as AppStorage from './app_storage.js';
import * as Options from './options.js';
import * as MainMenu from './main_menu.js';

export var STAGE;      // createjs Stage object
export var CANVAS;     // canvas html element


window.onload = function()
{
AppStorage.getData( [ 'tetris_options', 'tetris_has_run_before' ], initApp );
};


function initApp( data )
{
Options.load( data[ 'tetris_options' ] );

CANVAS = document.querySelector( '#mainCanvas' );
STAGE = new createjs.Stage( CANVAS );

createjs.Ticker.timingMode = createjs.Ticker.RAF;

MainMenu.init();

if ( !data[ 'tetris_has_run_before' ] )
    {
    AppStorage.setData( { tetris_has_run_before: true } );
    MainMenu.openHelp();
    }

else
    {
    MainMenu.open();
    }
}


window.onresize = function()
{
MainMenu.rePosition();
};
