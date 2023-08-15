import { GridPosition } from "./grid";

export interface SquareArgs {
    color: string;
}

/**
 * Represents a square of the grid.
 * A piece will be composed of several squares.
 */
export class Square {
    static size = 20;

    private isInStack: boolean;
    private position: GridPosition;
    private shape: createjs.Shape;

    constructor(args: SquareArgs) {
        // width/height
        const size = Square.size;
        const shape = new createjs.Shape();

        const g = shape.graphics;

        g.beginFill(args.color);
        g.drawRoundRect(0, 0, size, size, 2);

        this.isInStack = false;
        this.shape = shape;
        this.position = {
            column: -1,
            line: -1,
        };
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

    /**
     * Set a new position in the grid for this square.
     */
    setPosition(position: GridPosition) {
        this.position = position;
    }

    /**
     * Get the current square position in the grid.
     */
    getPosition() {
        return { ...this.position };
    }

    inStack(newValue?: boolean) {
        if (typeof newValue === "boolean") {
            this.isInStack = newValue;
        }

        return this.isInStack;
    }
}
