import { useEffect, useRef, useState } from "react";
import { init, start } from "../game";

export type CanvasDimension = {
    width: number;
    height: number;
};

type CanvasProps = {
    dimension: CanvasDimension;
};

export function Canvas() {
    const [dimension, setDimension] = useState<CanvasDimension>({
        width: 600,
        height: 450,
    });

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
            init(canvasRef.current);
            const updatedDimensions = start();
            setDimension(updatedDimensions);
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
