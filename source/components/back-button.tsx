import styled from "@emotion/styled";
import { Button } from "./button";
import { RoutePath } from "../core/routes";

const StyledButton = styled(Button)`
    margin-top: 40px;
`;

export function BackButton() {
    return <StyledButton to={RoutePath.home}>Back</StyledButton>;
}
