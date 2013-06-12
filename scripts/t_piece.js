(function(window)
{
function TPiece( gridObject )
{
this.possible_rotations = [
        [
            { x: -Square.size, y: 0 },
            { x: Square.size, y: 0 },
            { x: 0, y: Square.size }
        ],
        [
            { x: 0, y: -Square.size },
            { x: 0, y: Square.size },
            { x: -Square.size, y: 0 }
        ],
        [
            { x: -Square.size, y: 0 },
            { x: Square.size, y: 0 },
            { x: 0, y: -Square.size }
        ],
        [
            { x: 0, y: -Square.size },
            { x: 0, y: Square.size },
            { x: Square.size, y: 0 }
        ]
    ];

this.current_rotation = 0;

this.color = 'purple';

    // inherit from Piece (base class)
Piece.call( this, gridObject );
}

    // inherit the member functions
INHERIT_PROTOTYPE( TPiece, Piece );


window.TPiece = TPiece;

}(window));