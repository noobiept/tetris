import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { BackButton } from "../components/back-button";

const Container = styled.div``;
const Header = styled.h2``;
const Content = styled.div``;
const SubHeader = styled.h4``;
const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;
const ListItem = styled.li`
    text-align: left;
    display: flex;
    justify-content: space-between;
    gap: 8px;
`;
const Emphasis = styled.em`
    color: antiquewhite;
`;

export function HelpPage() {
    const { t } = useTranslation();
    const shortcuts = [
        { action: t("help.move-left"), key: t("help.move-left.key") },
        { action: t("help.move-right"), key: t("help.move-right.key") },
        { action: t("help.soft-drop"), key: t("help.soft-drop.key") },
        { action: t("help.hard-drop"), key: t("help.hard-drop.key") },
        { action: t("help.rotate-left"), key: t("help.rotate-left.key") },
        { action: t("help.rotate-right"), key: t("help.rotate-right.key") },
    ];

    return (
        <Container>
            <Header>{t("home.help")}</Header>
            <Content>
                <SubHeader>{t("help.keyboard")}</SubHeader>
                <List>
                    {shortcuts.map((shortcut) => (
                        <ListItem key={shortcut.action}>
                            {shortcut.action}:
                            <Emphasis>{shortcut.key}</Emphasis>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <BackButton />
        </Container>
    );
}
