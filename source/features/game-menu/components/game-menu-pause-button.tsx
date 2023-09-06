import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { Button } from "../../../components/button";
import { gamePausedAtom } from "../../game-logic";

export interface GameMenuPauseButtonProps {
    onPauseResume: () => void;
}

export function GameMenuPauseButton({
    onPauseResume,
}: GameMenuPauseButtonProps) {
    const { t } = useTranslation();
    const paused = useAtomValue(gamePausedAtom);

    return (
        <Button onClick={onPauseResume}>
            {paused ? t("game.resume") : t("game.pause")}
        </Button>
    );
}
