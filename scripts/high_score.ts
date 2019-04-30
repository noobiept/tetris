export class Score {
    private score = 0;

    lineCleared(level: number) {
        this.score += 100 * level;
    }

    timePassed(milliseconds: number) {
        this.score -= milliseconds / 1000;
    }

    getCurrentScore() {
        return Math.round(this.score);
    }
}
