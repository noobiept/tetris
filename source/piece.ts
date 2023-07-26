import Square from "./square";
import { PieceRotation } from "./all_pieces";

export interface PieceArgs {
    color: string;
    pivotColor: string;
    possibleRotations: PieceRotation[];
}

/**
 * Base class for all the pieces.
 */
export default class Piece {
    private args: PieceArgs;
    private current_rotation: number;
    private all_squares: Square[];
    private pivot_square: Square;
    private other_squares: Square[];

    constructor(args: PieceArgs) {
        const color = args.color;

        const pivot = new Square({
            color: args.pivotColor,
        });
        const square1 = new Square({
            color: color,
        });
        const square2 = new Square({
            color: color,
        });
        const square3 = new Square({
            color: color,
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
        for (let a = 0; a < this.all_squares.length; a++) {
            const square = this.all_squares[a];
            square.addTo(container);
        }
    }

    /**
     * Position a piece in a given x/y position (unrelated to the grid).
     */
    positionIn(x: number, y: number) {
        const pivot = this.pivot_square;
        const other = this.other_squares;
        const currentRotation = this.getCurrentRotationInfo();

        pivot.moveTo(x, y);

        for (let a = 0; a < currentRotation.length; a++) {
            const rotation = currentRotation[a];
            const square = other[a];

            square.moveTo(
                x + rotation.column * Square.size,
                y + rotation.line * Square.size
            );
        }
    }

    /**
     * Get the current rotation of this piece (where the squares are positioned around the pivot).
     */
    getCurrentRotationInfo() {
        return this.args.possibleRotations[this.current_rotation];
    }

    /**
     * Return the current rotation index.
     */
    getRotation() {
        return this.current_rotation;
    }

    /**
     * Change the current rotation to a new value.
     */
    setRotation(index: number) {
        this.current_rotation = index;
    }

    /**
     * Return the next left rotation (anti-clockwise).
     */
    getLeftRotation() {
        let nextPosition = this.current_rotation - 1;

        if (nextPosition < 0) {
            nextPosition = this.args.possibleRotations.length - 1;
        }

        return {
            index: nextPosition,
            rotation: this.args.possibleRotations[nextPosition],
        };
    }

    /**
     * Return the next right rotation (clockwise).
     */
    getRightRotation() {
        let nextPosition = this.current_rotation + 1;

        if (nextPosition >= this.args.possibleRotations.length) {
            nextPosition = 0;
        }

        return {
            index: nextPosition,
            rotation: this.args.possibleRotations[nextPosition],
        };
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

    /**
     * Mark the piece as part of the stack.
     */
    markInStack() {
        for (let a = 0; a < this.all_squares.length; a++) {
            const square = this.all_squares[a];
            square.inStack(true);
        }
    }

    /**
     * Get the current position of the pivot square.
     */
    getPivotPosition() {
        return this.pivot_square.getPosition();
    }

    /**
     * Get a list with all the square positions.
     */
    getAllPositions() {
        return this.all_squares.map((square) => {
            return square.getPosition();
        });
    }

    /**
     * Return the pivot square.
     */
    getPivotSquare() {
        return this.pivot_square;
    }

    /**
     * Return the other squares (apart from the pivot).
     */
    getOtherSquares() {
        return this.other_squares;
    }
}
