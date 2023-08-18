import { timeToString } from "@drk4/utilities";
import styled from "@emotion/styled";

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
    width: 185px;
    margin: 20px;
`;
const Top = styled.div``;
const Bottom = styled.div``;

const Message = styled.div`
    margin-top: 30px;
    color: red;
`;

export interface GameMenuProps {
    game: GameState;
    onQuit: () => void;
    onPauseResume: () => void;
}

export function GameMenu({ game, onQuit, onPauseResume }: GameMenuProps) {
    const { score, message, messageCount, paused, level, maxLevel } = game;

    const levelValue = level >= maxLevel ? "max" : level;
    const topInfo = [
        { label: "Current Level", value: levelValue },
        { label: "Cleared Lines", value: score.linesCleared },
        {
            label: "Time",
            value: timeToString({
                time: score.time,
                format: "short_string",
            }),
        },
        { label: "Score", value: score.score },
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
                    {paused ? "Resume" : "Pause"}
                </Button>
                <Button onClick={onQuit} to={RoutePath.home}>
                    Quit
                </Button>
            </Bottom>
        </Container>
    );
}
