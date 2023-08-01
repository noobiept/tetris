import { type ScoreData } from "../high-score";
import { getMaxLevel } from "./game-logic";

export type GameEndData = ScoreData & {
    level: number;
};

type UpdateScoreAction = {
    type: "update-score";
    score: ScoreData;
};

type GameEndAction = {
    type: "end";
    score: GameEndData;
};

type GameRestartAction = {
    type: "restart";
};

type GameQuitAction = {
    type: "quit";
};

type GamePauseAction = {
    type: "pause";
    paused: boolean;
};

type GameMessageAction = {
    type: "message";
    message: string;
};

type UpdateLevelAction = {
    type: "update-level";
    level: number;
    maxLevel: number;
};

export type GameAction =
    | UpdateScoreAction
    | GameEndAction
    | GameQuitAction
    | GamePauseAction
    | GameMessageAction
    | GameRestartAction
    | UpdateLevelAction;

export type GameState = {
    score: ScoreData;
    paused: boolean;
    message: string;
    messageCount: number;
    level: number;
    maxLevel: number;
};

export const initialGameState: GameState = {
    score: {
        score: 0,
        linesCleared: 0,
        time: 0,
    },
    paused: false,
    message: "",
    messageCount: 0,
    level: 1,
    maxLevel: getMaxLevel(),
};

export function gameLogicReducer(state: GameState, action: GameAction) {
    switch (action.type) {
        case "update-score":
            return {
                ...state,
                score: action.score,
            };

        case "pause":
            return {
                ...state,
                paused: action.paused,
            };

        case "message":
            // if its the same message we update the count (to show how many times it triggered)
            if (action.message && state.message === action.message) {
                return {
                    ...state,
                    messageCount: state.messageCount + 1,
                };
            }

            return {
                ...state,
                message: action.message,
                messageCount: 0,
            };

        case "restart":
            return {
                ...initialGameState,
            };

        case "update-level":
            return {
                ...state,
                level: action.level,
                maxLevel: action.maxLevel,
            };
    }

    return state;
}
