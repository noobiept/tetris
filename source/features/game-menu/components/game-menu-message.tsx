import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

import { gameMessageAtom, gameMessageCountAtom } from "../../game-logic";

const Message = styled.div`
    margin: 20px 0;
    height: 2em;
    color: red;
`;

export function GameMenuMessage() {
    const message = useAtomValue(gameMessageAtom);
    const messageCount = useAtomValue(gameMessageCountAtom);

    return (
        <Message>
            {messageCount > 0 && `${messageCount}x `}
            {message}
        </Message>
    );
}
