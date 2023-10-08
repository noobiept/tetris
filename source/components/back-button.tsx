import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { RoutePath } from "../core/routes";
import { margin } from "../core/theme";
import { Button, ButtonProps } from "./button";

const StyledButton = styled(Button)`
    margin-top: ${margin.x4};
`;

type BackButtonProps = Omit<ButtonProps, "children" | "to">;

export function BackButton(args: BackButtonProps) {
    const { t } = useTranslation();

    return (
        <StyledButton to={RoutePath.home} {...args}>
            {t("back")}
        </StyledButton>
    );
}
