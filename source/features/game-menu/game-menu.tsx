import styled from "@emotion/styled";
import { Button } from "../../components/button";
import { RoutePath } from "../../core/routes";
import { GameState } from "../game-logic";
import { timeToString } from "../../utilities";

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 185px;
    height: 100%;
`;
const Top = styled.div`
    margin-top: 100px;
`;
const Bottom = styled.div``;
const Value = styled.span`
    color: antiquewhite;
`;
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
    const { score, message, messageCount, paused } = game;
    const topInfo = [
        { label: "Current Level", value: 0 }, // TODO
        { label: "Cleared Lines", value: score.linesCleared },
        { label: "Time", value: timeToString(score.time) },
        { label: "Score", value: score.score },
    ];

    return (
        <Container>
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
