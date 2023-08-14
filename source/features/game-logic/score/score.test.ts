import { describe, expect, test, vi } from "vitest";

import { Score } from "./score";

describe("Score", () => {
    test("Default state", () => {
        const score = new Score({
            onChange: () => {},
        });
        expect(score.getCurrentScore()).toBe(0);
        expect(score.getLinesCleared()).toBe(0);
    });

    test("Score update on line cleared", () => {
        const onChange = vi.fn();
        const score = new Score({
            onChange,
        });

        let scoreCount = 0;
        let linesCleared = 0;

        for (let level = 1; level <= 10; level++) {
            for (let i = 0; i < 10; i++) {
                const returnedLines = score.lineCleared(level);

                scoreCount += 50 * level;
                linesCleared++;

                expect(returnedLines).toBe(linesCleared);
                expect(score.getLinesCleared()).toBe(linesCleared);
                expect(score.getCurrentScore()).toBe(scoreCount);
                expect(onChange).toHaveBeenCalledWith(scoreCount);
            }
        }

        expect(onChange).toHaveBeenCalledTimes(100);
    });

    test("Score reset", () => {
        const onChange = vi.fn();
        const score = new Score({
            onChange,
        });

        expect(score.getCurrentScore()).toBe(0);
        expect(score.getLinesCleared()).toBe(0);

        score.lineCleared(1);

        expect(score.getCurrentScore()).toBe(50);
        expect(score.getLinesCleared()).toBe(1);
        expect(onChange).toHaveBeenCalledWith(50);

        score.reset();

        expect(score.getCurrentScore()).toBe(0);
        expect(score.getLinesCleared()).toBe(0);
        expect(onChange).toHaveBeenCalledWith(0);

        expect(onChange).toHaveBeenCalledTimes(2);
    });

    test("Score decreasing has time passes", () => {
        const onChange = vi.fn();
        const score = new Score({
            onChange,
        });
        const second = 1000;

        expect(score.getCurrentScore()).toBe(0);

        score.timePassed(second);
        expect(score.getCurrentScore()).toBe(-1);
        expect(onChange).toHaveBeenCalledWith(-1);

        score.timePassed(second);
        expect(score.getCurrentScore()).toBe(-2);
        expect(onChange).toHaveBeenCalledWith(-2);

        expect(onChange).toHaveBeenCalledTimes(2);
    });

    test("With multiplier applied", () => {
        const onChange = vi.fn();
        const score = new Score({
            onChange,
        });

        expect(score.getCurrentScore()).toBe(0);
        score.lineCleared(1);
        expect(score.getCurrentScore()).toBe(50);

        score.applyMultipliers({ ghostPiece: true });
        score.lineCleared(1);
        expect(score.getCurrentScore()).toBe(50 + 50 * 0.8);

        score.applyMultipliers({ ghostPiece: false });
        score.lineCleared(1);
        expect(score.getCurrentScore()).toBe(50 + 50 * 0.8 + 50);
    });
});
