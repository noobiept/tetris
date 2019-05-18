import * as Game from "./game.js";
import Square from "./square.js";
import Piece from "./piece.js";

export interface GridPosition {
    column: number;
    line: number;
}

export interface GridArgs {
    columns: number;
    lines: number;
}

/**
 * Create the grid where the game will be played.
 * Also add a border around the playable area, and have some margin around it.
 */
export default class Grid {
    static margin = 20;
    static borderThickness = 5;
    static extraLines = 2; // we add some extra lines above the grid's specified dimensions to make it possible to rotate the pieces as they are spawned

    numberOfColumns: number;
    numberOfLines: number;
    inner_width: number;
    inner_height: number;
    separation_length: number;
    width: number;
    height: number;
    grid_array: (Square | null)[][];
    container: createjs.Container;

    constructor(args: GridArgs) {
        const numberOfColumns = args.columns;
        const numberOfLines = args.lines + Grid.extraLines;

        this.numberOfColumns = numberOfColumns;
        this.numberOfLines = numberOfLines;

        // the playable area
        this.inner_width = numberOfColumns * Square.size;
        this.inner_height = numberOfLines * Square.size;

        // margin + border
        this.separation_length = Grid.margin + Grid.borderThickness;

        // full width/height (margin + border + inner area + border + margin)
        this.width = 2 * this.separation_length + this.inner_width;
        this.height = 2 * this.separation_length + this.inner_height;

        // tells which squares of the grid are occupied
        this.grid_array = [];

        for (var i = 0; i < numberOfColumns; i++) {
            this.grid_array[i] = [];

            for (var k = 0; k < numberOfLines; k++) {
                this.grid_array[i][k] = null;
            }
        }

        this.container = this.draw();
    }

    /**
     * Draw the grid lines.
     */
    draw() {
        var margin = Grid.margin;
        var thickness = Grid.borderThickness;
        var separation = this.separation_length;
        var innerWidth = this.inner_width;
        var innerHeight = this.inner_height;
        const extraLinesHeight = Grid.extraLines * Square.size;
        const sideLength = innerHeight + 2 * thickness - extraLinesHeight;

        // top line
        var top = new createjs.Shape();

        top.x = separation;
        top.y = separation + extraLinesHeight;

        var g = top.graphics;

        g.beginFill("white");
        g.drawRect(0, -thickness, innerWidth, thickness);

        Game.addToStage(top);

        // bottom line
        var bottom = new createjs.Shape();

        bottom.x = separation;
        bottom.y = separation + innerHeight;

        g = bottom.graphics;

        g.beginFill("white");
        g.drawRect(0, 0, innerWidth, thickness);

        Game.addToStage(bottom);

        // left line
        var left = new createjs.Shape();

        left.x = margin;
        left.y = margin + extraLinesHeight;

        g = left.graphics;

        g.beginFill("white");
        g.drawRect(0, 0, thickness, sideLength);

        Game.addToStage(left);

        // right line
        var right = new createjs.Shape();

        right.x = this.separation_length + innerWidth;
        right.y = margin + extraLinesHeight;

        g = right.graphics;

        g.beginFill("white");
        g.drawRect(0, 0, thickness, sideLength);

        Game.addToStage(right);

        // container
        var container = new createjs.Container();

        container.x = 0;
        container.y = 0;

        Game.addToStage(container);

        return container;
    }

    /**
     * Add a square to the grid, given it column/line position.
     */
    addSquare(square: Square, position: GridPosition, addToGrid = true) {
        const column = position.column;
        const line = position.line;

        if (addToGrid) {
            this.grid_array[column][line] = square;
            square.setPosition(position);
        }

        square.moveTo(
            this.separation_length + column * Square.size,
            this.separation_length + line * Square.size
        );
    }

    /**
     * Remove a piece from the grid.
     */
    clearPiece(piece: Piece) {
        const all = piece.all_squares;

        for (let i = 0; i < all.length; i++) {
            const square = all[i];
            const position = square.getPosition();

            this.grid_array[position.column][position.line] = null;
        }
    }

    /**
     * Add a piece to the grid.
     */
    addPiece(piece: Piece, position: GridPosition, addToGrid = true) {
        var other = piece.other_squares;
        var pivot = piece.pivot_square;
        var currentRotation = piece.getCurrentRotation();

        this.addSquare(pivot, position, addToGrid);

        for (let a = 0; a < currentRotation.length; a++) {
            const rotation = currentRotation[a];
            const square = other[a];
            const newPosition = {
                column: position.column + rotation.column,
                line: position.line + rotation.line,
            };

            this.addSquare(square, newPosition, addToGrid);
        }
    }

