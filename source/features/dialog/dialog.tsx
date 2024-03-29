import styled from "@emotion/styled";
import { useEffect } from "react";

import { fontWeight, margin } from "../../core/theme";

export interface DialogProps {
    title: string;
    body: string | string[];
    onClose: () => void;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(5px);
    z-index: 100;
`;
const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    background-color: white;
    padding: 5px;
    min-width: 200px;
    border-radius: 10px;
    z-index: 101;
`;
const Title = styled.div`
    font-weight: ${fontWeight.bold};
    margin: ${margin.base};
`;
const Body = styled.div`
    margin: ${margin.x2} 0;
`;
const Rule = styled.hr`
    border-color: rgba(255, 255, 255, 0.3);
`;
const Buttons = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;
const Ok = styled.button`
    font-size: 22px;
    padding: 5px 15px;
    margin: 10px;
`;

export function Dialog({ title, body, onClose }: DialogProps) {
    useEffect(() => {
        const keyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case "Escape":
                case "Enter":
                    onClose();
                    break;
            }
        };

        window.addEventListener("keyup", keyUp);

        return () => {
            window.removeEventListener("keyup", keyUp);
        };
    }, [onClose]);

    return (
        <>
            <Overlay />
            <Container>
                <Title>{title}</Title>
                <Body>
                    {typeof body === "string"
                        ? body
                        : body.map((line, index) => (
                              <div key={index}>{line}</div>
                          ))}
                </Body>
                <Rule />
                <Buttons>
                    <Ok onClick={onClose}>Ok</Ok>
                </Buttons>
            </Container>
        </>
    );
}
