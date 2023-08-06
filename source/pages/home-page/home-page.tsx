import { RoutePath } from "../../core/routes";
import { Button } from "../../components/button";
import { Container } from "./home-page.styles";

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
