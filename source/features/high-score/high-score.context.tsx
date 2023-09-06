import { saveObject } from "@drk4/utilities";
import { createContext, useMemo, useRef } from "react";

import { getData } from "../../core/data";
import { HighScore } from "./high-score";
import { ScoreData } from "./high-score.types";

export type HighScoreContextValue = {
    getScores: () => ScoreData[];
    addScore: (score: ScoreData) => number | undefined;
};

interface HighScoreContextProviderProps {
    children: React.ReactNode;
}

const STORAGE_KEY = "tetris_high_score";

export const HighScoreContext = createContext<HighScoreContextValue>({
    getScores: () => [],
    addScore: () => {
        return undefined;
    },
});

export function HighScoreContextProvider({
    children,
}: HighScoreContextProviderProps) {
    const highScore = useRef<HighScore>(new HighScore(getData(STORAGE_KEY)));

    const value = useMemo(
        () => ({
            addScore: (score: ScoreData) => {
                const position = highScore.current.add(score);
                saveObject(STORAGE_KEY, highScore.current.getHighScores());

                return position;
            },
            getScores: () => highScore.current.getHighScores(),
        }),
        []
    );

    return (
        <HighScoreContext.Provider value={value}>
            {children}
        </HighScoreContext.Provider>
    );
}
