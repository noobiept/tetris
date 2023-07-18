import styled from "@emotion/styled";
import { Button } from "../components/button";
import { RoutePath } from "../core/routes";

const Container = styled.div``;
const Header = styled.h2``;
const Content = styled.div``;
const SubHeader = styled.h4``;
const List = styled.ul`
    list-style-type: none;
`;
const ListItem = styled.li`
    text-align: left;
`;
const Emphasis = styled.em`
    color: antiquewhite;
`;
const BackButton = styled(Button)`
    margin-top: 40px;
`;

export function HelpPage() {
    const shortcuts = [
        { action: "move left", key: "left arrow" },
        { action: "move right", key: "right arrow" },
        { action: "soft drop", key: "down arrow" },
        { action: "hard drop", key: "space" },
        { action: "rotate left", key: "a" },
        { action: "rotate right", key: "d" },
    ];

    return (
        <Container>
            <Header>Help</Header>
            <Content>
                <SubHeader>Keyboard</SubHeader>
                <List>
                    {shortcuts.map((shortcut) => (
                        <ListItem key={shortcut.action}>
                            {shortcut.action} :{" "}
                            <Emphasis>{shortcut.key}</Emphasis>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <BackButton to={RoutePath.home}>Back</BackButton>
        </Container>
    );
}
