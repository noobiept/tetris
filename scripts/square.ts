import Piece from "./piece.js";

/**
 * Represents a square of the grid.
 * A piece will be composed of several squares.
 */
export default class Square {
    static size = 20;

    isInStack: boolean;
    shape: createjs.Shape;
    column: number;
    line: number;
    pieceObject: Piece;

    constructor(pieceObject, color) {
        // width/height
        var size = Square.size;
        var shape = new createjs.Shape();

        var g = shape.graphics;

        g.beginFill(color);
        g.drawRoundRect(0, 0, size, size, 2);

        this.isInStack = false;
        this.shape = shape;
        this.column = -1;
        this.line = -1;
        this.pieceObject = pieceObject;
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
}
