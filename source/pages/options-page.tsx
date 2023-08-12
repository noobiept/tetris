import styled from "@emotion/styled";
import { useContext } from "react";

import { BackButton } from "../components/back-button";
import { CheckBox } from "../components/check-box";
import { Slider } from "../components/slider";
import { getMaxLevel } from "../features/game-logic";
import { OptionsContext } from "../features/options";

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
    const { getOption, setOption, saveOptions } = useContext(OptionsContext);

    const sliders = [
        {
            min: 10,
            max: 20,
            step: 1,
            initialValue: getOption("numberOfColumns"),
            description: "Columns: ",
            onSlide: (value: number) => setOption("numberOfColumns", value),
        },
        {
            min: 15,
            max: 25,
            step: 1,
            initialValue: getOption("numberOfLines"),
            description: "Lines: ",
            onSlide: (value: number) => setOption("numberOfLines", value),
        },
        {
            min: 1,
            max: getMaxLevel(),
            step: 1,
            initialValue: getOption("startingLevel"),
            description: "Starting Level: ",
            onSlide: (value: number) => setOption("startingLevel", value),
        },
        {
            min: 1,
            max: 15,
            step: 1,
            initialValue: getOption("linesToLevelUp"),
            description: "Lines to level up: ",
            onSlide: (value: number) => setOption("linesToLevelUp", value),
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
                    initialValue={getOption("ghostPiece")}
                    onChange={(value: boolean) =>
                        setOption("ghostPiece", value)
                    }
                />
            </OptionsList>
            <BackButton onClick={saveOptions} />
        </Container>
    );
}
