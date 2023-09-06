import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../../components/button";
import { RoutePath } from "../../core/routes";
import { gamePausedAtom, gameScoreAtom } from "../game-logic";
import { HighScoreContext } from "../high-score";
import { NextPiece } from "../next-piece";
import { GameMenuMessage } from "./components/game-menu-message";
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
    // const [score] = useAtom(gameScoreAtom);
    const [paused] = useAtom(gamePausedAtom);
    // const { addScore } = useContext(HighScoreContext);
    const onQuitWithScore = () => {
        // addScore(score); // TODO
        onQuit();
    };

    return (
        <Container>
            <NextPiece />
            <Top>
                <GameMenuScore />
                <GameMenuMessage />
            </Top>
            <Bottom>
                <Button onClick={onPauseResume}>
                    {paused ? t("game.resume") : t("game.pause")}
                </Button>
                <Button onClick={onQuitWithScore} to={RoutePath.home}>
                    {t("game.quit")}
                </Button>
            </Bottom>
        </Container>
    );
}
