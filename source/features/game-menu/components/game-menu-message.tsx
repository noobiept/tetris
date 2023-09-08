import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { gameMessageAtom, gameMessageCountAtom } from "../../game-logic";

const Message = styled.div`
    margin: 20px 0;
    height: 2em;
    color: red;
`;

export function GameMenuMessage() {
    const { t } = useTranslation();
    const message = useAtomValue(gameMessageAtom);
    const messageCount = useAtomValue(gameMessageCountAtom);

    return (
        <Message>
            {messageCount > 0 && `${messageCount}x `}
            {t(message)}
        </Message>
    );
}
