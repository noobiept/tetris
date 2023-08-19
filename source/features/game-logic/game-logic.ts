import { getRandomInt, Timer } from "@drk4/utilities";

import {
    GhostPiece,
    Grid,
    IPiece,
    JPiece,
    LPiece,
    OPiece,
    Piece,
    PieceArgs,
    SPiece,
    TPiece,
    ZPiece,
} from "../grid";
import { GetOption } from "../options";
import { StageActions } from "../stage";
import { type GameAction } from "./game-logic.reducer";
import { Level } from "./level";
import { Score } from "./score";

export interface GameLogicArgs {
    stageActions: StageActions;
    dispatch: (action: GameAction) => void;
    getOption: GetOption;
}

export class GameLogic {
    private score: Score;
    private level: Level;
    private timer: Timer;
    private grid: Grid;
    private stageActions: StageActions;
    private dispatch: (action: GameAction) => void;
    private getOption: GetOption;
    private nextPieceArgs: PieceArgs = IPiece;

    // number of milliseconds until the active piece moves down 1 position
    private delayLimit = 0;
    private delayCount = 0;

    // time between the horizontal move of a piece
    private horizontalLimit = 75;
    private horizontalCount = 0;

    private softDropDelay = 40; // downward movement when the 'soft drop' is active

    private softDropActive = false;

    private activePiece: Piece | null = null; // current active piece on the map (falling)
    private ghostPiece: Piece | null = null; // shows where the active piece will end up at if no change is made

    // keys being pressed/held
    private keysHeld = {
        leftArrow: false, // move left
        rightArrow: false, // move right
    };

    /**
     * Initialize the game logic class.
     */
    constructor({ stageActions, dispatch, getOption }: GameLogicArgs) {
        this.score = new Score({
            onChange: () => {
                dispatch({
                    type: "update-score",
                    score: {
                        score: this.score.getCurrentScore(),
                        linesCleared: this.score.getLinesCleared(),
                        time: this.timer.getTimeMilliseconds(),
                    },
                });
            },
        });

        this.level = new Level({
            onLevelChange: (state) => {
                const { pieceMovementDelay, ...levelState } = state;

                dispatch({
                    type: "update-level",
                    ...levelState,
                });

                this.delayLimit = pieceMovementDelay;
            },
        });
        this.timer = new Timer();
        // for initialization purposes
        this.grid = new Grid({
            columns: 1,
            lines: 1,
            onLineCleared: () => {},
            addToStage: () => {},
        });

        this.stageActions = stageActions;
        this.dispatch = dispatch;
        this.getOption = getOption;
    }

    /**
     * Start a new game.
     */
    start() {
        const numberOfColumns = this.getOption("numberOfColumns");
        const numberOfLines = this.getOption("numberOfLines");

        this.level.setLevel(this.getOption("startingLevel"));

        this.grid = new Grid({
            columns: numberOfColumns,
            lines: numberOfLines,
            addToStage: this.stageActions.add,
            onLineCleared: this.oneMoreClearedLine.bind(this),
        });

        this.nextPieceArgs = this.chooseRandomPiece();
        this.dispatch({
            type: "next-piece",
            piece: this.nextPieceArgs,
        });
        this.newPiece();

        const interval = 1000; // 1 second

        this.timer.reset();
        this.timer.start({
            interval,
            onTick: () => {
                this.score.timePassed(interval);
            },
        });
        this.score.applyMultipliers({
            ghostPiece: this.getOption("ghostPiece"),
        });
        this.score.reset();

        // return the grid dimensions (it differs based on the current options)
        return {
            width: this.grid.width,
            height: this.grid.height,
        };
    }

