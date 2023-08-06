import { useEffect, useState } from "react";
import { ScoreData, getHighScores } from "./high-score";

export function useHighScore() {
    const [scores, setScores] = useState<ScoreData[]>([]);

    useEffect(() => {
        const initialScores = getHighScores();
        setScores(initialScores);
    }, []);

    return {
        scores,
    };
}
