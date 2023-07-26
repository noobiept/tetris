import * as Options from "../../options";
import * as Utilities from "../../utilities";
import * as HighScore from "../../high_score";
import Score from "../../score";
import Grid from "../../grid";
import Square from "../../square";
import {
    IPiece,
    SPiece,
    TPiece,
    ZPiece,
    OPiece,
    JPiece,
    LPiece,
    GhostPiece,
} from "../../all_pieces";
import Piece, { PieceArgs } from "../../piece";
import Timer from "../../timer";
import { StageActions } from "../stage";
import { ScoreData } from "../../high_score";
import { GameAction } from "./game-logic.reducer";

// number of milliseconds until the active piece moves down 1 position
var DELAY_LIMIT = 0;
var DELAY_COUNT = 0;

// time between the horizontal move of a piece
var HORIZONTAL_LIMIT = 75;
var HORIZONTAL_COUNT = 0;

// time between the downward movement of the active piece
// it is reduced as the current level increases
// value is in milliseconds (drops 20% per level)
const DELAY_PER_LEVEL = [600, 480, 384, 307, 246, 197, 157, 126, 101, 81];
const SOFT_DROP_DELAY = 40; // downward movement when the 'soft drop' is active

var SOFT_DROP_ACTIVE = false;
var CURRENT_LEVEL = 1; // starts at 1 instead of 0

// number of cleared lines so far (count)
var CLEARED_LINES = 0;

var ACTIVE_PIECE: Piece | null = null; // current active piece on the map (falling)
var GHOST_PIECE: Piece | null = null; // shows where the active piece will end up at if no change is made

// has the next piece class (so, 'IPiece' or 'TPiece', etc)
var NEXT_PIECE_ARGS: PieceArgs;
var NEXT_PIECE: Piece | null = null; // has the next piece object

// keys being pressed/held
var KEYS_HELD = {
    leftArrow: false, // move left
    rightArrow: false, // move right
};

export type GameEndData = ScoreData & {
    level: number;
};

export type GameMessage = {
    text: string;
    count: number;
};

export interface GameLogicArgs {
    stageActions: StageActions;
    dispatch: (action: GameAction) => void;
}

export class GameLogic {
    private score: Score;
    private timer: Timer;
    private grid: Grid;
    private stageActions: StageActions;
    private dispatch: (action: GameAction) => void;

    private onEnd?: (score: GameEndData) => void;
    private keyDownListenerRef?: (event: KeyboardEvent) => boolean;
    private keyUpListenerRef?: (event: KeyboardEvent) => boolean;
    private tickRef?: (e: Object) => void;

    /**
     * Initialize the game logic class.
     */
    constructor({ stageActions, dispatch }: GameLogicArgs) {
        this.score = new Score({
            onChange: () => {
                dispatch({
                    type: "update-score",
                    score: this.score.getCurrentScore(),
                });
            },
        });

        const interval = 1000;
        this.timer = new Timer({
            interval: interval,
            onChange: (time) => {
                // GameMenu.updateTimer(time); // TODO
                this.score.timePassed(interval);
            },
        });
        // for initialization purposes
        this.grid = new Grid({
            columns: 1,
            lines: 1,
            onLineCleared: () => {},
            addToStage: () => {},
        });

        this.stageActions = stageActions;
        this.dispatch = dispatch;
    }

