import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Canvas, CanvasDimensions } from "../features/canvas";
import { GameMenu } from "../features/game-menu";
import { GameLogic } from "../features/game-logic";
import { useStage } from "../features/stage";

const Container = styled.div``;

export function GamePage() {
    const { stageRef, stageActions } = useStage();
    const gameRef = useRef(new GameLogic({ stageActions }));

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

    return (
        <Container>
            <Canvas dimensions={dimensions} stageRef={stageRef} />
            <GameMenu />
        </Container>
    );
}
