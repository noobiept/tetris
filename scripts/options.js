(function(window)
{
function Options()
{

}

var OPTIONS = {

    numberOfColumns: 10,
    numberOfLines: 20,
    startingLevel: 1,
    linesToLevelUp: 5

    };

Options.save = function()
{
localStorage.setObject( 'options', OPTIONS );
};

Options.load = function()
{
var options = localStorage.getObject( 'options' );

if ( options !== null )
    {
    if ( options.numberOfColumns )
        {
        OPTIONS.numberOfColumns = options.numberOfColumns;
        }

    if ( options.numberOfLines )
        {
        OPTIONS.numberOfLines = options.numberOfLines;
        }

    if ( options.startingLevel )
        {
        OPTIONS.startingLevel = options.startingLevel;
        }

    if ( options.linesToLevelUp )
        {
        OPTIONS.linesToLevelUp = options.linesToLevelUp;
        }
    }
};


Options.getNumberOfColumns = function()
{
return OPTIONS.numberOfColumns;
};


Options.setNumberOfColumns = function( columns )
{
OPTIONS.numberOfColumns = columns;
};


Options.getNumberOfLines = function()
{
return OPTIONS.numberOfLines;
};

Options.setNumberOfLines = function( lines )
{
OPTIONS.numberOfLines = lines;
};


Options.getStartingLevel = function()
{
return OPTIONS.startingLevel;
};


Options.setStartingLevel = function( level )
{
OPTIONS.startingLevel = level;
};


Options.getLinesToLevelUp = function()
{
return OPTIONS.linesToLevelUp;
};


Options.setLinesToLevelUp = function( lines )
{
OPTIONS.linesToLevelUp = lines;
};


window.Options = Options;

}(window));