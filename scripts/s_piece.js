(function(window)
{
function SPiece( gridObject, column, line )
{
    // relative to the center element (pivot)
    // rotate right, go 0, 1, 2, 3, ...
    // rotate left, go 0, 3, 2, 1, ...
this.possible_rotations = SPiece.POSSIBLE_ROTATIONS;

    // the position in the array
this.current_rotation = 0;

this.color = 'green';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}


    // inherit the member functions
INHERIT_PROTOTYPE( SPiece, Piece );


SPiece.POSSIBLE_ROTATIONS = [
        [
            { column: 1, line: 0 },
            { column: 0, line: 1 },
            { column: -1, line: 1 }
        ],
        [
            { column: -1, line: -1 },
            { column: -1, line: 0 },
            { column: 0, line: 1 }
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: -1 },
            { column: 1, line: -1 }
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: 0 },
            { column: 1, line: 1 }
        ]
    ];


window.SPiece = SPiece;

}(window));