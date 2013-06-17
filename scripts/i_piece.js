(function(window)
{
function IPiece( gridObject )
{
    // its relative to the pivot square
this.possible_rotations = [
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

this.current_rotation = 0;

this.color = 'red';

    // inherit from Piece (base class)
Piece.call( this, gridObject );
}

    // inherit the member functions
INHERIT_PROTOTYPE( IPiece, Piece );



window.IPiece = IPiece;

}(window));