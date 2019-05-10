import { PieceArgs } from "./piece.js";

// used to help the player to know where the active piece will end up at
export const GhostPiece = Object.freeze({
    color: "rgb(128, 128, 128)",
    pivotColor: "rgba(128, 128, 128, 0.8)",
});

export const IPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        // its relative to the pivot square
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 2, line: 0 },
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: 0, line: 2 },
        ],
        [
            { column: -2, line: 0 },
            { column: -1, line: 0 },
            { column: 1, line: 0 },
        ],
        [
            { column: 0, line: -2 },
            { column: 0, line: -1 },
            { column: 0, line: 1 },
        ],
    ],

    // red color
    color: "rgb(255, 0, 0)",
    pivotColor: "rgba(255, 0, 0, 0.8)",
});

export const JPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: -2, line: 0 },
            { column: -1, line: 0 },
            { column: 0, line: 1 },
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: -1 },
            { column: 0, line: -2 },
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: 0 },
            { column: 2, line: 0 },
        ],
        [
            { column: 1, line: 0 },
            { column: 0, line: 1 },
            { column: 0, line: 2 },
        ],
    ],

    // blue
    color: "rgb(0, 0, 255)",
    pivotColor: "rgba(0, 0, 255, 0.8)",
});

export const LPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: 1, line: 0 },
            { column: 2, line: 0 },
            { column: 0, line: 1 },
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: 1 },
            { column: 0, line: 2 },
        ],
        [
            { column: 0, line: -1 },
            { column: -1, line: 0 },
            { column: -2, line: 0 },
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: -2 },
            { column: 1, line: 0 },
        ],
    ],

    // orange
    color: "rgb(255, 165, 0)",
    pivotColor: "rgba(255, 165, 0, 0.8)",
});

export const OPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: -1, line: 0 },
            { column: -1, line: 1 },
            { column: 0, line: 1 },
        ],
        [
            { column: -1, line: -1 },
            { column: -1, line: 0 },
            { column: 0, line: -1 },
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: -1 },
            { column: 1, line: 0 },
        ],
        [
            { column: 1, line: 0 },
            { column: 1, line: 1 },
            { column: 0, line: 1 },
        ],
    ],

    // yellow
    color: "rgb(255, 255, 0)",
    pivotColor: "rgba(255, 255, 0, 0.8)",
});

export const SPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: 1, line: 0 },
            { column: 0, line: 1 },
            { column: -1, line: 1 },
        ],
        [
            { column: -1, line: -1 },
            { column: -1, line: 0 },
            { column: 0, line: 1 },
        ],
        [
            { column: -1, line: 0 },
            { column: 0, line: -1 },
            { column: 1, line: -1 },
        ],
        [
            { column: 0, line: -1 },
            { column: 1, line: 0 },
            { column: 1, line: 1 },
        ],
    ],

    // green
    color: "rgb(0, 128, 0)",
    pivotColor: "rgba(0, 128, 0, 0.8)",
});

export const TPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 0, line: 1 },
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: -1, line: 0 },
        ],
        [
            { column: -1, line: 0 },
            { column: 1, line: 0 },
            { column: 0, line: -1 },
        ],
        [
            { column: 0, line: -1 },
            { column: 0, line: 1 },
            { column: 1, line: 0 },
        ],
    ],

    // purple
    color: "rgb(128, 0, 128)",
    pivotColor: "rgba(128, 0, 128, 0.8)",
});

export const ZPiece: PieceArgs = Object.freeze({
    possibleRotations: [
        [
            { column: -1, line: 0 },
            { column: 0, line: 1 },
            { column: 1, line: 1 },
        ],
        [
            { column: 0, line: -1 },
            { column: -1, line: 0 },
            { column: -1, line: 1 },
        ],
        [
            { column: -1, line: -1 },
            { column: 0, line: -1 },
            { column: 1, line: 0 },
        ],
        [
            { column: 1, line: -1 },
            { column: 1, line: 0 },
            { column: 0, line: 1 },
        ],
    ],

    // cyan
    color: "rgb(0, 255, 255)",
    pivotColor: "rgba(0, 255, 255, 0.8)",
});
