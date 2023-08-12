import { timeToString } from "@drk4/utilities";
import styled from "@emotion/styled";
import { useContext } from "react";

import { BackButton } from "../components/back-button";
import { HighScoreContext } from "../features/high-score";

const Container = styled.div``;
const Header = styled.h2``;
const Content = styled.div``;
const TBody = styled.tbody`
    & tr:nth-of-type(odd) {
        background-color: rgba(252, 211, 161, 0.2);
    }
`;
const THeader = styled.th`
    padding: 2px 10px;
`;

export function HighScorePage() {
    const { getScores } = useContext(HighScoreContext);
    const scores = getScores();

    return (
        <Container>
            <Header>High Scores</Header>
            <Content>
                {scores.length === 0 ? (
                    <div>No scores yet.</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <THeader></THeader>
                                <THeader>Score</THeader>
                                <THeader>Lines Cleared</THeader>
                                <THeader>Time</THeader>
                            </tr>
                        </thead>
                        <TBody>
                            {scores.map((score, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{score.score}</td>
                                    <td>{score.linesCleared}</td>
                                    <td>
                                        {timeToString({
                                            time: score.time,
                                            format: "short_string",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </TBody>
                    </table>
                )}
            </Content>
            <BackButton />
        </Container>
    );
}
