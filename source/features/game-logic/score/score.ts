export interface ScoreArgs {
    onChange: (score: number) => void;
}

export interface ScoreMultipliers {
    ghostPiece: boolean;
}

export class Score {
    private score = 0;
    private multiplier = 1;
    private args: ScoreArgs;
    private linesCleared = 0; // number of cleared lines so far (count)

    constructor(args: ScoreArgs) {
        this.args = args;
    }

    lineCleared(level: number) {
        this.linesCleared++;
        this.score += 50 * level * this.multiplier;
        this.args.onChange(this.score);

        return this.linesCleared;
    }

    timePassed(milliseconds: number) {
        const score = this.score - milliseconds / 1000;
        const round = Math.round(score * 100) / 100;

        this.score = round;
        this.args.onChange(this.score);
    }

    /**
     * Change the normal score gain based on game modifiers.
     * For example showing the ghost-piece reduces the score gained per line cleared.
     */
    applyMultipliers({ ghostPiece }: ScoreMultipliers) {
        if (ghostPiece) {
            this.multiplier = 0.8;
        } else {
            this.multiplier = 1;
        }
    }

    reset() {
        this.score = 0;
        this.linesCleared = 0;
        this.args.onChange(0);
    }

    getCurrentScore() {
        return this.score;
    }

    getLinesCleared() {
        return this.linesCleared;
    }
}
