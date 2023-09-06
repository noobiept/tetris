import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

import {
    GameAction,
    gameLogicReducer,
    GameState,
    initialGameState,
} from "./game-logic.reducer";

export const gameReducerAtom = atomWithReducer<GameState, GameAction>(
    initialGameState,
    gameLogicReducer
);

export const gameTimeAtom = atom((get) => get(gameReducerAtom).score.time);

export const gameScoreAtom = atom((get) => get(gameReducerAtom).score);

export const gameLevelAtom = atom((get) => get(gameReducerAtom).level);

export const gameMaxLevelAtom = atom((get) => get(gameReducerAtom).maxLevel);

export const gameMessageAtom = atom((get) => get(gameReducerAtom).message);

export const gameMessageCountAtom = atom(
    (get) => get(gameReducerAtom).messageCount
);

export const gamePausedAtom = atom((get) => get(gameReducerAtom).paused);

export const nextPieceAtom = atom((get) => get(gameReducerAtom).nextPiece);
