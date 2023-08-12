import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

import { DialogContextProvider } from "../features/dialog";
import { HighScoreContextProvider } from "../features/high-score";
import { OptionsContextProvider } from "../features/options";

const GlobalStyles = css`
    body {
        background-color: black;
        color: white;
        text-align: center;
        font-size: 24px;
        margin: 0;
        padding: 0;
        height: 100vh;
    }
`;

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export function RootPage() {
    return (
        <DialogContextProvider>
            <OptionsContextProvider>
                <HighScoreContextProvider>
                    <Container>
                        <Global styles={GlobalStyles} />
                        <Outlet />
                    </Container>
                </HighScoreContextProvider>
            </OptionsContextProvider>
        </DialogContextProvider>
    );
}