    /**
     * Move a piece to a different position.
     * Moves 'columnMove/lineMove' from the current position.
     */
    movePiece(piece: Piece, columnMove: number, lineMove: number) {
        var all = piece.all_squares;
        var pivot = piece.pivot_square;

        // check if we can move the piece
        for (let a = 0; a < all.length; a++) {
            const square = all[a];
            const position = square.getPosition();
            const nextColumn = position.column + columnMove;
            const nextLine = position.line + lineMove;

            // check if we're not at the grid's limits
            if (
                nextColumn < 0 ||
                nextColumn >= this.numberOfColumns ||
                nextLine < 0 ||
                nextLine >= this.numberOfLines
            ) {
                return false;
            }

            // check if it doesn't collide with the stacked squares
            var nextSquare = this.grid_array[nextColumn][nextLine];

            if (nextSquare && nextSquare.isInStack) {
                return false;
            }
        }

        const pivotPosition = pivot.getPosition();
        const newPosition = {
            column: pivotPosition.column + columnMove,
            line: pivotPosition.line + lineMove,
        };

        // clear the previous position
        this.clearPiece(piece);
        this.addPiece(piece, newPosition);

        return true;
    }

    /**
     * Rotate a piece to the next rotation.
     */
    rotatePiece(piece: Piece, nextRotationPosition: number) {
        const nextRotation = piece.args.possibleRotations[nextRotationPosition];
        const pivot = piece.pivot_square;
        const pivotPosition = pivot.getPosition();

        // check if you can rotate the piece
        for (let a = 0; a < nextRotation.length; a++) {
            const position = nextRotation[a];
            const column = pivotPosition.column + position.column;
            const line = pivotPosition.line + position.line;

            // check if its within the grid's limits
            if (
                column < 0 ||
                column >= this.numberOfColumns ||
                line < 0 ||
                line >= this.numberOfLines
            ) {
                return false;
            }

            var square = this.grid_array[column][line];

            if (square && square.isInStack) {
                return false;
            }
        }

        this.clearPiece(piece);
        piece.current_rotation = nextRotationPosition;
        this.addPiece(piece, pivotPosition);

        return true;
    }

    /**
     * Check for any completed line.
     */
    checkClearedLines() {
        var line, column;
        var square;

        // go through all the lines, starting from the bottom
        for (line = this.numberOfLines - 1; line >= 0; line--) {
            // and through all the columns
            for (column = 0; column < this.numberOfColumns; column++) {
                square = this.grid_array[column][line];

                // check if there's a square in each column position
                if (!square) {
                    break;
                }
            }

            // means the loop passed through all the columns (so, the line contains all the squares filled)
            if (column === this.numberOfColumns) {
                this.clearLine(line);

                // since we're removing one line (and everything above goes one line below), we need to check the same line again
                line += 1;
            }
        }
    }

    /**
     * There's a line completed with squares in all positions.
     * We remove that line, and move what was on top of it 1 line down.
     */
    clearLine(clearedLine: number) {
        var square;
        var column, line;

        for (column = 0; column < this.numberOfColumns; column++) {
            square = this.grid_array[column][clearedLine];

            // we should have a complete line in this point?...
            if (square) {
                square.remove();
                this.grid_array[column][clearedLine] = null;
            }
        }

        // move the stacked squares 1 square below
        for (column = 0; column < this.numberOfColumns; column++) {
            for (line = clearedLine - 1; line >= 0; line--) {
                square = this.grid_array[column][line];

                if (square && square.isInStack) {
                    square.moveBottom();

                    this.grid_array[column][line + 1] = this.grid_array[column][
                        line
                    ];

                    this.grid_array[column][line] = null;
                }
            }
        }

        Game.oneMoreClearedLine();
    }

    /**
     * Find the last/bottom position this piece can be at, before it reaches the stack or the bottom of the grid.
     */
    findLastPossiblePosition(piece: Piece) {
        const pivotPosition = piece.pivot_square.getPosition();
        let count = 0; // how far we gone down
        let positions = piece.all_squares.map((square) => {
            return square.getPosition();
        });
        let stop = false;

        while (!stop) {
            for (let a = 0; a < positions.length; a++) {
                const position = positions[a];
                const nextLine = position.line + count + 1;
                const nextSquare = this.grid_array[position.column][nextLine];

                // check if we're not past the grid's limits
                // we're only changing the line value, so don't need to check for columns
                if (nextLine < 0 || nextLine >= this.numberOfLines) {
                    stop = true;
                    break;
                }

                // check if
                if (nextSquare && nextSquare.isInStack) {
                    stop = true;
                    break;
                }
            }

            if (!stop) {
                count++;
            }
        }

        return {
            column: pivotPosition.column,
            line: pivotPosition.line + count,
        };
    }
}
