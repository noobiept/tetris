import {
    Dispatch,
    Reducer,
    ReducerAction,
    ReducerState,
    useReducer,
} from "react";

// useReducer with middleware
export function useReducerWM<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    middleware?: (action: ReducerAction<R>, state: ReducerState<R>) => void
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchUsingMiddleware = (action: ReducerAction<R>) => {
        middleware?.(action, state);
        dispatch(action);
    };

    return [state, dispatchUsingMiddleware];
}
