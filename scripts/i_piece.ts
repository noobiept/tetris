import Piece from './piece.js';


export default class IPiece extends Piece {

    static readonly POSSIBLE_ROTATIONS = [
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
    // its relative to the pivot square
    possible_rotations = IPiece.POSSIBLE_ROTATIONS;
    current_rotation = 0;

    // red color
    color = 'rgb(255, 0, 0)';
    pivot_color = 'rgba(255, 0, 0, 0.8)'
}



