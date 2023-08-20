import { useTranslation } from "react-i18next";

import { Button } from "../../components/button";
import { RoutePath } from "../../core/routes";
import { Container } from "./home-page.styles";

export function HomePage() {
    const { t } = useTranslation();

    return (
        <Container>
            <Button size="large" to={RoutePath.game}>
                {t("home.start")}
            </Button>
            <Button size="large" to={RoutePath.options}>
                {t("home.options")}
            </Button>
            <Button size="large" to={RoutePath.highScore}>
                {t("home.high-score")}
            </Button>
            <Button size="large" to={RoutePath.help}>
                {t("home.help")}
            </Button>
        </Container>
    );
}
