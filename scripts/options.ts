var Options;
(function(Options)
{
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
Options.save = function()
{
AppStorage.setData( { tetris_options: OPTIONS } );
};


/**
 * Load the options from the local storage.
 */
Options.load = function( options )
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
};


/**
 * Return the grid's number of columns.
 */
Options.getNumberOfColumns = function()
{
return OPTIONS.numberOfColumns;
};


/**
 * Change the number of columns of the grid.
 */
Options.setNumberOfColumns = function( columns )
{
OPTIONS.numberOfColumns = columns;
};


/**
 * Return the grid's number of lines.
 */
Options.getNumberOfLines = function()
{
return OPTIONS.numberOfLines;
};


/**
 * Change the number of lines of the grid.
 */
Options.setNumberOfLines = function( lines )
{
OPTIONS.numberOfLines = lines;
};


/**
 * Return the starting level of the game.
 */
Options.getStartingLevel = function()
{
return OPTIONS.startingLevel;
};


/**
 * Change the starting level of the game.
 */
Options.setStartingLevel = function( level )
{
OPTIONS.startingLevel = level;
};


/**
 * Return the number of cleared lines necessary to level up.
 */
Options.getLinesToLevelUp = function()
{
return OPTIONS.linesToLevelUp;
};


/**
 * Change the number of cleared lines necessary to level up.
 */
Options.setLinesToLevelUp = function( lines )
{
OPTIONS.linesToLevelUp = lines;
};


})(Options || (Options = {}));
