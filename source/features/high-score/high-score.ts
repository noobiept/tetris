import { ScoreData } from "./high-score.types";

export class HighScore {
    private scores: ScoreData[] = []; // sorted by the 'score' property
    private maxScores = 10;

    /**
     * Load the given high-scores.
     */
    constructor(scores: ScoreData[] | undefined | null) {
        if (scores) {
            this.scores = scores;
        }
    }

    /**
     * Try to add a score to the high-score list. Its only added if there's an empty spot or if the new score is higher than existing ones.
     * If a score was actually added, it returns the position in the high-score list.
     */
    add(score: ScoreData) {
        let added = false;

        // haven't reached the limit yet, so just add the score
        if (this.scores.length < this.maxScores) {
            this.scores.push(score);
            added = true;
        }

        // delete an existing score if this score happens to be better than the worse score saved so far
        else {
            const worseScore = this.scores[this.scores.length - 1];

            if (worseScore.score < score.score) {
                this.scores.pop();
                this.scores.push(score);
                added = true;
            }
        }

        if (added) {
            this.scores.sort((a, b) => {
                return b.score - a.score;
            });

            // find the position of the score in the list
            for (let a = 0; a < this.scores.length; a++) {
                if (this.scores[a].score === score.score) {
                    return a + 1;
                }
            }
        }
    }

    /**
     * Get the high-scores list.
     */
    getHighScores() {
        return this.scores;
    }
}
