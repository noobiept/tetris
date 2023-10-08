import { describe, expect, test, vi } from "vitest";

import { Grid, GridPosition } from "./grid";
import { IPiece } from "./piece/all_pieces";
import { Piece } from "./piece/piece";
import { PieceRotation } from "./piece/piece.types";
import { Square } from "./square";

// test if the piece is in the grid or not
function testPiece(
    grid: Grid,
    position: GridPosition,
    rotation: PieceRotation,
    isInGrid: boolean
) {
    const check = (value: unknown) => {
        if (isInGrid) {
            expect(value).not.toBeNull();
        } else {
            expect(value).toBeNull();
        }
    };

    check(grid["grid_array"][position.column][position.line]);

    rotation.forEach((p) => {
        check(
            grid["grid_array"][position.column + p.column][
                position.line + p.line
            ]
        );
    });
}

describe("Grid", () => {
    test("default state", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);

        expect(grid.numberOfColumns).toBe(args.columns);
        expect(grid.numberOfLines).toBe(args.lines + Grid.extraLines);
        expect(grid.width).toBe(
            args.columns * Square.size +
                2 * (Grid.margin + Grid.borderThickness)
        );
        expect(grid.height).toBe(
            (args.lines + Grid.extraLines) * Square.size +
                2 * (Grid.margin + Grid.borderThickness)
        );
    });

    test("adding squares", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);
        const square = new Square({
            color: "red",
        });
        const squarePosition = {
            column: 4,
            line: 5,
        };

        grid.addSquare(square, squarePosition);

        expect(
            grid["grid_array"][squarePosition.column][squarePosition.line]
        ).toBe(square);
    });

    test("adding and removing pieces", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);
        const piece = new Piece(IPiece);
        const position = {
            column: 5,
            line: 5,
        };

        // add the piece
        grid.addPiece(piece, position);

        // check if it was added
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // remove the piece
        grid.clearPiece(piece);

        // check if it was removed
        testPiece(grid, position, IPiece.possibleRotations[0], false);
    });

    test("moving a piece to a different position", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);
        const piece = new Piece(IPiece);
        const position = {
            column: 5,
            line: 5,
        };

        // add the piece
        grid.addPiece(piece, position);
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // move to different location (from current position)
        const nextPosition = {
            column: 0,
            line: 1,
        };
        const moved = grid.movePiece(
            piece,
            nextPosition.column,
            nextPosition.line
        );

        // check if it was moved
        expect(moved).toBe(true);
        testPiece(grid, position, IPiece.possibleRotations[0], false);
        testPiece(
            grid,
            {
                column: position.column + nextPosition.column,
                line: position.line + nextPosition.line,
            },
            IPiece.possibleRotations[0],
            true
        );
    });

    test("moving to an invalid position", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);
        const piece = new Piece(IPiece);
        const position = {
            column: 5,
            line: 5,
        };

        // add the piece
        grid.addPiece(piece, position);
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // try to move to an out of bounds position
        const moved = grid.movePiece(piece, 3, 0);
        expect(moved).toBe(false);
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // add a second piece that is part of the stack
        const piece2 = new Piece(IPiece);
        piece2.markInStack();
        const position2 = {
            column: 5,
            line: 6,
        };

        grid.addPiece(piece2, position2);
        testPiece(grid, position2, IPiece.possibleRotations[0], true);

        // try to move to a position that is already in the stack (shouldn't be possible)
        const moved2 = grid.movePiece(piece, 0, 1);
        expect(moved2).toBe(false);
    });

    test("rotating a piece", () => {
        const args = {
            columns: 10,
            lines: 15,
            addToStage: vi.fn(),
            onLineCleared: vi.fn(),
        };
        const grid = new Grid(args);
        const piece = new Piece(IPiece);
        const position = {
            column: 5,
            line: 5,
        };

        // add the piece
        grid.addPiece(piece, position);
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // rotate to the left
        const rotation1 = piece.getLeftRotation();
        const rotated = grid.rotatePiece(piece, rotation1);

        // check if it was rotated
        expect(rotated).toBe(true);
        testPiece(
            grid,
            position,
            IPiece.possibleRotations[IPiece.possibleRotations.length - 1],
            true
        );

        // rotate to the right
        const rotation2 = piece.getRightRotation();
        const rotated2 = grid.rotatePiece(piece, rotation2);

        // check if it was rotated
        expect(rotated2).toBe(true);
        testPiece(grid, position, IPiece.possibleRotations[0], true);

        // rotate to the right again
        const rotation3 = piece.getRightRotation();
        const rotated3 = grid.rotatePiece(piece, rotation3);

        // check if it was rotated
        expect(rotated3).toBe(true);
        testPiece(grid, position, IPiece.possibleRotations[1], true);
    });
});
