import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type ButtonSize = "normal" | "large";

export interface ButtonProps {
    children: React.ReactNode;
    to: string;
    size?: ButtonSize;
    className?: string;
}

const StyledLink = styled(Link)<{ size?: ButtonSize }>`
    cursor: pointer;
    display: inline-block;
    color: white;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    width: 200px;
    padding: 10px;
    text-decoration: none;
    font-size: ${({ size }) => (size === "large" ? "1.2em" : "1em")};

    &:hover {
        color: #fcd3a1;
        border-bottom-color: #fcd3a1;
    }
`;

export function Button({ to, size, className, children }: ButtonProps) {
    return (
        <StyledLink className={className} to={to} size={size}>
            {children}
        </StyledLink>
    );
}
