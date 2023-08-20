import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

import { DialogContextProvider } from "../features/dialog";
import { HighScoreContextProvider } from "../features/high-score";
import { LanguageSelector } from "../features/language-selector";
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

const TopMenu = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;

export function RootPage() {
    return (
        <DialogContextProvider>
            <OptionsContextProvider>
                <HighScoreContextProvider>
                    <TopMenu>
                        <LanguageSelector />
                    </TopMenu>
                    <Container>
                        <Global styles={GlobalStyles} />
                        <Outlet />
                    </Container>
                </HighScoreContextProvider>
            </OptionsContextProvider>
        </DialogContextProvider>
    );
}