    /**
     * Start a new game.
     */
    start(onEnd: (score: GameEndData) => void) {
        var numberOfColumns = Options.get("numberOfColumns");
        var numberOfLines = Options.get("numberOfLines");

        this.onEnd = onEnd;
        this.setLevel(Options.get("startingLevel"));

        CLEARED_LINES = 0;
        // GameMenu.setClearedLines(CLEARED_LINES); // TODO

        this.grid = new Grid({
            columns: numberOfColumns,
            lines: numberOfLines,
            addToStage: this.stageActions.add,
            onLineCleared: this.oneMoreClearedLine.bind(this),
        });

        // re-position the game menu
        const canvasHeight = this.grid.height;
        // GameMenu.rePosition(canvasHeight); // TODO

        // get the game width
        // GAME_MENU_WIDTH = GameMenu.getWidth(); // TODO

        NEXT_PIECE_ARGS = this.chooseRandomPiece();
        this.newPiece();

        this.timer.reset();
        this.timer.start();
        this.score.updateMultiplier(Options.get("ghostPiece"));
        this.score.reset();

        this.tickRef = (e) => this.tick(e as createjs.TickerEvent);
        this.keyDownListenerRef = this.keyDownListener.bind(this);
        this.keyUpListenerRef = this.keyUpListener.bind(this);

        createjs.Ticker.addEventListener("tick", this.tickRef);
        document.addEventListener("keydown", this.keyDownListenerRef);
        document.addEventListener("keyup", this.keyUpListenerRef);

        // return the canvas dimension, according to the 'grid' + 'game menu' dimensions
        return {
            width: this.grid.width + 185, // TODO
            height: canvasHeight,
        };
    }

    /**
     * Add a new piece to the grid.
     * The previously active piece will be part of the stack now.
     * Also check for the game ending condition (see if it doesn't collide with other squares in the stack, otherwise the game is over).
     */
    private newPiece() {
        this.clearMessage();

        if (ACTIVE_PIECE) {
            // the previous active piece now is part of the stack
            ACTIVE_PIECE.markInStack();

            // check if any line is cleared (since we're adding a new piece, means the previous one is part of the stack, so the right moment to clear the lines)
            this.grid.checkClearedLines();
        }

        // the next piece is the one determined before
        var pieceArgs = NEXT_PIECE_ARGS;
        var rotation = pieceArgs.possibleRotations[0];

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
        NEXT_PIECE_ARGS = this.chooseRandomPiece(pieceArgs);

        // and show it in the game menu
        this.showNextPiece(NEXT_PIECE_ARGS);

        // only one ghost piece in the game
        if (GHOST_PIECE) {
            GHOST_PIECE.remove();
        }

        // add the ghost piece
        if (Options.get("ghostPiece")) {
            GHOST_PIECE = new Piece({
                ...pieceArgs,
                ...GhostPiece,
            });
            this.grid.addToContainer(GHOST_PIECE);
        }

        // add the active piece (added after the ghost piece so it is drawn on top of it (if matching the same space)
        ACTIVE_PIECE = new Piece(pieceArgs);
        this.grid.addToContainer(ACTIVE_PIECE);
        this.grid.addPiece(ACTIVE_PIECE, pivotPosition);

        // needs to be updated after we add the active piece
        this.updateGhostPiecePosition();

        // reset the counter that deals with the movement of the active piece (since we added a new one)
        DELAY_COUNT = 0;
    }

