import styled from "@emotion/styled";
import { BackButton } from "../components/back-button";
import { Slider } from "../components/slider";
import * as Options from "../options";
import { getMaxLevel } from "../features/game-logic";
import { CheckBox } from "../components/check-box";

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
    const sliders = [
        {
            min: 10,
            max: 20,
            step: 1,
            initialValue: Options.get("numberOfColumns"),
            description: "Columns: ",
            onSlide: (value: number) => Options.set("numberOfColumns", value),
        },
        {
            min: 15,
            max: 25,
            step: 1,
            initialValue: Options.get("numberOfLines"),
            description: "Lines: ",
            onSlide: (value: number) => Options.set("numberOfLines", value),
        },
        {
            min: 1,
            max: getMaxLevel(),
            step: 1,
            initialValue: Options.get("startingLevel"),
            description: "Starting Level: ",
            onSlide: (value: number) => Options.set("startingLevel", value),
        },
        {
            min: 1,
            max: 15,
            step: 1,
            initialValue: Options.get("linesToLevelUp"),
            description: "Lines to level up: ",
            onSlide: (value: number) => Options.set("linesToLevelUp", value),
        },
    ];

    return (
        <Container>
            <Header>Options</Header>
            <OptionsList>
                {sliders.map((slider) => (
                    <Slider
                        key={slider.description}
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        initialValue={slider.initialValue}
                        description={slider.description}
                        onSlide={slider.onSlide}
                    />
                ))}

                <CheckBox
                    label="Ghost Piece:"
                    initialValue={Options.get("ghostPiece")}
                    onChange={(value: boolean) =>
                        Options.set("ghostPiece", value)
                    }
                />
            </OptionsList>
            <BackButton onClick={Options.save} />
        </Container>
    );
}
