(function(window)
{
function IPiece( gridObject, column, line )
{
    // its relative to the pivot square
this.possible_rotations = IPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

this.color = 'red';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
INHERIT_PROTOTYPE( IPiece, Piece );



IPiece.POSSIBLE_ROTATIONS = [
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 2, line: 0 }
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: 0, line: 2 }
        ],
        [
            { column: -2, line: 0 },
            { column: -1, line: 0 },
            { column: 1, line: 0 }
        ],
        [
            { column: 0, line: -2 },
            { column: 0, line: -1 },
            { column: 0, line: 1 }
        ]
    ];


window.IPiece = IPiece;

}(window));