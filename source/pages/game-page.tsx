import styled from "@emotion/styled";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Canvas, CanvasDimensions } from "../features/canvas";
import { GameMenu } from "../features/game-menu";
import {
    GameEndData,
    GameLogic,
    gameLogicReducer,
} from "../features/game-logic";
import { useStage } from "../features/stage";
import { DialogContext } from "../features/dialog";
import * as HighScore from "../high_score";
import * as Utilities from "../utilities";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../core/routes";

const Container = styled.div``;

export function GamePage() {
    const navigate = useNavigate();
    const { stageRef, stageActions } = useStage();
    const [game, dispatch] = useReducer(gameLogicReducer, {
        score: 0,
        paused: false,
    });
    const gameRef = useRef(new GameLogic({ stageActions, dispatch }));
    const { openDialog } = useContext(DialogContext);

    const [dimensions, setDimensions] = useState<CanvasDimensions>({
        width: 600,
        height: 450,
    });

    useEffect(() => {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

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
                    // TODO
                },
            });
        };

        const updatedDimensions = gameRef.current.start(onEnd);
        setDimensions(updatedDimensions);

        return () => {
            gameRef.current.clear();
        };
    }, [stageRef.current]);

    const message = "";
    const onQuit = () => {
        gameRef.current.quitGame(); // TODO
        navigate(RoutePath.home);
    };
    const onPauseResume = () => {
        gameRef.current.togglePaused(); // TODO
        dispatch({ type: "pause", paused: gameRef.current.isPaused() });
    };

    return (
        <Container>
            <Canvas dimensions={dimensions} stageRef={stageRef} />
            <GameMenu
                game={game}
                message={message}
                onQuit={onQuit}
                onPauseResume={onPauseResume}
            />
        </Container>
    );
}
