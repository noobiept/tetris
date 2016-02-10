/*global Piece, INHERIT_PROTOTYPE*/

(function(window)
{
function LPiece( gridObject, column, line )
{
this.possible_rotations = LPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

    // orange
this.color = 'rgb(255, 165, 0)';
this.pivot_color = 'rgba(255, 165, 0, 0.8)';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
INHERIT_PROTOTYPE( LPiece, Piece );


LPiece.POSSIBLE_ROTATIONS = [
        [
            { column: 1, line: 0 },
            { column: 2, line: 0 },
            { column: 0, line: 1 }
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: 1 },
            { column: 0, line: 2 }
        ],
        [
            { column: 0, line: -1 },
            { column: -1, line: 0 },
            { column: -2, line: 0 }
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: -2 },
            { column: 1, line: 0 }
        ]
    ];


window.LPiece = LPiece;
}(window));
