(function(window)
{
function IPiece( gridObject )
{
    // inherit from Piece (base class)
Piece.call( this, gridObject );

var container = gridObject.container;

    // center the element
var centerX = parseInt( gridObject.squaresWidth / 2, 10 ) * Square.size;

var color = 'red';

var square3 = new Square( centerX, 0, color );

var square2 = new Square( centerX - Square.size, 0, color );
var square1 = new Square( centerX - 2 * Square.size, 0, color );
var square4 = new Square( centerX + Square.size, 0, color );


this.shapes = [ square1, square2, square3, square4 ];
this.gridObject = gridObject;

container.addChild( square1.shape );
container.addChild( square2.shape );
container.addChild( square3.shape );
container.addChild( square4.shape );
}

    // inherit the member functions
INHERIT_PROTOTYPE( IPiece, Piece );



IPiece.prototype.rotateLeft = function()
{
    // square3 is the center piece, so rotate the others around that

};


IPiece.prototype.rotateRight = function()
{

};



window.IPiece = IPiece;

}(window));