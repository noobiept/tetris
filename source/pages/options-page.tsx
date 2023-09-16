import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { BackButton } from "../components/back-button";
import { CheckBox } from "../components/check-box";
import { Slider } from "../components/slider";
import { mobileMq } from "../core/media-queries";
import { margin } from "../core/theme";
import { getMaxLevel } from "../features/game-logic";
import { OptionsContext } from "../features/options";

const Container = styled.div``;
const Header = styled.h2``;
const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;
const gridItemCss = css`
    display: inline-block;
    padding: 0;
    margin: ${margin.x2};

    ${mobileMq} {
        margin: ${margin.x2} 0;
    }
`;

const StyledSlider = styled(Slider)`
    ${gridItemCss}
`;
const StyledCheckBox = styled(CheckBox)`
    ${gridItemCss}
    grid-column: 1 / span 2;
`;

export function OptionsPage() {
    const { t } = useTranslation();
    const { getOption, setOption, saveOptions } = useContext(OptionsContext);

    const sliders = [
        {
            min: 10,
            max: 20,
            step: 1,
            initialValue: getOption("numberOfColumns"),
            description: `${t("options.columns")}: `,
            onSlide: (value: number) => setOption("numberOfColumns", value),
        },
        {
            min: 15,
            max: 25,
            step: 1,
            initialValue: getOption("numberOfLines"),
            description: `${t("options.lines")}: `,
            onSlide: (value: number) => setOption("numberOfLines", value),
        },
        {
            min: 1,
            max: getMaxLevel(),
            step: 1,
            initialValue: getOption("startingLevel"),
            description: `${t("options.starting-level")}: `,
            onSlide: (value: number) => setOption("startingLevel", value),
        },
        {
            min: 1,
            max: 15,
            step: 1,
            initialValue: getOption("linesToLevelUp"),
            description: `${t("options.lines-to-level-up")}: `,
            onSlide: (value: number) => setOption("linesToLevelUp", value),
        },
    ];

    return (
        <Container>
            <Header>{t("options.header")}</Header>
            <OptionsGrid>
                {sliders.map((slider) => (
                    <StyledSlider
                        key={slider.description}
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        initialValue={slider.initialValue}
                        description={slider.description}
                        onSlide={slider.onSlide}
                    />
                ))}

                <StyledCheckBox
                    label={`${t("options.ghost-piece")}:`}
                    initialValue={getOption("ghostPiece")}
                    onChange={(value: boolean) =>
                        setOption("ghostPiece", value)
                    }
                />
            </OptionsGrid>
            <BackButton onClick={saveOptions} />
        </Container>
    );
}
