import { atomWithReducer, selectAtom } from "jotai/utils";

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

export const gameTimeAtom = selectAtom(
    gameReducerAtom,
    (game) => game.score.time
);

export const gameScoreAtom = selectAtom(gameReducerAtom, (game) => game.score);

export const gameLevelAtom = selectAtom(gameReducerAtom, (game) => game.level);

export const gameMaxLevelAtom = selectAtom(
    gameReducerAtom,
    (game) => game.maxLevel
);

export const gameMessageAtom = selectAtom(
    gameReducerAtom,
    (game) => game.message
);

export const gameMessageCountAtom = selectAtom(
    gameReducerAtom,
    (game) => game.messageCount
);

export const gamePausedAtom = selectAtom(
    gameReducerAtom,
    (game) => game.paused
);

export const nextPieceAtom = selectAtom(
    gameReducerAtom,
    (game) => game.nextPiece
);
