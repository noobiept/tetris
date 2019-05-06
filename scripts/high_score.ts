import * as AppStorage from "./app_storage.js";

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
 * If a score was actually added, it returns the position in the high-score list.
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
            return b.score - a.score;
        });
        save();

        // find the position of the score in the list
        for (let a = 0; a < SCORES.length; a++) {
            if (SCORES[a].score === score.score) {
                return a + 1;
            }
        }
    }
}

/**
 * Get the high-scores list.
 */
export function getHighScores() {
    return SCORES;
}

/**
 * Save the current high-scores to the storage.
 */
function save() {
    AppStorage.setData({
        tetris_high_score: SCORES,
    });
}
