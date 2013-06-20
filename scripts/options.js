(function(window)
{
function Options()
{

}

var OPTIONS = {

    numberOfColumns: 20,
    numberOfLines: 30,
    startingLevel: 1

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
    OPTIONS = options;
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



window.Options = Options;

}(window));