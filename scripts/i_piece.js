/*global Piece, Utilities*/

(function(window)
{
function IPiece( gridObject, column, line )
{
    // its relative to the pivot square
this.possible_rotations = IPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

    // red
this.color = 'rgb(255, 0, 0)';
this.pivot_color = 'rgba(255, 0, 0, 0.8)';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
Utilities.INHERIT_PROTOTYPE( IPiece, Piece );



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
