import { getRandomInt } from "@drk4/utilities";

import {
    IPiece,
    JPiece,
    LPiece,
    OPiece,
    type PieceArgs,
    SPiece,
    TPiece,
    ZPiece,
} from "../grid";

/**
 * Randomly choose the class of a piece.
 */
export function chooseRandomPiece(ignore?: PieceArgs) {
    let possiblePieces = [
        IPiece,
        SPiece,
        TPiece,
        ZPiece,
        OPiece,
        JPiece,
        LPiece,
    ];

    // remove the given ignore piece (so it doesn't appear again)
    if (ignore) {
        possiblePieces = possiblePieces.filter((piece) => piece !== ignore);
    }

    const choose = getRandomInt(0, possiblePieces.length - 1);

    return possiblePieces[choose];
}
