import { timeToString } from "@drk4/utilities";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoutePath } from "../../core/routes";
import { useReducerWM } from "../../core/use-reducer";
import { CanvasDimensions } from "../../features/canvas";
import { DialogContext } from "../../features/dialog";
import {
    GameAction,
    GameEndData,
    GameLogic,
    gameLogicReducer,
    initialGameState,
} from "../../features/game-logic";
import { HighScoreContext } from "../../features/high-score";
import { OptionsContext } from "../../features/options";
import { useStage } from "../../features/stage";
import { cardinalToOrdinal } from "../../utilities";

export function useGameLogic() {
    const navigate = useNavigate();
    const { stageRef, stageActions } = useStage();
    const gameRef = useRef<GameLogic | undefined>();

    const [dimensions, setDimensions] = useState<CanvasDimensions>({
        width: 600,
        height: 450,
    });
    const { openDialog, closeDialog } = useContext(DialogContext);
    const { getOption } = useContext(OptionsContext);
    const { addScore } = useContext(HighScoreContext);

    const middleware = useCallback((action: GameAction) => {
        if (!gameRef.current) {
            return;
        }

        const onEnd = (data: GameEndData) => {
            const added = addScore(data);
            const endMessage = [
                `Level: ${data.level}`,
                `Lines cleared: ${data.linesCleared}`,
                `Time: ${timeToString({ time: data.time })}`,
                `Score: ${data.score} ${
                    added ? `(${cardinalToOrdinal(added)})` : ""
                }`,
            ];

            openDialog({
                title: "Game Over!",
                body: endMessage,
                onClose: () => {
                    closeDialog();
                    dispatch({ type: "restart" });
                },
            });
        };

        switch (action.type) {
            case "end":
                dispatch({ type: "pause", paused: true });
                onEnd(action.score);
                break;

            case "pause":
                gameRef.current.setPaused(action.paused);
                break;

            case "restart":
                stageActions.clean();
                gameRef.current.start();
                gameRef.current.setPaused(false);
                break;
        }
    }, []);
    const [game, dispatch] = useReducerWM(
        gameLogicReducer,
        initialGameState,
        middleware
    );

    useEffect(() => {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        gameRef.current = new GameLogic({ stageActions, dispatch, getOption });

        const updatedDimensions = gameRef.current.start();
        setDimensions(updatedDimensions);

        return () => {
            gameRef.current?.clear();
        };
    }, [stageRef.current]);

    const onQuit = () => {
        addScore(game.score);
        gameRef.current?.clear();

        navigate(RoutePath.home);
    };
    const onPauseResume = () => {
        dispatch({ type: "pause", paused: !gameRef.current?.isPaused() });
    };

    return { dimensions, game, onQuit, onPauseResume, stageRef };
}
