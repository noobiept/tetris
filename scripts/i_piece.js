(function(window)
{
function IPiece( gridObject )
{
this.possible_rotations = [
        [
            { x: -Square.size, y: 0 },
            { x: Square.size, y: 0 },
            { x: 2 * Square.size, y: 0 }
        ],
        [
            { x: 0, y: -Square.size },
            { x: 0, y: Square.size },
            { x: 0, y: 2 * Square.size }
        ],
        [
            { x: -2 * Square.size, y: 0 },
            { x: -Square.size, y: 0 },
            { x: Square.size, y: 0 }
        ],
        [
            { x: 0, y: -Square.size },
            { x: 0, y: -2 * Square.size },
            { x: 0, y: Square.size }
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