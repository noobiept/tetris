import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export function RootPage() {
    return (
        <Container>
            <Outlet />
        </Container>
    );
}
