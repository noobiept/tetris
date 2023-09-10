import styled from "@emotion/styled";

import { mobileMq } from "../../core/media-queries";
import { Canvas } from "../../features/canvas";
import { GameMenu } from "../../features/game-menu";
import { useGameLogic } from "./game-page.hooks";

const Container = styled.div`
    display: flex;
    flex-direction: row;

    ${mobileMq} {
        flex-direction: column;
        align-items: center;
    }
`;

export function GamePage() {
    const { dimensions, onQuit, onPauseResume, stageRef } = useGameLogic();

    return (
        <Container>
            <Canvas dimensions={dimensions} stageRef={stageRef} />
            <GameMenu onQuit={onQuit} onPauseResume={onPauseResume} />
        </Container>
    );
}
