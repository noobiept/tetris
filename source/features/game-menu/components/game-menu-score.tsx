import { timeToString } from "@drk4/utilities";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { Value } from "../../../components/value";
import {
    gameLevelAtom,
    gameMaxLevelAtom,
    gameScoreAtom,
} from "../../game-logic";

export function GameMenuScore() {
    const { t } = useTranslation();
    const [level] = useAtom(gameLevelAtom);
    const [maxLevel] = useAtom(gameMaxLevelAtom);
    const [score] = useAtom(gameScoreAtom);

    const levelValue = level >= maxLevel ? t("game.max-level") : level;
    const topInfo = [
        { label: t("game.current-level"), value: levelValue },
        { label: t("game.cleared-lines"), value: score.linesCleared },
        {
            label: t("game.time"),
            value: timeToString({
                time: score.time,
                format: "short_string",
            }),
        },
        { label: t("game.score"), value: score.score },
    ];

    return (
        <>
            {topInfo.map((info) => (
                <div key={info.label}>
                    {info.label}: <Value>{info.value}</Value>
                </div>
            ))}
        </>
    );
}
