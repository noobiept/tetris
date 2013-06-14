/*
    Base class for all the pieces
 */

(function(window)
{
/*
    Derived classes need to implement:

        this.color = 'a_color';
        this.possible_rotations = [
                [
                    { x: ..., y: ... },
                    { x: ..., y: ... },
                    { x: ..., y: ... }
                ],

                (...)
            ];

        this.current_position = 0;
 */

function Piece( gridObject )
{
var container = gridObject.container;

    // center the element in the grid
var centerX = parseInt( gridObject.squaresWidth / 2, 10 ) * Square.size;


var color = this.color;

var pivot = new Square( centerX, 0, 'blue' ); //HERE test only

var square1 = new Square( centerX, 0, color );  // the positions will be updated later
var square2 = new Square( centerX, 0, color );
var square3 = new Square( centerX, 0, color );

this.all_squares = [ square1, square2, square3, pivot ];
this.pivot_square = pivot;
this.other_squares = [ square1, square2, square3 ];
this.grid_object = gridObject;

    // this will position the squares in the right position
this.rotate();

container.addChild( square1.shape );
container.addChild( square2.shape );
container.addChild( square3.shape );
container.addChild( pivot.shape );
}



Piece.prototype.moveLeft = function()
{
var squares = this.all_squares;
var square;
var i;


    // check if we can move the piece
for (i = 0 ; i < squares.length ; i++)
    {
    square = squares[ i ];

        // check if not at the grid's limit
    if ( square.getX() <= 0 )
        {
        return;
        }

        // check if it doesn't collide with the stacked squares
    if ( this.grid_object.collision( square.getX() - Square.size, square.getY() ) )
        {
        return;
        }
    }


    // move 1 square to the left
for (i = 0 ; i < squares.length ; i++)
    {
    squares[ i ].moveLeft();
    }
};



Piece.prototype.moveRight = function()
{
var squares = this.all_squares;
var square;
var i;

    // check if we can move the piece
for (i = 0 ; i < squares.length ; i++)
    {
    square = squares[ i ];

        // its centered at top left
        // check if not at the grid's limit
    if ( square.getX() + Square.size >= this.grid_object.width )
        {
        return;
        }

        // check if it doesn't collide with the stacked squares
    if ( this.grid_object.collision( square.getX() + Square.size, square.getY() ) )
        {
        return;
        }
    }


    // move 1 square to the left
for (i = 0 ; i < squares.length ; i++)
    {
    squares[ i ].moveRight();
    }
};


Piece.prototype.moveBottom = function()
{
var squares = this.all_squares;

for ( var i = 0 ; i < squares.length ; i++ )
    {
    squares[ i ].moveBottom();
    }
};



Piece.prototype.rotate = function()
{
var rotation = this.possible_rotations[ this.current_rotation ];
var square;
var position;
var i;

var others = this.other_squares;

var center = this.pivot_square;
var centerX = center.getX();
var centerY = center.getY();


    // check if you can rotate (if its within the grid's limits)
for (i = 0 ; i < others.length ; i++)
    {
    square = others[ i ];
    position = rotation[ i ];

    var nextX = centerX + position.x;
    var nextY = centerY + position.y;


    if ( !this.grid_object.isWithin( nextX, nextY ) )
        {
        return false;
        }
    }

    // apply the rotation (change the squares position)
for (i = 0 ; i < others.length ; i++)
    {
    square = others[ i ];
    position = rotation[ i ];

    square.shape.x = centerX + position.x;
    square.shape.y = centerY + position.y;
    }


return true;
};



Piece.prototype.rotateLeft = function()
{
var tempCurrentRotation = this.current_rotation;

this.current_rotation--;

if ( this.current_rotation < 0 )
    {
    this.current_rotation = 3;
    }

    // if rotating wasn't possible, we stay in the current rotation
if ( !this.rotate() )
    {
    this.current_rotation = tempCurrentRotation;
    }
};



Piece.prototype.rotateRight = function()
{
var tempCurrentRotation = this.current_rotation;

this.current_rotation++;

if ( this.current_rotation > 3 )
    {
    this.current_rotation = 0;
    }

    // if rotating wasn't possible, we stay in the current rotation
if ( !this.rotate() )
    {
    this.current_rotation = tempCurrentRotation;
    }
};


/*
    Increases the speed that the pieces falls down
 */

Piece.prototype.softDrop = function()
{
DELAY_STEP = 5;
};

/*
    Back to normal speed
 */

Piece.prototype.stopSoftDrop = function()
{
DELAY_STEP = 1;
};


Piece.prototype.hardDrop = function()
{
this.moveBottom();

while( GRID.stack.checkCollision() === false )
    {
    this.moveBottom();
    }
};



window.Piece = Piece;

}(window));