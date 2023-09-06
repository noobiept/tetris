import { timeToString } from "@drk4/utilities";
import { useSetAtom } from "jotai";
import {
    Dispatch,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { parseNewLines } from "../../core/i18n";
import { RoutePath } from "../../core/routes";
import { CanvasDimensions } from "../../features/canvas";
import { DialogContext } from "../../features/dialog";
import {
    GameAction,
    GameEndData,
    GameLogic,
    gameReducerAtom,
} from "../../features/game-logic";
import { HighScoreContext } from "../../features/high-score";
import { OptionsContext } from "../../features/options";
import { useStage } from "../../features/stage";
import { cardinalToOrdinal } from "../../utilities";

export function useGameLogic() {
    const navigate = useNavigate();
    const { stageRef, stageActions } = useStage();
    const gameRef = useRef<GameLogic | undefined>();
    const { t } = useTranslation();

    const [dimensions, setDimensions] = useState<CanvasDimensions>({
        width: 600,
        height: 450,
    });
    const { openDialog, closeDialog } = useContext(DialogContext);
    const { getOption } = useContext(OptionsContext);
    const { addScore } = useContext(HighScoreContext);

    const pureDispatch = useSetAtom(gameReducerAtom);
    const middleware = useCallback(
        (action: GameAction, dispatch: Dispatch<GameAction>) => {
            if (!gameRef.current) {
                return;
            }

            const onEnd = (data: GameEndData) => {
                const added = addScore(data);
                const addedText = added ? ` (${cardinalToOrdinal(added)})` : ""; // TODO i18n ordinals
                const endBody =
                    t("end.body", {
                        level: data.level,
                        lines: data.linesCleared,
                        time: timeToString({ time: data.time }),
                        score: data.score,
                    }) + addedText;
                const body = parseNewLines(endBody);

                openDialog({
                    title: t("end.title"),
                    body,
                    onClose: () => {
                        closeDialog();
                        dispatch({ type: "restart" });
                    },
                });
            };

            switch (action.type) {
                case "end":
                    dispatch({ type: "pause", paused: true });
                    onEnd(action.score);
                    break;

                case "pause":
                    gameRef.current.setPaused(action.paused);
                    break;

                case "restart":
                    stageActions.clean();
                    gameRef.current.start();
                    gameRef.current.setPaused(false);
                    break;
            }
        },
        [t, openDialog, closeDialog, stageActions, addScore]
    );

    const dispatch = useCallback(
        (action: GameAction) => {
            middleware(action, dispatch);
            pureDispatch(action);
        },
        [pureDispatch, middleware]
    );

    useEffect(() => {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        gameRef.current = new GameLogic({ stageActions, dispatch, getOption });

        const gridDimensions = gameRef.current.start();
        setDimensions(gridDimensions);

        const onKeyDown = (e: KeyboardEvent) =>
            gameRef.current?.keyDownListener(e);
        const onKeyUp = (e: KeyboardEvent) => gameRef.current?.keyUpListener(e);
        const onTick = (e: object) =>
            gameRef.current?.tick(e as createjs.TickerEvent);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        createjs.Ticker.addEventListener("tick", onTick);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            createjs.Ticker.removeEventListener("tick", onTick);
            createjs.Ticker.reset();

            gameRef.current?.clear();
        };
    }, [getOption, stageActions, dispatch]);

    const onQuit = useCallback(() => {
        gameRef.current?.clear();
        navigate(RoutePath.home);
    }, [navigate]);
    const onPauseResume = useCallback(() => {
        dispatch({ type: "pause", paused: !gameRef.current?.isPaused() });
    }, [dispatch]);

    return { dimensions, onQuit, onPauseResume, stageRef };
}
