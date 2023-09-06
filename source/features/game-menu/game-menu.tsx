import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Button } from "../../components/button";
import { RoutePath } from "../../core/routes";
import { NextPiece } from "../next-piece";
import { GameMenuMessage } from "./components/game-menu-message";
import { GameMenuPauseButton } from "./components/game-menu-pause-button";
import { GameMenuScore } from "./components/game-menu-score";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin: 20px;
`;
const Top = styled.div``;
const Bottom = styled.div``;

export interface GameMenuProps {
    onQuit: () => void;
    onPauseResume: () => void;
}

export function GameMenu({ onQuit, onPauseResume }: GameMenuProps) {
    const { t } = useTranslation();

    return (
        <Container>
            <NextPiece />
            <Top>
                <GameMenuScore />
                <GameMenuMessage />
            </Top>
            <Bottom>
                <GameMenuPauseButton onPauseResume={onPauseResume} />
                <Button onClick={onQuit} to={RoutePath.home}>
                    {t("game.quit")}
                </Button>
            </Bottom>
        </Container>
    );
}
