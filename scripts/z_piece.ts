function ZPiece( gridObject, column, line )
{
this.possible_rotations = ZPiece.POSSIBLE_ROTATIONS;

this.current_rotation = 0;

    // cyan
this.color = 'rgb(0, 255, 255)';
this.pivot_color = 'rgba(0, 255, 255, 0.8)';

    // inherit from Piece (base class)
Piece.call( this, gridObject, column, line );
}

    // inherit the member functions
Utilities.INHERIT_PROTOTYPE( ZPiece, Piece );


ZPiece.POSSIBLE_ROTATIONS = [
        [
            { column: -1, line: 0 },
            { column: 0, line: 1 },
            { column: 1, line: 1 }
        ],
        [
            { column: 0, line: -1 },
            { column: -1, line: 0 },
            { column: -1, line: 1 }
        ],
        [
            { column: -1, line: -1 },
            { column: 0, line: -1 },
            { column: 1, line: 0 }
        ],
        [
            { column: 1, line: -1 },
            { column: 1, line: 0 },
            { column: 0, line: 1 }
        ]
    ];
