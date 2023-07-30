import styled from "@emotion/styled";
import { BackButton } from "../components/back-button";
import { Slider } from "../components/slider";
import * as Options from "../options";

const Container = styled.div``;
const Header = styled.h2``;
const OptionsList = styled.div`
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
            <OptionsList>
                <Slider
                    min={10}
                    max={20}
                    step={1}
                    initialValue={Options.get("numberOfColumns")}
                    description="Columns: "
                    onSlide={(value: number) =>
                        Options.set("numberOfColumns", value)
                    }
                />
                <Slider
                    min={15}
                    max={25}
                    step={1}
                    initialValue={Options.get("numberOfLines")}
                    description="Lines: "
                    onSlide={(value: number) =>
                        Options.set("numberOfLines", value)
                    }
                />
                <Slider
                    min={1}
                    max={20} // TODO Game.getMaxLevel()
                    step={1}
                    initialValue={Options.get("startingLevel")}
                    description="Starting Level: "
                    onSlide={(value: number) =>
                        Options.set("startingLevel", value)
                    }
                />
                <Slider
                    min={1}
                    max={15}
                    step={1}
                    initialValue={Options.get("linesToLevelUp")}
                    description="Lines to Level Up: "
                    onSlide={(value: number) =>
                        Options.set("linesToLevelUp", value)
                    }
                />

                <label id="Options-ghostPieceContainer">
                    <span>Ghost Piece:</span>
                    <input type="checkbox" id="Options-ghostPiece" />
                </label>
            </OptionsList>
            <BackButton />
        </Container>
    );
}
