import styled from "@emotion/styled";
import { Button } from "../../components/button";
import { useState } from "react";
import { RoutePath } from "../../core/routes";

const Container = styled.div``;
const Top = styled.div``;
const Bottom = styled.div``;
const Value = styled.span`
    color: antiquewhite;
`;
const Message = styled.div`
    margin-top: 30px;
    color: red;
`;

export function GameMenu() {
    const topInfo = [
        { label: "Current Level" },
        { label: "Cleared Lines" },
        { label: "Time" },
        { label: "Score" },
    ];
    const [messageCount, setMessageCount] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [paused, setPaused] = useState(false); // TODO

    return (
        <Container>
            <Top>
                {topInfo.map((info) => (
                    <div key={info.label}>
                        {info.label}: <Value />
                    </div>
                ))}
                <Message>
                    <span>{messageCount}</span>
                    <span>{messageText}</span>
                </Message>
            </Top>
            <Bottom>
                <Button>{paused ? "Resume" : "Pause"}</Button>
                <Button to={RoutePath.home}>Quit</Button>
            </Bottom>
        </Container>
    );
}
