import { timeToString } from "@drk4/utilities";
import styled from "@emotion/styled";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { BackButton } from "../components/back-button";
import { color } from "../core/theme";
import { HighScoreContext } from "../features/high-score";

const Container = styled.div``;
const Header = styled.h2``;
const Content = styled.div``;
const TBody = styled.tbody`
    & tr:nth-of-type(odd) {
        background-color: ${color.orange20_20};
    }
`;
const THeader = styled.th`
    padding: 2px 10px;
`;

export function HighScorePage() {
    const { t } = useTranslation();
    const { getScores } = useContext(HighScoreContext);
    const scores = getScores();
    const internationalization = {
        day: {
            single: t("time.day.single"),
            plural: t("time.day.plural"),
        },
        hour: {
            single: t("time.hour.single"),
            plural: t("time.hour.plural"),
        },
        minute: {
            single: t("time.minute.single"),
            plural: t("time.minute.plural"),
        },
        second: {
            single: t("time.second.single"),
            plural: t("time.second.plural"),
        },
    };

    return (
        <Container>
            <Header>{t("high-score.header")}</Header>
            <Content>
                {scores.length === 0 ? (
                    <div>{t("high-score.no-scores")}</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <THeader></THeader>
                                <THeader>{t("high-score.table-score")}</THeader>
                                <THeader>
                                    {t("high-score.table-lines-cleared")}
                                </THeader>
                                <THeader>{t("high-score.table-time")}</THeader>
                            </tr>
                        </thead>
                        <TBody>
                            {scores.map((score, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{score.score}</td>
                                    <td>{score.linesCleared}</td>
                                    <td>
                                        {timeToString({
                                            time: score.time,
                                            format: "short_string",
                                            internationalization,
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </TBody>
                    </table>
                )}
            </Content>
            <BackButton />
        </Container>
    );
}