    /**
     * Add a new piece to the grid.
     * The previously active piece will be part of the stack now.
     * Also check for the game ending condition (see if it doesn't collide with other squares in the stack, otherwise the game is over).
     */
    private newPiece() {
        this.clearMessage();

        if (this.activePiece) {
            // the previous active piece now is part of the stack
            this.activePiece.markInStack();

            // check if any line is cleared (since we're adding a new piece, means the previous one is part of the stack, so the right moment to clear the lines)
            this.grid.checkClearedLines();
        }

        // the next piece is the one determined before
        const pieceArgs = this.nextPieceArgs;
        const rotation = pieceArgs.possibleRotations[0];

        // the start position
        const pivotPosition = {
            column: Math.floor(this.grid.numberOfColumns / 2), // center in the middle
            line: Grid.extraLines, // spawn past the extra lines (at the start of the playable grid)
        };

        // check if the piece will collide with an existing square in the stack (if so, its game over, the stack has reached the top)
        if (this.grid.collideWithStack(pivotPosition, rotation)) {
            this.end();
            return;
        }

        // we randomly get a new piece, for next time
        this.nextPieceArgs = this.chooseRandomPiece(pieceArgs);

        // and show it in the game menu
        this.dispatch({
            type: "next-piece",
            piece: this.nextPieceArgs,
        });

        // only one ghost piece in the game
        if (this.ghostPiece) {
            this.ghostPiece.remove();
        }

        // add the ghost piece
        if (this.getOption("ghostPiece")) {
            this.ghostPiece = new Piece({
                ...pieceArgs,
                ...GhostPiece,
            });
            this.grid.addToContainer(this.ghostPiece);
        }

        // add the active piece (added after the ghost piece so it is drawn on top of it (if matching the same space)
        this.activePiece = new Piece(pieceArgs);
        this.grid.addToContainer(this.activePiece);
        this.grid.addPiece(this.activePiece, pivotPosition);

        // needs to be updated after we add the active piece
        this.updateGhostPiecePosition();

        // reset the counter that deals with the movement of the active piece (since we added a new one)
        this.delayCount = 0;
    }

    /**
     * Randomly choose the class of a piece.
     */
    private chooseRandomPiece(ignore?: PieceArgs) {
        let possiblePieces = [
            IPiece,
            SPiece,
            TPiece,
            ZPiece,
            OPiece,
            JPiece,
            LPiece,
        ];

        // remove the given ignore piece (so it doesn't appear again)
        if (ignore) {
            possiblePieces = possiblePieces.filter((piece) => piece !== ignore);
        }

        const choose = getRandomInt(0, possiblePieces.length - 1);

        return possiblePieces[choose];
    }

    /**
     * The 'ghost piece' is always mirroring the 'active piece', but its positioned in the last possible position (close to the stack or the end of the grid).
     */
    private updateGhostPiecePosition() {
        if (!this.activePiece || !this.ghostPiece) {
            return;
        }

        const position = this.grid.findLastPossiblePosition(this.activePiece);

        this.ghostPiece.setRotation(this.activePiece.getRotation());
        this.grid.addPiece(this.ghostPiece, position, false);
    }

    /**
     * Move this piece downward continuously until it reaches either the stack, or the bottom of the grid.
     */
    private hardDrop(piece: Piece) {
        const position = this.grid.findLastPossiblePosition(piece);

        this.grid.clearPiece(piece);
        this.grid.addPiece(piece, position);

        // force the count to the limit so a new piece is added immediately after
        this.delayCount = this.delayLimit;
    }

    /**
     * Clear the game state, remove all the elements, etc.
     */
    clear() {
        this.setPaused(false);

        this.timer.reset();
        this.activePiece = null;
        this.ghostPiece = null;
        this.softDropActive = false;

        this.stageActions.clean();
    }

    /**
     * Increase the downward movement of the active piece.
     */
    private startSoftDrop() {
        this.softDropActive = true;
    }

    /**
     * Back to the normal movement.
     */
    private stopSoftDrop() {
        this.softDropActive = false;
    }

    /**
     * Get the current active piece object.
     */
    private getActivePiece() {
        return this.activePiece;
    }

    /**
     * A line in the stack has been cleared.
     * Update the menus, and check if we reached a new level.
     */
    private oneMoreClearedLine() {
        const currentLevel = this.level.getLevel();
        const totalLinesCleared = this.score.lineCleared(currentLevel);

        // move up one level, once the number of cleared lines is reached
        if (totalLinesCleared % this.getOption("linesToLevelUp") === 0) {
            this.level.setLevel(currentLevel + 1);
        }
    }

    /**
     * Show a message in the game menu.
     * When the same message is trying to be shown, it will show a counter of the times it was tried.
     */
    private showMessage(text: string) {
        this.dispatch({
            type: "message",
            message: text,
        });
    }

    /**
     * Game has ended, Pause the game and dispatch the appropriate actions.
     */
    private end() {
        this.setPaused(true);

        const time = this.timer.getTimeMilliseconds();
        const level = this.level.getLevel();
        const score = {
            score: this.score.getCurrentScore(),
            linesCleared: this.score.getLinesCleared(),
            time,
            level,
        };

        this.dispatch({
            type: "end",
            score,
        });
    }

