import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

export type CanvasDimensions = {
    width: number;
    height: number;
};

type CanvasProps = {
    dimensions: CanvasDimensions;
    stageRef: React.MutableRefObject<createjs.Stage | undefined>;
};

const CanvasElement = styled.canvas<CanvasDimensions>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

export function Canvas({ dimensions, stageRef }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            stageRef.current = new createjs.Stage(canvasRef.current);
        }
    }, [stageRef]);

    return (
        <CanvasElement
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
        ></CanvasElement>
    );
}
