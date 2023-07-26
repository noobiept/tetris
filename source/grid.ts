import Square from "./square";
import Piece from "./piece";
import { PieceRotation } from "./all_pieces";

export interface GridPosition {
    column: number;
    line: number;
}

export interface GridArgs {
    columns: number;
    lines: number;
    addToStage: (element: createjs.DisplayObject) => void;
    onLineCleared: () => void;
}

/**
 * Create the grid where the game will be played.
 * Also add a border around the playable area, and have some margin around it.
 */
export default class Grid {
    static margin = 20;
    static borderThickness = 5;
    static extraLines = 2; // we add some extra lines above the grid's specified dimensions to make it possible to rotate the pieces as they are spawned

    readonly width: number;
    readonly height: number;
    readonly numberOfColumns: number;
    readonly numberOfLines: number;

    private inner_width: number;
    private inner_height: number;
    private separation_length: number;
    private grid_array: (Square | null)[][];
    private piecesContainer!: createjs.Container;
    private onLineCleared: () => void;

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

        for (let i = 0; i < numberOfColumns; i++) {
            this.grid_array[i] = [];

            for (let k = 0; k < numberOfLines; k++) {
                this.grid_array[i][k] = null;
            }
        }

        this.onLineCleared = args.onLineCleared;
        this.draw(args.addToStage);
    }

    /**
     * Draw the grid lines.
     */
    draw(addToStage: (element: createjs.DisplayObject) => void) {
        const margin = Grid.margin;
        const thickness = Grid.borderThickness;
        const separation = this.separation_length;
        const innerWidth = this.inner_width;
        const innerHeight = this.inner_height;
        const extraLinesHeight = Grid.extraLines * Square.size;
        const sideLength = innerHeight + 2 * thickness - extraLinesHeight;

        // top background
        const background = new createjs.Shape();
        background.x = 0;
        background.y = 0;

        let g = background.graphics;
        g.beginFill("black");
        g.drawRect(0, 0, this.width, margin + extraLinesHeight);

        // top line
        const top = new createjs.Shape();
        top.x = separation;
        top.y = separation + extraLinesHeight;

        g = top.graphics;
        g.beginFill("white");
        g.drawRect(0, -thickness, innerWidth, thickness);

        // bottom line
        const bottom = new createjs.Shape();
        bottom.x = separation;
        bottom.y = separation + innerHeight;

        g = bottom.graphics;
        g.beginFill("white");
        g.drawRect(0, 0, innerWidth, thickness);

        // left line
        const left = new createjs.Shape();
        left.x = margin;
        left.y = margin + extraLinesHeight;

        g = left.graphics;
        g.beginFill("white");
        g.drawRect(0, 0, thickness, sideLength);

        // right line
        const right = new createjs.Shape();
        right.x = this.separation_length + innerWidth;
        right.y = margin + extraLinesHeight;

        g = right.graphics;
        g.beginFill("white");
        g.drawRect(0, 0, thickness, sideLength);

        // container
        const container = new createjs.Container();
        container.x = 0;
        container.y = 0;

        const piecesContainer = new createjs.Container();
        piecesContainer.x = 0;
        piecesContainer.y = 0;

        container.addChild(piecesContainer);
        container.addChild(background);
        container.addChild(top);
        container.addChild(bottom);
        container.addChild(left);
        container.addChild(right);

        this.piecesContainer = piecesContainer;

        addToStage(container);
    }

    /**
     * Add a piece to the grid's container.
     */
    addToContainer(piece: Piece) {
        piece.addToContainer(this.piecesContainer);
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
        const positions = piece.getAllPositions();

        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            this.grid_array[position.column][position.line] = null;
        }
    }

    /**
     * Add a piece to the grid.
     */
    addPiece(piece: Piece, position: GridPosition, addToGrid = true) {
        const other = piece.getOtherSquares();
        const pivot = piece.getPivotSquare();
        const currentRotation = piece.getCurrentRotationInfo();

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
        const positions = piece.getAllPositions();
        const pivotPosition = piece.getPivotPosition();

        // check if we can move the piece
        for (let a = 0; a < positions.length; a++) {
            const position = positions[a];
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
            const nextSquare = this.grid_array[nextColumn][nextLine];

            if (nextSquare && nextSquare.inStack()) {
                return false;
            }
        }

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
    rotatePiece(
        piece: Piece,
        nextRotation: { index: number; rotation: PieceRotation }
    ) {
        const pivotPosition = piece.getPivotPosition();
        const rotationInfo = nextRotation.rotation;

        // check if you can rotate the piece
        for (let a = 0; a < rotationInfo.length; a++) {
            const position = rotationInfo[a];
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

            const square = this.grid_array[column][line];

            if (square && square.inStack()) {
                return false;
            }
        }

        this.clearPiece(piece);
        piece.setRotation(nextRotation.index);
        this.addPiece(piece, pivotPosition);

        return true;
    }

    /**
     * Check for any completed line.
     */
    checkClearedLines() {
        let line, column;
        let square;

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
        let square;
        let column, line;

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

                if (square && square.inStack()) {
                    square.moveBottom();

                    this.grid_array[column][line + 1] =
                        this.grid_array[column][line];

                    this.grid_array[column][line] = null;
                }
            }
        }

        this.onLineCleared();
    }

    /**
     * Find the last/bottom position this piece can be at, before it reaches the stack or the bottom of the grid.
     */
    findLastPossiblePosition(piece: Piece) {
        const pivotPosition = piece.getPivotPosition();
        let count = 0; // how far we gone down
        const positions = piece.getAllPositions();
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
                if (nextSquare && nextSquare.inStack()) {
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

    /**
     * Check if the given piece rotation collides with other squares in the grid.
     */
    collideWithStack(pivotPosition: GridPosition, rotation: PieceRotation) {
        const pivotColumn = pivotPosition.column;
        const pivotLine = pivotPosition.line;

        // check the pivot position
        if (this.grid_array[pivotColumn][pivotLine]) {
            return true;
        }

        // check the other positions
        for (let a = 0; a < rotation.length; a++) {
            const column = pivotColumn + rotation[a].column;
            const line = pivotLine + rotation[a].line;
            const square = this.grid_array[column][line];

            if (square) {
                return true;
            }
        }

        return false;
    }
}
