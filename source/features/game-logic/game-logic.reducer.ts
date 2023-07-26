type UpdateScoreAction = {
    type: "update-score";
    score: number;
};

type GameEndAction = {
    type: "end";
};

type GameQuitAction = {
    type: "quit";
};

type GamePauseAction = {
    type: "pause";
    paused: boolean;
};

export type GameAction =
    | UpdateScoreAction
    | GameEndAction
    | GameQuitAction
    | GamePauseAction;

export type GameState = {
    score: number;
    paused: boolean;
};

export function gameLogicReducer(state: GameState, action: GameAction) {
    console.log("gameLogicReducer", action);
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
    }

    return state;
}
