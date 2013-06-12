(function(window)
{
function SPiece( gridObject )
{
    // relative to the center element (pivot)
    // rotate right, go 0, 1, 2, 3, ...
    // rotate left, go 0, 3, 2, 1, ...
this.possible_rotations = [
        [
            { x: Square.size, y: 0 },   // position of the other squares, relative to the pivot square (add from that)
            { x: 0, y: Square.size },
            { x: -Square.size, y: Square.size }
        ],
        [
            { x: -Square.size, y: -Square.size },
            { x: -Square.size, y: 0 },
            { x: 0, y: Square.size }
        ],
        [
            { x: -Square.size, y: 0 },
            { x: 0, y: -Square.size },
            { x: Square.size, y: -Square.size }
        ],
        [
            { x: 0, y: -Square.size },
            { x: Square.size, y: 0 },
            { x: Square.size, y: Square.size }
        ]
    ];

    // the position in the array
this.current_rotation = 0;

this.color = 'green';

    // inherit from Piece (base class)
Piece.call( this, gridObject );
}


    // inherit the member functions
INHERIT_PROTOTYPE( SPiece, Piece );


window.SPiece = SPiece;

}(window));