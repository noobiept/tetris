import styled from "@emotion/styled";
import { BackButton } from "../components/back-button";

const Container = styled.div``;
const Header = styled.h2``;
const Content = styled.div``;
const TBody = styled.tbody`
    & tr:nth-child(odd) {
        background-color: rgba(252, 211, 161, 0.2);
    }
`;
const THeader = styled.th`
    padding: 2px 10px;
`;

export function HighScorePage() {
    const scores = [];

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
                        <TBody></TBody>
                    </table>
                )}
            </Content>
            <BackButton />
        </Container>
    );
}
