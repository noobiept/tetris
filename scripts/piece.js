/*
    Base class for all the pieces
 */

(function(window)
{
function Piece()
{
    // this is set by the derived classes
this.shape = null;
}



Piece.prototype.moveLeft = function()
{
this.shape.x -= Square.size;
};



Piece.prototype.moveRight = function()
{
this.shape.x += Square.size;
};


Piece.prototype.rotateLeft = function()
{
this.shape.rotation += 90;
};


Piece.prototype.rotateRight = function()
{
this.shape.rotation -= 90;
};


Piece.prototype.softDrop = function()
{

};


Piece.prototype.hardDrop = function()
{

};



window.Piece = Piece;

}(window));