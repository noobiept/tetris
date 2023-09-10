import styled from "@emotion/styled";
import { FormEvent, useState } from "react";

import { Value } from "./value";

const Container = styled.div``;
const RangeInput = styled.input`
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    height: 15px;
    border-radius: 5px;
    opacity: 0.8;
    transition: opacity 0.2s;
    outline: none;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgb(220, 10, 10);
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgb(220, 10, 10);
        cursor: pointer;
    }
`;
const Description = styled.div``;

export interface SliderProps {
    min: number;
    max: number;
    step: number;
    initialValue: number;
    description: string;
    onSlide: (value: number) => void;
    className?: string;
}

export function Slider(args: SliderProps) {
    const [value, setValue] = useState(args.initialValue);

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        const valueStr = e.currentTarget.value;
        const value = parseInt(valueStr);

        setValue(value);
        args.onSlide(value);
    };

    return (
        <Container className={args.className}>
            <Description>
                {args.description} <Value>{value}</Value>
            </Description>
            <RangeInput
                type="range"
                min={args.min}
                max={args.max}
                step={args.step}
                value={value}
                onInput={onInput}
            />
        </Container>
    );
}
