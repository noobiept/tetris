import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { color, fontSize, padding } from "../core/theme";

type ButtonSize = "normal" | "large";

export interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    size?: ButtonSize;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledLink = (component: any) => styled(component)<{ size?: ButtonSize }>`
    cursor: pointer;
    display: inline-block;
    color: ${color.white};
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    width: 200px;
    padding: ${padding.base};
    text-decoration: none;
    font-size: ${({ size }) =>
        size === "large" ? fontSize.large : fontSize.medium};

    &:hover {
        color: ${color.orange20};
        border-bottom-color: ${color.orange20};
    }
`;

export function Button({
    to,
    size,
    className,
    onClick,
    children,
}: ButtonProps) {
    const Element = StyledLink(to ? Link : "div");

    return (
        <Element className={className} to={to} onClick={onClick} size={size}>
            {children}
        </Element>
    );
}
