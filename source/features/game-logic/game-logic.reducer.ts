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

type GameMessageAction = {
    type: "message";
    message: string;
};

export type GameAction =
    | UpdateScoreAction
    | GameEndAction
    | GameQuitAction
    | GamePauseAction
    | GameMessageAction;

export type GameState = {
    score: number;
    paused: boolean;
    message: string;
    messageCount: number;
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
    }

    return state;
}
