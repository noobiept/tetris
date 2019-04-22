import * as Options from './options.js';
import * as Game from './game.js';
import * as Utilities from './utilities.js';
import { CANVAS } from './main.js';

    // reference to the html elements
var MAIN_MENU;
var OPTIONS_MENU;
var HELP_MENU;

    // current active (shown) menu
    // either the main menu, options menu or the help menu
var ACTIVE_MENU;

    // the canvas dimensions (for the main menu only, it may change for the game)
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 450;


/**
 * Initialize the main menu.
 */
export function init()
{
MAIN_MENU = document.querySelector( '#MainMenu' );
OPTIONS_MENU = document.querySelector( '#Options' );
HELP_MENU = document.querySelector( '#Help' );

CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;
}


/**
 * Open the main menu.
 * You can start the game, open the options or the help menu from this.
 */
export function open()
{
if ( ACTIVE_MENU )
    {
    ACTIVE_MENU.classList.add( 'hide' );
    }

ACTIVE_MENU = MAIN_MENU;
ACTIVE_MENU.classList.remove( 'hide' );


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
    openOptions();
    };

help.onclick = function()
    {
    openHelp();
    };

rePosition();
}


/**
 * Open the options menu.
 */
export function openOptions()
{
if ( ACTIVE_MENU )
    {
    ACTIVE_MENU.classList.add( 'hide' );
    }

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
    max: 20,
    step: 1,
    value: numberOfColumns,
    range: 'min',
    slide: function( event, ui )
        {
        $( columnsSpan ).text( ui.value );

        Options.setNumberOfColumns( Math.round( ui.value ) );
        rePosition();
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
    max: 25,
    step: 1,
    value: numberOfLines,
    range: 'min',
    slide: function( event, ui )
        {
        $( linesSpan ).text( ui.value );

        Options.setNumberOfLines( Math.round( ui.value ) );
        rePosition();
        }
    });


    // :: starting level :: //

var level = OPTIONS_MENU.querySelector( '#Options-startingLevel' );
var levelSpan = level.querySelector( 'span' );

var startingLevel = Options.getStartingLevel();

$( levelSpan ).text( startingLevel + 1 );


var levelSlider = level.querySelector( '#Options-startingLevel-slider' );

$( levelSlider ).slider({
    min: 1,
    max: Game.getMaxLevel(),
    step: 1,
    value: startingLevel + 1,
    range: 'min',
    slide: function( event, ui )
        {
        $( levelSpan ).text( ui.value );

        Options.setStartingLevel( Math.round( ui.value ) - 1 );
        rePosition();
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

        Options.setLinesToLevelUp( Math.round( ui.value ) );
        rePosition();
        }
    });


    // :: Other :: //

var back = OPTIONS_MENU.querySelector( '#Options-back' );

back.onclick = function()
    {
    Options.save();
    open();
    };

rePosition();
}


/**
 * Open the help menu.
 */
export function openHelp()
{
var back = HELP_MENU.querySelector( '#Help-back' );

back.onclick = function()
    {
    open();
    };


if ( ACTIVE_MENU )
    {
    ACTIVE_MENU.classList.add( 'hide' );
    }

ACTIVE_MENU = HELP_MENU;
ACTIVE_MENU.classList.remove( 'hide' );

rePosition();
}


/**
 * Re-center the menu elements.
 */
export function rePosition()
{
if ( ACTIVE_MENU )
    {
    Utilities.centerElement( ACTIVE_MENU );
    }
}
