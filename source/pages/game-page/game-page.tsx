import styled from "@emotion/styled";

import { Canvas } from "../../features/canvas";
import { GameMenu } from "../../features/game-menu";
import { useGameLogic } from "./game-page.hooks";

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export function GamePage() {
    const { game, dimensions, onQuit, onPauseResume, stageRef } =
        useGameLogic();

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
