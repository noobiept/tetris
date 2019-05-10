import Piece from "./piece.js";

export interface SquareArgs {
    color: string;
    isPartOfPiece: (piece: Piece) => boolean;
}

/**
 * Represents a square of the grid.
 * A piece will be composed of several squares.
 */
export default class Square {
    static size = 20;

    isInStack: boolean;
    column: number;
    line: number;
    private shape: createjs.Shape;
    private args: SquareArgs;

    constructor(args: SquareArgs) {
        // width/height
        var size = Square.size;
        var shape = new createjs.Shape();

        var g = shape.graphics;

        g.beginFill(args.color);
        g.drawRoundRect(0, 0, size, size, 2);

        this.args = args;
        this.isInStack = false;
        this.shape = shape;
        this.column = -1;
        this.line = -1;
    }

    isPartOfPiece(piece: Piece) {
        return this.args.isPartOfPiece(piece);
    }

    /**
     * Get the current x position.
     */
    getX() {
        return this.shape.x;
    }

    /**
     * Get the current y position.
     */
    getY() {
        return this.shape.y;
    }

    /**
     * Move the square to the left position.
     */
    moveLeft() {
        this.shape.x -= Square.size;
    }

    /**
     * Move the square to the right position.
     */
    moveRight() {
        this.shape.x += Square.size;
    }

    /**
     * Move the square to the bottom position.
     */
    moveBottom() {
        this.shape.y += Square.size;
    }

    /**
     * Move to the given position.
     */
    moveTo(x: number, y: number) {
        this.shape.x = x;
        this.shape.y = y;
    }

    /**
     * Add the `shape` to the given container.
     */
    addTo(container: createjs.Container) {
        container.addChild(this.shape);
    }

    /**
     * Remove the `shape` from the stage.
     */
    remove() {
        const parent = this.shape.parent;

        if (parent) {
            parent.removeChild(this.shape);
        }
    }

    getPosition() {
        return {
            column: this.column,
            line: this.line,
        };
    }
}
