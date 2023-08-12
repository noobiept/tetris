import styled from "@emotion/styled";

import { RoutePath } from "../core/routes";
import { Button } from "./button";

const StyledButton = styled(Button)`
    margin-top: 40px;
`;

type BackButtonProps = {
    onClick?: () => void;
};

export function BackButton({ onClick }: BackButtonProps) {
    return (
        <StyledButton to={RoutePath.home} onClick={onClick}>
            Back
        </StyledButton>
    );
}
