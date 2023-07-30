import { useEffect, useState } from "react";
import { ScoreData, load } from "./high-score";

export function useHighScore() {
    const [scores, setScores] = useState<ScoreData[]>([]);

    useEffect(() => {
        const initialScores = load();
        setScores(initialScores);
    }, []);

    return {
        scores,
    };
}
