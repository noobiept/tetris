export interface ScoreArgs {
    onChange: (score: number) => void;
}

export class Score {
    private score = 0;
    private args: ScoreArgs;

    constructor(args: ScoreArgs) {
        this.args = args;
    }

    lineCleared(level: number) {
        this.score += 50 * level;
        this.args.onChange(this.score);
    }

    timePassed(milliseconds: number) {
        const score = this.score - milliseconds / 1000;
        const round = Math.round(score * 100) / 100;

        this.score = round;
        this.args.onChange(this.score);
    }

    reset() {
        this.score = 0;
        this.args.onChange(0);
    }

    getCurrentScore() {
        return this.score;
    }
}
