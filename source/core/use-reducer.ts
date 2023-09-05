import {
    Dispatch,
    Reducer,
    ReducerAction,
    ReducerState,
    useCallback,
    useReducer,
} from "react";

// useReducer with middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReducerWM<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    middleware?: (
        action: ReducerAction<R>,
        state: ReducerState<R>,
        dispatch: Dispatch<ReducerAction<R>>
    ) => void
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchUsingMiddleware = useCallback((action: ReducerAction<R>) => {
        middleware?.(action, state, dispatch);
        dispatch(action);
    }, []);

    return [state, dispatchUsingMiddleware];
}