    /**
     * Randomly choose the class of a piece.
     */
    private chooseRandomPiece(ignore?: PieceArgs) {
        var possiblePieces = [
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

        var choose = Utilities.getRandomInt(0, possiblePieces.length - 1);

        return possiblePieces[choose];
    }

    /**
     * Shows an image of the next piece to fall, in the game menu.
     */
    private showNextPiece(nextPieceArgs: PieceArgs) {
        if (NEXT_PIECE) {
            NEXT_PIECE.remove();
            NEXT_PIECE = null;
        }

        var piece = new Piece(nextPieceArgs);

        piece.positionIn(this.grid.width + 185 / 2 - Square.size / 2, 20); // TODO
        this.stageActions.addPiece(piece);

        NEXT_PIECE = piece;
    }

    /**
     * The 'ghost piece' is always mirroring the 'active piece', but its positioned in the last possible position (close to the stack or the end of the grid).
     */
    private updateGhostPiecePosition() {
        if (!ACTIVE_PIECE || !GHOST_PIECE) {
            return;
        }

        const position = this.grid.findLastPossiblePosition(ACTIVE_PIECE);

        GHOST_PIECE.setRotation(ACTIVE_PIECE.getRotation());
        this.grid.addPiece(GHOST_PIECE, position, false);
    }

    /**
     * Move this piece downward continuously until it reaches either the stack, or the bottom of the grid.
     */
    private hardDrop(piece: Piece) {
        const position = this.grid.findLastPossiblePosition(piece);

        this.grid.clearPiece(piece);
        this.grid.addPiece(piece, position);

        // force the count to the limit so a new piece is added immediately after
        DELAY_COUNT = DELAY_LIMIT;
    }

    /**
     * Remove the tick and keyboard listeners.
     */
    private clearEvents() {
        createjs.Ticker.removeEventListener("tick", this.tick);

        if (this.keyDownListenerRef) {
            document.removeEventListener("keydown", this.keyDownListenerRef);
        }
        if (this.keyUpListenerRef) {
            document.removeEventListener("keyup", this.keyUpListenerRef);
        }
    }

    /**
     * Clear the game state, remove all the elements, etc.
     */
    clear() {
        this.clearEvents();
        this.setPaused(false);
        // GameMenu.hide(); // TODO

        this.timer.reset();
        ACTIVE_PIECE = null;
        GHOST_PIECE = null;
        SOFT_DROP_ACTIVE = false;

        this.stageActions.clean();
    }

    /**
     * Increase the downward movement of the active piece.
     */
    private startSoftDrop() {
        SOFT_DROP_ACTIVE = true;
    }

    /**
     * Back to the normal movement.
     */
    private stopSoftDrop() {
        SOFT_DROP_ACTIVE = false;
    }

    /**
     * Get the current active piece object.
     */
    private getActivePiece() {
        return ACTIVE_PIECE;
    }

    /**
     * A line in the stack has been cleared.
     * Update the menus, and check if we reached a new level.
     */
    private oneMoreClearedLine() {
        CLEARED_LINES++;
        // GameMenu.setClearedLines(CLEARED_LINES); // TODO

        this.score.lineCleared(CURRENT_LEVEL);

        // move up one level, once the number of cleared lines is reached
        if (CLEARED_LINES % Options.get("linesToLevelUp") === 0) {
            this.setLevel(CURRENT_LEVEL + 1);
        }
    }

    /**
     * Set the current level. Will influence the difficulty of the game.
     */
    private setLevel(level: number) {
        if (level < 1) {
            level = 1;
        }

        var maxLevel = this.getMaxLevel();

        if (level >= maxLevel) {
            level = maxLevel;
        }

        CURRENT_LEVEL = level;
        DELAY_LIMIT = DELAY_PER_LEVEL[CURRENT_LEVEL - 1];

        // GameMenu.setCurrentLevel(CURRENT_LEVEL, maxLevel); // TODO
    }

    /**
     * Get the maximum achievable level of the game.
     */
    private getMaxLevel() {
        return DELAY_PER_LEVEL.length;
    }

    /**
     * Show a message in the game menu.
     * When the same message is trying to be shown, it will show a counter of the times it was tried.
     */
    private showMessage(text: string) {
        // TODO
        // const currentText = MESSAGE_TEXT.innerText;
        // // same message, add to the counter
        // if (text === currentText) {
        //     const dataCount = MESSAGE_COUNT.getAttribute("data-count")!;
        //     const count = parseInt(dataCount, 10) + 1;
        //     MESSAGE_COUNT.setAttribute("data-count", count.toString());
        //     MESSAGE_COUNT.innerText = count + "x";
        // } else {
        //     MESSAGE_COUNT.setAttribute("data-count", "1");
        //     MESSAGE_COUNT.innerText = "";
        //     MESSAGE_TEXT.innerText = text;
        // }
    }

    /**
     * Game has ended. Show a message and then restart the game.
     */
    private end() {
        this.clearEvents();
        this.setPaused(true);

        const score = this.score.getCurrentScore();
        const time = this.timer.getCount();

        this.onEnd?.({
            score,
            linesCleared: CLEARED_LINES, // TODO
            time,
            level: CURRENT_LEVEL, // TODO
        });
    }

    /**
     * Save the current score and clear the game state.
     */
    quitGame() {
        const score = this.score.getCurrentScore();
        const time = this.timer.getCount();

        HighScore.add({
            score: score,
            linesCleared: CLEARED_LINES,
            time: time,
        });

        this.clear();
    }

    /**
     * Clear the current message.
     */
    private clearMessage() {
        // TODO
        // MESSAGE_COUNT.setAttribute("data-count", "0");
        // MESSAGE_COUNT.innerHTML = "";
        // MESSAGE_TEXT.innerHTML = "";
    }

    /**
     * Toggle between the pause/resume state.
     */
    togglePaused() {
        this.setPaused(!this.isPaused());
    }

    /**
     * Pause/resume the game.
     */
    setPaused(state: boolean) {
        createjs.Ticker.paused = state;

        KEYS_HELD.leftArrow = false;
        KEYS_HELD.rightArrow = false;

        if (ACTIVE_PIECE) {
            this.stopSoftDrop();
        }

        // stop/resume the timer
        if (state === true) {
            this.timer.stop();
        } else {
            this.timer.start();
        }

        // GameMenu.updatePauseResume(state); // TODO
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
    private keyDownListener(event: KeyboardEvent) {
        if (this.isPaused()) {
            return true;
        }

        switch (event.keyCode) {
            case Utilities.EVENT_KEY.leftArrow:
                KEYS_HELD.leftArrow = true;
                return false;

            case Utilities.EVENT_KEY.rightArrow:
                KEYS_HELD.rightArrow = true;
                return false;

            case Utilities.EVENT_KEY.downArrow:
                this.startSoftDrop();
                return false;
        }

        return true;
    }

    /**
     * Deals with the keyboard shortcuts/controls.
     */
    private keyUpListener(event: KeyboardEvent) {
        if (this.isPaused()) {
            return true;
        }

        var activePiece = this.getActivePiece();

        switch (event.keyCode) {
            case Utilities.EVENT_KEY.leftArrow:
                KEYS_HELD.leftArrow = false;
                return false;

            case Utilities.EVENT_KEY.rightArrow:
                KEYS_HELD.rightArrow = false;
                return false;

            case Utilities.EVENT_KEY.downArrow:
                this.stopSoftDrop();
                return false;

            case Utilities.EVENT_KEY.space:
                if (activePiece) {
                    this.hardDrop(activePiece);
                }
                return false;

            case Utilities.EVENT_KEY.a:
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

            case Utilities.EVENT_KEY.d:
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
    private tick(event: createjs.TickerEvent) {
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
        HORIZONTAL_COUNT += deltaTime;

        if (HORIZONTAL_COUNT >= HORIZONTAL_LIMIT && ACTIVE_PIECE) {
            // move left
            if (KEYS_HELD.leftArrow) {
                HORIZONTAL_COUNT = 0;
                this.grid.movePiece(ACTIVE_PIECE, -1, 0);
                this.updateGhostPiecePosition();
            }

            // move right
            else if (KEYS_HELD.rightArrow) {
                HORIZONTAL_COUNT = 0;
                this.grid.movePiece(ACTIVE_PIECE, 1, 0);
                this.updateGhostPiecePosition();
            }
        }
    }

    /**
     * Move the active piece to the position below, at a given interval (based on the delay count/limit).
     * Returns a boolean that tells whether the active piece was able to move down or not.
     */
    private tickDownMovement(delta: number) {
        let limit = DELAY_LIMIT;

        // move the active piece to the bottom (if the limit has been reached)
        DELAY_COUNT += delta;

        // move faster if the soft drop is active
        if (SOFT_DROP_ACTIVE) {
            limit = SOFT_DROP_DELAY;
        }

        if (DELAY_COUNT >= limit && ACTIVE_PIECE) {
            DELAY_COUNT = 0;

            // move bottom
            return this.grid.movePiece(ACTIVE_PIECE, 0, 1);
        }

        return true;
    }
}
