import { PieceArgs } from './piece.js';


export const IPiece: PieceArgs = Object.freeze({
    possibleRotations: [    // its relative to the pivot square
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
    ],

    // red color
    color: 'rgb(255, 0, 0)',
    pivotColor: 'rgba(255, 0, 0, 0.8)'
});

