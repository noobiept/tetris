import * as Game from "./game.js";
import Square from "./square.js";

export interface PieceArgs {
    color: string;
    pivotColor: string;
    possibleRotations: { column: number; line: number }[][];
}

/**
 * Base class for all the pieces.
 */
export default class Piece {
    args: PieceArgs;
    current_rotation: number;
    all_squares: Square[];
    pivot_square: Square;
    other_squares: Square[];

    constructor(args: PieceArgs) {
        const color = args.color;
        const isPartOfPiece = (piece: Piece) => {
            return piece === this;
        };

        var pivot = new Square({
            color: args.pivotColor,
            isPartOfPiece: isPartOfPiece,
        });
        var square1 = new Square({
            color: color,
            isPartOfPiece: isPartOfPiece,
        });
        var square2 = new Square({
            color: color,
            isPartOfPiece: isPartOfPiece,
        });
        var square3 = new Square({
            color: color,
            isPartOfPiece: isPartOfPiece,
        });

        this.args = args;
        this.current_rotation = 0;
        this.all_squares = [square1, square2, square3, pivot];
        this.pivot_square = pivot;
        this.other_squares = [square1, square2, square3];
    }

    /**
     * Add the piece squares to a container (can be the grid container element, or other element if its positioned outside of the grid).
     */
    addToContainer(container: createjs.Container) {
        for (var a = 0; a < this.all_squares.length; a++) {
            const square = this.all_squares[a];
            square.addTo(container);
        }
    }

    /**
     * Position a piece in a given x/y position (unrelated to the grid).
     */
    positionIn(x: number, y: number) {
        var pivot = this.pivot_square;
        var other = this.other_squares;
        var currentRotation = this.getCurrentRotation();

        pivot.moveTo(x, y);

        for (var a = 0; a < currentRotation.length; a++) {
            var rotation = currentRotation[a];
            var square = other[a];

            square.moveTo(
                x + rotation.column * Square.size,
                y + rotation.line * Square.size
            );
        }
    }

    /**
     * Get the current rotation of this piece (where the squares are positioned around the pivot).
     */
    getCurrentRotation() {
        return this.args.possibleRotations[this.current_rotation];
    }

    /**
     * Rotate this piece to the left (anti-clockwise).
     */
    rotateLeft() {
        var nextPosition = this.current_rotation - 1;

        if (nextPosition < 0) {
            nextPosition = this.args.possibleRotations.length - 1;
        }

        var rotated = Game.getGrid().rotatePiece(this, nextPosition);

        if (rotated === false) {
            Game.showMessage("Couldn't rotate left!");
        } else {
            Game.clearMessage();
        }
    }

    /**
     * Rotate this piece to the right (clockwise).
     */
    rotateRight() {
        var nextPosition = this.current_rotation + 1;

        if (nextPosition >= this.args.possibleRotations.length) {
            nextPosition = 0;
        }

        var rotated = Game.getGrid().rotatePiece(this, nextPosition);

        if (rotated === false) {
            Game.showMessage("Couldn't rotate right!");
        } else {
            Game.clearMessage();
        }
    }

    /**
     * Remove this piece from the game.
     */
    remove() {
        for (let a = 0; a < this.all_squares.length; a++) {
            const square = this.all_squares[a];
            square.remove();
        }

        this.all_squares.length = 0;
        this.other_squares.length = 0;
    }
}
