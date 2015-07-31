(function(window)
{
function OPiece( gridObject, column, line )
{
this.possible_rotations = OPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

    // yellow
this.color = 'rgb(255, 255, 0)';
this.pivot_color = 'rgba(255, 255, 0, 0.8)';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
INHERIT_PROTOTYPE( OPiece, Piece );


OPiece.POSSIBLE_ROTATIONS = [
        [
            { column: -1, line: 0 },
            { column: -1, line: 1 },
            { column: 0, line: 1 }
        ],
        [
            { column: -1, line: -1 },
            { column: -1, line: 0 },
            { column: 0, line: -1 }
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: -1 },
            { column: 1, line: 0 }
        ],
        [
            { column: 1, line: 0 },
            { column: 1, line: 1 },
            { column: 0, line: 1 }
        ]
    ];


window.OPiece = OPiece;
}(window));