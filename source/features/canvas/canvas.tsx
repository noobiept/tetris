import { useEffect, useRef } from "react";

export type CanvasDimensions = {
    width: number;
    height: number;
};

type CanvasProps = {
    dimensions: CanvasDimensions;
    stageRef: React.MutableRefObject<createjs.Stage | undefined>;
};

export function Canvas({ dimensions, stageRef }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            stageRef.current = new createjs.Stage(canvasRef.current);
        }
    }, [canvasRef.current]);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = dimensions.width;
            canvasRef.current.height = dimensions.height;
        }
    }, [dimensions]);

    return <canvas ref={canvasRef}></canvas>;
}
