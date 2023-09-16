import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { RoutePath } from "../core/routes";
import { margin } from "../core/theme";
import { Button } from "./button";

const StyledButton = styled(Button)`
    margin-top: ${margin.x4};
`;

type BackButtonProps = {
    onClick?: () => void;
};

export function BackButton({ onClick }: BackButtonProps) {
    const { t } = useTranslation();

    return (
        <StyledButton to={RoutePath.home} onClick={onClick}>
            {t("back")}
        </StyledButton>
    );
}
