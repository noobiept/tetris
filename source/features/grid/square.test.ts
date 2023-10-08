import { describe, expect, test, vi } from "vitest";

import { Square } from "./square";

describe("Square", () => {
    test("basic movement", () => {
        const square = new Square({
            color: "red",
        });
        expect(square.getX()).toBe(0);
        expect(square.getY()).toBe(0);

        square.moveRight();
        expect(square.getX()).toBe(Square.size);
        expect(square.getY()).toBe(0);

        square.moveRight();
        expect(square.getX()).toBe(Square.size * 2);
        expect(square.getY()).toBe(0);

        square.moveLeft();
        expect(square.getX()).toBe(Square.size);
        expect(square.getY()).toBe(0);

        square.moveBottom();
        square.moveBottom();
        expect(square.getX()).toBe(Square.size);
        expect(square.getY()).toBe(Square.size * 2);

        square.moveTo(123, 321);
        expect(square.getX()).toBe(123);
        expect(square.getY()).toBe(321);
    });

    test("setting the position", () => {
        const square = new Square({
            color: "red",
        });

        expect(square.getPosition()).toEqual({
            column: -1,
            line: -1,
        });

        const position = {
            column: 1,
            line: 2,
        };
        square.setPosition(position);
        expect(square.getPosition()).toEqual(position);
    });

    test("in stack", () => {
        const square = new Square({
            color: "red",
        });

        expect(square.inStack()).toBe(false);
        expect(square.inStack(true)).toBe(true);
        expect(square.inStack()).toBe(true);
    });

    test("add to container", () => {
        const square = new Square({
            color: "red",
        });
        const container = {
            addChild: vi.fn(),
        } as unknown as createjs.Container;

        square.addTo(container);

        expect(container.addChild).toBeCalled();
    });
});
