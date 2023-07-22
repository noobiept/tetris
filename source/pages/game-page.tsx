import styled from "@emotion/styled";
import { useState } from "react";
import { Canvas, CanvasDimension } from "../features/canvas";
import { GameMenu } from "../features/game-menu";

const Container = styled.div``;

export function GamePage() {
    return (
        <Container>
            <Canvas />
            <GameMenu />
        </Container>
    );
}
