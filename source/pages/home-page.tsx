import styled from "@emotion/styled";
import { RoutePath } from "../core/routes";
import { Button } from "../components/button";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export function HomePage() {
    return (
        <Container>
            <Button size="large" to={RoutePath.game}>
                Start Game
            </Button>
            <Button size="large" to={RoutePath.options}>
                Options
            </Button>
            <Button size="large" to={RoutePath.highScore}>
                High Scores
            </Button>
            <Button size="large" to={RoutePath.help}>
                Help
            </Button>
        </Container>
    );
}
