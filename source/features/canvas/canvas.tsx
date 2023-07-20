import { useEffect, useRef } from "react";

export type CanvasDimension = {
    width: number;
    height: number;
};

type CanvasProps = {
    dimension: CanvasDimension;
};

export function Canvas({ dimension }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const stageRef = useRef<createjs.Stage>();

    useEffect(() => {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        if (canvasRef.current) {
            stageRef.current = new createjs.Stage(canvasRef.current);
        }
    }, [canvasRef.current]);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = dimension.width;
            canvasRef.current.height = dimension.height;
        }
    }, [dimension]);

    return <canvas ref={canvasRef}></canvas>;
}
