/*global Piece, INHERIT_PROTOTYPE*/

(function(window)
{
function JPiece( gridObject, column, line )
{
this.possible_rotations = JPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

    // blue
this.color = 'rgb(0, 0, 255)';
this.pivot_color = 'rgba(0, 0, 255, 0.8)';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
INHERIT_PROTOTYPE( JPiece, Piece );


JPiece.POSSIBLE_ROTATIONS = [
        [
            { column: -2, line: 0 },
            { column: -1, line: 0 },
            { column: 0, line: 1 }
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: -1 },
            { column: 0, line: -2 }
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: 0 },
            { column: 2, line: 0 }
        ],
        [
            { column: 1, line: 0 },
            { column: 0, line: 1 },
            { column: 0, line: 2 }
        ]
    ];


window.JPiece = JPiece;
}(window));
