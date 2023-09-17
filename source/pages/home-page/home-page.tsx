import { useEffect } from "react";

import { HomePageButtonList } from "./components/home-page-button-list";
import { useHomeNavigation } from "./home-page.hooks";
import { Container } from "./home-page.styles";

export function HomePage() {
    const { handleKeyPress } = useHomeNavigation();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <Container>
            <HomePageButtonList />
        </Container>
    );
}
