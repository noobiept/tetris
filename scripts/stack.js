(function(window)
{
function Stack()
{
this.all_squares = [];
}


/*
    Add a piece to the stack
 */

Stack.prototype.add = function( pieceObject )
{
this.all_squares = this.all_squares.concat( pieceObject.all_squares );
};


/*
    Check collision between the active piece and the stack of pieces
 */

Stack.prototype.checkCollision = function()
{
var pieceSquares = ACTIVE_PIECE.all_squares;
var stackSquares = this.all_squares;

for (var i = 0 ; i < pieceSquares.length ; i++)
    {
    var activeX = pieceSquares[ i ].getX();
    var activeY = pieceSquares[ i ].getY() + Square.size;    // check the next position its going to be


    var square;

    for (var k = 0 ; k < stackSquares.length ; k++)
        {
        square = stackSquares[ k ];

        if ( checkCollision( activeX, activeY, square.getX(), square.getY() ) )
            {
            this.add( ACTIVE_PIECE );

            newPiece();
            return true;
            }
        }


        // check as well if reached bottom of grid
    if ( GRID.hitBottom( activeX, activeY ) )
        {
        this.add( ACTIVE_PIECE );

        newPiece();
        return true;
        }
    }

return false;
};



Stack.prototype.clearLine = function()
{

};



window.Stack = Stack;

}(window));