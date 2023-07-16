export interface ScoreArgs {
    onChange: (score: number) => void;
}

export default class Score {
    private score = 0;
    private multiplier = 1;
    private args: ScoreArgs;

    constructor(args: ScoreArgs) {
        this.args = args;
    }

    lineCleared(level: number) {
        this.score += 50 * level * this.multiplier;
        this.args.onChange(this.score);
    }

    timePassed(milliseconds: number) {
        const score = this.score - milliseconds / 1000;
        const round = Math.round(score * 100) / 100;

        this.score = round;
        this.args.onChange(this.score);
    }

    /**
     * The score multiplier reduces the normal score gain in the game, based on the options that are currently set.
     */
    updateMultiplier(ghostPiece: boolean) {
        if (ghostPiece) {
            this.multiplier = 0.8;
        } else {
            this.multiplier = 1;
        }
    }

    reset() {
        this.score = 0;
        this.args.onChange(0);
    }

    getCurrentScore() {
        return this.score;
    }
}
