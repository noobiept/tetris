import styled from "@emotion/styled";
import { Button } from "../../components/button";
import { RoutePath } from "../../core/routes";
import { GameState } from "../game-logic";

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
    message?: string;
    onQuit: () => void;
    onPauseResume: () => void;
}

export function GameMenu({
    game,
    message,
    onQuit,
    onPauseResume,
}: GameMenuProps) {
    const topInfo = [
        { label: "Current Level", value: 0 },
        { label: "Cleared Lines", value: 0 },
        { label: "Time", value: 0 },
        { label: "Score", value: game.score },
    ];

    return (
        <Container>
            <Top>
                {topInfo.map((info) => (
                    <div key={info.label}>
                        {info.label}: <Value>{info.value}</Value>
                    </div>
                ))}
                <Message>{message}</Message>
            </Top>
            <Bottom>
                <Button onClick={onPauseResume}>
                    {game.paused ? "Resume" : "Pause"}
                </Button>
                <Button onClick={onQuit} to={RoutePath.home}>
                    Quit
                </Button>
            </Bottom>
        </Container>
    );
}
