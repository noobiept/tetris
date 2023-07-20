import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

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
        <Container>
            <Global styles={GlobalStyles} />
            <Outlet />
        </Container>
    );
}
