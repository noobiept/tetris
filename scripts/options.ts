import * as AppStorage from './app_storage.js';

    // default options
var OPTIONS = {

    numberOfColumns: 10,
    numberOfLines: 20,
    startingLevel: 0,
    linesToLevelUp: 5
    };


/**
 * Save the current options to the local storage.
 */
export function save()
{
AppStorage.setData( { tetris_options: OPTIONS } );
}


/**
 * Load the options from the local storage.
 */
export function load( options )
{
if ( options )
    {
    if ( $.isNumeric( options.numberOfColumns ) )
        {
        OPTIONS.numberOfColumns = options.numberOfColumns;
        }

    if ( $.isNumeric( options.numberOfLines ) )
        {
        OPTIONS.numberOfLines = options.numberOfLines;
        }

    if ( $.isNumeric( options.startingLevel ) )
        {
        OPTIONS.startingLevel = options.startingLevel;
        }

    if ( $.isNumeric( options.linesToLevelUp ) )
        {
        OPTIONS.linesToLevelUp = options.linesToLevelUp;
        }
    }
}


/**
 * Return the grid's number of columns.
 */
export function getNumberOfColumns()
{
return OPTIONS.numberOfColumns;
}


/**
 * Change the number of columns of the grid.
 */
export function setNumberOfColumns( columns )
{
OPTIONS.numberOfColumns = columns;
}


/**
 * Return the grid's number of lines.
 */
export function getNumberOfLines()
{
return OPTIONS.numberOfLines;
}


/**
 * Change the number of lines of the grid.
 */
export function setNumberOfLines( lines )
{
OPTIONS.numberOfLines = lines;
}


/**
 * Return the starting level of the game.
 */
export function getStartingLevel()
{
return OPTIONS.startingLevel;
}


/**
 * Change the starting level of the game.
 */
export function setStartingLevel( level )
{
OPTIONS.startingLevel = level;
}


/**
 * Return the number of cleared lines necessary to level up.
 */
export function getLinesToLevelUp()
{
return OPTIONS.linesToLevelUp;
}


/**
 * Change the number of cleared lines necessary to level up.
 */
export function setLinesToLevelUp( lines )
{
OPTIONS.linesToLevelUp = lines;
}
