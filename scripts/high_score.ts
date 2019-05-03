export interface ScoreData {
    score: number;
    linesCleared: number;
    time: number;
}

let SCORES: ScoreData[] = []; // sorted by the 'score' property
const MAX_SCORES = 10;

/**
 * Load the given high-scores.
 */
export function load(scores?: ScoreData[]) {
    if (scores) {
        SCORES = scores;
    }
}

/**
 * Try to add a score to the high-score list. Its only added if there's an empty spot or if the new score is higher than existing ones.
 * Returns wether the score was actually added or not.
 */
export function add(score: ScoreData) {
    let added = false;

    // haven't reached the limit yet, so just add the score
    if (SCORES.length < MAX_SCORES) {
        SCORES.push(score);
        added = true;
    }

    // delete an existing score if this score happens to be better than the worse score saved so far
    else {
        const worseScore = SCORES[SCORES.length - 1];

        if (worseScore.score < score.score) {
            SCORES.pop();
            SCORES.push(score);
            added = true;
        }
    }

    if (added) {
        SCORES.sort((a, b) => {
            return a.score - b.score;
        });
    }

    return added;
}

/**
 * Get the high-scores list.
 */
export function getHighScores() {
    return SCORES;
}
