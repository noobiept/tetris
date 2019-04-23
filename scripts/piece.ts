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
        var color = args.color;

        var pivot = new Square({ piece: this, color: args.pivotColor });
        var square1 = new Square({ piece: this, color: color });
        var square2 = new Square({ piece: this, color: color });
        var square3 = new Square({ piece: this, color: color });

        this.args = args;
        this.current_rotation = 0;
        this.all_squares = [square1, square2, square3, pivot];
        this.pivot_square = pivot;
        this.other_squares = [square1, square2, square3];
    }

    /**
     * Add the piece squares to a container (can be the grid container element, or other element if its positioned outside of the grid).
     */
    addToContainer(container) {
        for (var a = 0; a < this.all_squares.length; a++) {
            container.addChild(this.all_squares[a].shape);
        }
    }

    /**
     * Position a piece in a given x/y position (unrelated to the grid).
     */
    positionIn(x, y) {
        var pivot = this.pivot_square;
        var other = this.other_squares;
        var currentRotation = this.getCurrentRotation();

        pivot.shape.x = x;
        pivot.shape.y = y;

        for (var a = 0; a < currentRotation.length; a++) {
            var rotation = currentRotation[a];
            var square = other[a];

            square.shape.x = x + rotation.column * Square.size;
            square.shape.y = y + rotation.line * Square.size;
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
     * Move this piece downward continuously until it reaches either the stack, or the bottom of the grid.
     */
    hardDrop() {
        var grid = Game.getGrid();

        // move the piece bottom continuously until it can't move anymore
        while (grid.movePiece(this, 0, 1)) {
            // empty
        }
    }

    /**
     * Remove this piece from the game.
     */
    remove() {
        var parent = this.pivot_square.shape.parent;
        var all = this.all_squares;

        // check if it is currently part of the canvas/stage
        if (parent) {
            for (var a = 0; a < all.length; a++) {
                parent.removeChild(all[a].shape);
            }
        }

        this.all_squares.length = 0;
        this.pivot_square = null;
        this.other_squares.length = 0;
    }
}
