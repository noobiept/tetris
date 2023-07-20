import styled from "@emotion/styled";
import { BackButton } from "../components/back-button";

const Container = styled.div``;
const Header = styled.h2``;
const Options = styled.div`
    width: 600px; /* force to have 2 options per line */
    & > * {
        display: inline-block;
        width: 200px;
        padding: 0;
        margin: 20px;
    }
`;

export function OptionsPage() {
    // TODO create sliders
    return (
        <Container>
            <Header>Options</Header>
            <Options>
                <label id="Options-ghostPieceContainer">
                    <span>Ghost Piece:</span>
                    <input type="checkbox" id="Options-ghostPiece" />
                </label>
            </Options>
            <BackButton />
        </Container>
    );
}
