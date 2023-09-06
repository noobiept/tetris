import { useAtom } from "jotai";
import { useEffect } from "react";

import { Canvas } from "../canvas";
import { nextPieceAtom } from "../game-logic";
import { Piece, Square } from "../grid";
import { useStage } from "../stage";

export function NextPiece() {
    const [piece] = useAtom(nextPieceAtom);
    const { stageRef, stageActions } = useStage();
    const dimensions = {
        width: 100,
        height: 100,
    };

    useEffect(() => {
        const centerX = dimensions.width / 2 - Square.size / 2;
        const centerY = dimensions.height / 2 - Square.size / 2;
        const element = new Piece(piece);
        element.positionIn(centerX, centerY);
        stageActions.clean();
        stageActions.addPiece(element);
        stageActions.update();
    }, [piece, stageActions, dimensions.width, dimensions.height]);

    return <Canvas dimensions={dimensions} stageRef={stageRef} />;
}
