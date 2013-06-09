(function(window)
{
function IPiece( x, y )
{
    // inherit from Piece (base class)
Piece.call( this );

var container = new createjs.Container();

container.x = x;
container.y = y;

var color = 'red';

var square1 = new Square( -20, 0, color );
var square2 = new Square( -10, 0, color );
var square3 = new Square( 0, 0, color );
var square4 = new Square( 10, 0, color );

container.addChild( square1.shape );
container.addChild( square2.shape );
container.addChild( square3.shape );
container.addChild( square4.shape );

this.shape = container;

STAGE.addChild( container );
}

    // inherit the member functions
INHERIT_PROTOTYPE( IPiece, Piece );


window.IPiece = IPiece;

}(window));