import { type PieceArgs } from "../grid";
import { type ScoreData } from "../high-score";
import { getMaxLevel } from "./level";

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

type NextPieceAction = {
    type: "next-piece";
    piece: PieceArgs;
};

export type GameAction =
    | UpdateScoreAction
    | GameEndAction
    | GamePauseAction
    | GameMessageAction
    | GameRestartAction
    | UpdateLevelAction
    | NextPieceAction;

export type GameState = {
    score: ScoreData;
    paused: boolean;
    message: string;
    messageCount: number;
    level: number;
    maxLevel: number;
    nextPiece: PieceArgs | null;
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
    nextPiece: null,
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

        case "next-piece":
            return {
                ...state,
                nextPiece: action.piece,
            };
    }

    return state;
}
