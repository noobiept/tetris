import { timeToString } from "@drk4/utilities";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Button } from "../../components/button";
import { Value } from "../../components/value";
import { RoutePath } from "../../core/routes";
import { GameState } from "../game-logic";
import { NextPiece } from "../next-piece";

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

const Message = styled.div`
    margin: 20px 0;
    height: 2em;
    color: red;
`;

export interface GameMenuProps {
    game: GameState;
    onQuit: () => void;
    onPauseResume: () => void;
}

export function GameMenu({ game, onQuit, onPauseResume }: GameMenuProps) {
    const { t } = useTranslation();
    const { score, message, messageCount, paused, level, maxLevel } = game;

    const levelValue = level >= maxLevel ? t("game.max-level") : level;
    const topInfo = [
        { label: t("game.current-level"), value: levelValue },
        { label: t("game.cleared-lines"), value: score.linesCleared },
        {
            label: t("game.time"),
            value: timeToString({
                time: score.time,
                format: "short_string",
            }),
        },
        { label: t("game.score"), value: score.score },
    ];

    return (
        <Container>
            <NextPiece piece={game.nextPiece} />
            <Top>
                {topInfo.map((info) => (
                    <div key={info.label}>
                        {info.label}: <Value>{info.value}</Value>
                    </div>
                ))}
                <Message>
                    {messageCount > 0 && `${messageCount}x `}
                    {message}
                </Message>
            </Top>
            <Bottom>
                <Button onClick={onPauseResume}>
                    {paused ? t("game.resume") : t("game.pause")}
                </Button>
                <Button onClick={onQuit} to={RoutePath.home}>
                    {t("game.quit")}
                </Button>
            </Bottom>
        </Container>
    );
}