    /**
     * Clear the current message.
     */
    private clearMessage() {
        this.dispatch({
            type: "message",
            message: "",
        });
    }

    /**
     * Pause/resume the game.
     */
    setPaused(state: boolean) {
        createjs.Ticker.paused = state;

        this.keysHeld.leftArrow = false;
        this.keysHeld.rightArrow = false;

        if (this.activePiece) {
            this.stopSoftDrop();
        }

        // stop/resume the timer
        if (state === true) {
            this.timer.stop();
        } else {
            this.timer.resume();
        }
    }

    /**
     * Tells if the game is currently paused or not.
     */
    isPaused() {
        return createjs.Ticker.paused;
    }

    /**
     * Deals with the keyboard shortcuts/controls.
     */
    keyDownListener(event: KeyboardEvent) {
        if (this.isPaused()) {
            return true;
        }

        switch (event.code) {
            case "ArrowLeft":
                this.keysHeld.leftArrow = true;
                return false;

            case "ArrowRight":
                this.keysHeld.rightArrow = true;
                return false;

            case "ArrowDown":
                this.startSoftDrop();
                return false;
        }

        return true;
    }

    /**
     * Deals with the keyboard shortcuts/controls.
     */
    keyUpListener(event: KeyboardEvent) {
        if (this.isPaused()) {
            return true;
        }

        const activePiece = this.getActivePiece();

        switch (event.code) {
            case "ArrowLeft":
                this.keysHeld.leftArrow = false;
                return false;

            case "ArrowRight":
                this.keysHeld.rightArrow = false;
                return false;

            case "ArrowDown":
                this.stopSoftDrop();
                return false;

            case "Space":
                if (activePiece) {
                    this.hardDrop(activePiece);
                }
                return false;

            case "KeyA":
                if (activePiece) {
                    const rotation = activePiece.getLeftRotation();
                    const rotated = this.grid.rotatePiece(
                        activePiece,
                        rotation
                    );

                    if (rotated) {
                        this.clearMessage();
                        this.updateGhostPiecePosition();
                    } else {
                        this.showMessage("Couldn't rotate left!");
                    }
                }
                return false;

            case "KeyD":
                if (activePiece) {
                    const rotation = activePiece.getRightRotation();
                    const rotated = this.grid.rotatePiece(
                        activePiece,
                        rotation
                    );

                    if (rotated) {
                        this.clearMessage();
                        this.updateGhostPiecePosition();
                    } else {
                        this.showMessage("Couldn't rotate right!");
                    }
                }
                return false;
        }

        return true;
    }

    /**
     * Deals with the movement of the active piece.
     * Checks when we need to add a new piece to the game.
     * Redraws the game.
     */
    tick(event: createjs.TickerEvent) {
        if (createjs.Ticker.paused) {
            return;
        }

        const delta = event.delta;

        // move the piece to the position below
        const moved = this.tickDownMovement(delta);

        if (!moved) {
            this.newPiece();
        } else {
            // move the active piece to the left/right
            this.tickHorizontalMovement(delta);
        }

        this.stageActions.update();
    }

    /**
     * Deal with the horizontal movement of the active piece.
     */
    private tickHorizontalMovement(deltaTime: number) {
        this.horizontalCount += deltaTime;

        if (this.horizontalCount >= this.horizontalLimit && this.activePiece) {
            // move left
            if (this.keysHeld.leftArrow) {
                this.horizontalCount = 0;
                this.grid.movePiece(this.activePiece, -1, 0);
                this.updateGhostPiecePosition();
            }

            // move right
            else if (this.keysHeld.rightArrow) {
                this.horizontalCount = 0;
                this.grid.movePiece(this.activePiece, 1, 0);
                this.updateGhostPiecePosition();
            }
        }
    }

    /**
     * Move the active piece to the position below, at a given interval (based on the delay count/limit).
     * Returns a boolean that tells whether the active piece was able to move down or not.
     */
    private tickDownMovement(delta: number) {
        let limit = this.delayLimit;

        // move the active piece to the bottom (if the limit has been reached)
        this.delayCount += delta;

        // move faster if the soft drop is active
        if (this.softDropActive) {
            limit = this.softDropDelay;
        }

        if (this.delayCount >= limit && this.activePiece) {
            this.delayCount = 0;

            // move bottom
            return this.grid.movePiece(this.activePiece, 0, 1);
        }

        return true;
    }
}
