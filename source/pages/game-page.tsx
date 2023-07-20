import styled from "@emotion/styled";
import { useState } from "react";
import { Canvas, CanvasDimension } from "../features/canvas";
import { GameMenu } from "../features/game-menu";

const Container = styled.div``;

export function GamePage() {
    const [canvasDimension, setCanvasDimension] = useState<CanvasDimension>({
        width: 600,
        height: 450,
    });

    return (
        <Container>
            <Canvas dimension={canvasDimension} />
            <GameMenu />
        </Container>
    );
}
