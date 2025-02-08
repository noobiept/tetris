import { useMemo, useRef } from "react";

import { Piece } from "../grid";

export interface StageActions {
    clean: () => void;
    add: (element: createjs.DisplayObject) => void;
    addPiece: (piece: Piece) => void;
    update: () => void;
}

export const useStage = () => {
    const stageRef = useRef<createjs.Stage>(undefined);

    const stageActions: StageActions = useMemo(() => {
        return {
            clean: () => {
                const stage = stageRef.current;
                if (stage) {
                    stage.removeAllChildren();
                    stage.update();
                }
            },
            add: (element: createjs.DisplayObject) => {
                const stage = stageRef.current;
                if (stage) {
                    stage.addChild(element);
                }
            },
            update: () => {
                stageRef.current?.update();
            },
            addPiece: (piece: Piece) => {
                const stage = stageRef.current;

                if (stage) {
                    piece.addToContainer(stage);
                }
            },
        };
    }, []);

    return { stageRef, stageActions };
};
