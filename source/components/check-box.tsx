import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.label`
    cursor: pointer;
`;
const Input = styled.input`
    vertical-align: middle;
`;

export type CheckBoxProps = {
    initialValue: boolean;
    label: string;
    onChange: (value: boolean) => void;
    className?: string;
};

export function CheckBox({
    initialValue,
    label,
    onChange,
    className,
}: CheckBoxProps) {
    const [checked, setChecked] = useState(initialValue);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setChecked(value);
        onChange(value);
    };

    return (
        <Container className={className}>
            <span>{label}</span>
            <Input type="checkbox" checked={checked} onChange={onInputChange} />
        </Container>
    );
}
