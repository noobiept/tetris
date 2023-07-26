import styled from "@emotion/styled";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Canvas, CanvasDimensions } from "../features/canvas";
import { GameMenu } from "../features/game-menu";
import {
    GameAction,
    GameEndData,
    GameLogic,
    gameLogicReducer,
    initialGameState,
} from "../features/game-logic";
import { useStage } from "../features/stage";
import { DialogContext } from "../features/dialog";
import * as HighScore from "../high_score";
import * as Utilities from "../utilities";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../core/routes";
import { useReducerWM } from "../core/use-reducer";

const Container = styled.div``;

export function GamePage() {
    const navigate = useNavigate();
    const { stageRef, stageActions } = useStage();

    const middleware = useCallback((action: GameAction) => {
        const onEnd = (data: GameEndData) => {
            const added = HighScore.add(data);
            const endMessage = [
                `Level: ${data.level}`,
                `Lines cleared: ${data.linesCleared}`,
                `Time: ${Utilities.timeToString(data.time)}`,
                `Score: ${data.score} ${
                    added ? `(${Utilities.cardinalToOrdinal(added)})` : ""
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
    const gameRef = useRef(new GameLogic({ stageActions, dispatch }));
    const { openDialog, closeDialog } = useContext(DialogContext);

    const [dimensions, setDimensions] = useState<CanvasDimensions>({
        width: 600,
        height: 450,
    });

    useEffect(() => {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        const updatedDimensions = gameRef.current.start();
        setDimensions(updatedDimensions);

        return () => {
            gameRef.current.clear();
        };
    }, [stageRef.current]);

    const onQuit = () => {
        HighScore.add(game.score);
        gameRef.current.clear();

        navigate(RoutePath.home);
    };
    const onPauseResume = () => {
        dispatch({ type: "pause", paused: !gameRef.current.isPaused() });
    };

    return (
        <Container>
            <Canvas dimensions={dimensions} stageRef={stageRef} />
            <GameMenu
                game={game}
                onQuit={onQuit}
                onPauseResume={onPauseResume}
            />
        </Container>
    );
}
