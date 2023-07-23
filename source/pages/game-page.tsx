import styled from "@emotion/styled";
import { useContext, useEffect, useRef, useState } from "react";
import { Canvas, CanvasDimensions } from "../features/canvas";
import { GameMenu } from "../features/game-menu";
import { GameEndData, GameLogic } from "../features/game-logic";
import { useStage } from "../features/stage";
import { Dialog, DialogContext, DialogProps } from "../features/dialog";
import * as HighScore from "../high_score";
import * as Utilities from "../utilities";

const Container = styled.div``;

export function GamePage() {
    const { stageRef, stageActions } = useStage();
    const gameRef = useRef(new GameLogic({ stageActions }));
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

    return (
        <Container>
            <Canvas dimensions={dimensions} stageRef={stageRef} />
            <GameMenu />
        </Container>
    );
}
