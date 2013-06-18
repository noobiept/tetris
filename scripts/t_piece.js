(function(window)
{
function TPiece( gridObject, column, line )
{
this.possible_rotations = TPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

this.color = 'purple';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
INHERIT_PROTOTYPE( TPiece, Piece );


TPiece.POSSIBLE_ROTATIONS = [
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 0, line: 1 }
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: -1, line: 0 }
        ],
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 0, line: -1 }
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: 1, line: 0 }
        ]
    ];


window.TPiece = TPiece;

}(window));