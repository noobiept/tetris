import styled from "@emotion/styled";
import { Button } from "../../components/button";
import { useState } from "react";
import { RoutePath } from "../../core/routes";

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
