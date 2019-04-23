import * as Options from "./options.js";
import * as MainMenu from "./main_menu.js";
import * as Utilities from "./utilities.js";
import Grid from "./grid.js";
import Square from "./square.js";
import { STAGE, CANVAS } from "./main.js";
import {
    IPiece,
    SPiece,
    TPiece,
    ZPiece,
    OPiece,
    JPiece,
    LPiece,
} from "./all_pieces.js";
import Piece, { PieceArgs } from "./piece.js";

// number of milliseconds until the active piece moves down 1 position
var DELAY_LIMIT = 0;
var DELAY_COUNT = 0;

// time between the horizontal move of a piece
var HORIZONTAL_LIMIT = 75;
var HORIZONTAL_COUNT = 0;

// time between the downward movement of the active piece
// it is reduced as the current level increases
// value is in milliseconds (drops 20% per level)
var DELAY_PER_LEVEL = [600, 480, 384, 307, 246, 197, 157, 126, 101, 81];

var SOFT_DROP_ACTIVE = false;
var CURRENT_LEVEL = 0;

// number of cleared lines so far (count)
var CLEARED_LINES = 0;

var GAME_MENU_WIDTH; // in pixels
var MESSAGE_COUNT; // reference to the message's count html element
var MESSAGE_TEXT; // reference to the message's text html element

// current active piece on the map (falling)
var ACTIVE_PIECE = null;

// has the next piece class (so, 'IPiece' or 'TPiece', etc)
var NEXT_PIECE_ARGS: PieceArgs | null = null;
var NEXT_PIECE = null; // has the next piece object

var GRID;

// keys being pressed/held
var KEYS_HELD = {
    leftArrow: false, // move left
    rightArrow: false, // move right
};

/**
 * Start a new game.
 */
export function start() {
    var numberOfColumns = Options.getNumberOfColumns();
    var numberOfLines = Options.getNumberOfLines();

    setLevel(Options.getStartingLevel());

    CLEARED_LINES = 0;

    GRID = new Grid(numberOfColumns, numberOfLines);

    GAME_MENU_WIDTH = $("#GameMenu").width();
    MESSAGE_COUNT = document.getElementById("MessageCount");
    MESSAGE_TEXT = document.getElementById("MessageText");

    // resize the canvas, according to the grid's dimension
    CANVAS.width = GRID.width + GAME_MENU_WIDTH;
    CANVAS.height = GRID.height;

    NEXT_PIECE_ARGS = chooseRandomPiece();

    newPiece();
    initGameMenu();

    createjs.Ticker.addEventListener("tick", tick);

    document.addEventListener("keydown", keyDownListener);
    document.addEventListener("keyup", keyUpListener);
}

/**
 * Add a new piece to the grid.
 * The previously active piece will be part of the stack now.
 * Also check for the game ending condition (see if it doesn't collide with other squares in the stack, otherwise the game is over).
 */
export function newPiece() {
    clearMessage();

    var i;
    var square;

    if (ACTIVE_PIECE) {
        // the previous active piece now is part of the stack
        for (i = 0; i < ACTIVE_PIECE.all_squares.length; i++) {
            square = ACTIVE_PIECE.all_squares[i];

            square.isInStack = true;
        }

        // check if any line is cleared (since we're adding a new piece, means the previous one is part of the stack, so the right moment to clear the lines)
        GRID.checkClearedLines();
    }

    // the next piece is the one determined before
    var pieceArgs = NEXT_PIECE_ARGS;
    var rotation = pieceArgs.possibleRotations[0];

    // center the element in the grid
    var pivotColumn = Math.floor(GRID.numberOfColumns / 2);
    var pivotLine = 0;
    var gridSquare;
    var column, line;

    // check if the piece will collide with an existing square in the stack (if so, its game over, the stack has reached the top)
    for (i = 0; i < rotation.length; i++) {
        column = pivotColumn + rotation[i].column;
        line = pivotLine + rotation[i].line;

        gridSquare = GRID.grid_array[column][line];

        if (gridSquare) {
            end();
            return;
        }
    }

    // we randomly get a new piece, for next time
    NEXT_PIECE_ARGS = chooseRandomPiece();

    // and show it in the game menu
    showNextPiece(NEXT_PIECE_ARGS);

    ACTIVE_PIECE = new Piece(pieceArgs);
    ACTIVE_PIECE.addToContainer(GRID.container);
    GRID.addPiece(ACTIVE_PIECE, pivotColumn, pivotLine);

    // reset the counter that deals with the movement of the active piece (since we added a new one)
    DELAY_COUNT = 0;
}

/**
 * Randomly choose the class of a piece.
 */
function chooseRandomPiece() {
    var possiblePieces = [
        IPiece,
        SPiece,
        TPiece,
        ZPiece,
        OPiece,
        JPiece,
        LPiece,
    ];
    var choose = Utilities.getRandomInt(0, possiblePieces.length - 1);

    return possiblePieces[choose];
}

/**
 * Initialize the game menu elements.
 */
function initGameMenu() {
    var gameMenu = document.querySelector("#GameMenu");

    // :: Cleared Lines :: //

    var clearedLines = gameMenu.querySelector("#GameMenu-clearedLines span");
    $(clearedLines).text("0");

    // :: Pause / Resume :: //

    var pauseResume = gameMenu.querySelector("#GameMenu-pauseResume");
    pauseResume.addEventListener("click", togglePaused);

    // :: Quit :: //

    var quit = gameMenu.querySelector("#GameMenu-quit");

    quit.addEventListener("click", function() {
        clear();
        MainMenu.open();
    });

    // :: Game Menu :: //

    // show the menu
    $(gameMenu).removeClass("hide");

    // need to set the height of the menu to the same height of the canvas, so that it is position correctly
    $(gameMenu).css("height", CANVAS.height + "px");
}

/**
 * Shows an image of the next piece to fall, in the game menu.
 */
function showNextPiece(nextPieceArgs) {
    if (NEXT_PIECE) {
        NEXT_PIECE.remove();
        NEXT_PIECE = null;
    }

    var piece = new Piece(nextPieceArgs);

    piece.positionIn(GRID.width + GAME_MENU_WIDTH / 2 - Square.size / 2, 20);
    piece.addToContainer(STAGE);

    NEXT_PIECE = piece;
}

/**
 * Remove the tick and keyboard listeners.
 */
function clearEvents() {
    createjs.Ticker.removeEventListener("tick", tick);

    document.addEventListener("keydown", keyDownListener);
    document.addEventListener("keyup", keyUpListener);
}

/**
 * Clear the game state, remove all the elements, etc.
 */
function clear() {
    clearEvents();
    setPaused(false);

    $("#GameMenu").addClass("hide");

    ACTIVE_PIECE = null;
    GRID = null;
    SOFT_DROP_ACTIVE = false;

    STAGE.removeAllChildren();
    STAGE.update();
}

/**
 * Increase the downward movement of the active piece.
 */
function startSoftDrop() {
    SOFT_DROP_ACTIVE = true;
}

/**
 * Back to the normal movement.
 */
function stopSoftDrop() {
    SOFT_DROP_ACTIVE = false;
}

/**
 * Get the current active piece object.
 */
function getActivePiece() {
    return ACTIVE_PIECE;
}

/**
 * A line in the stack has been cleared.
 * Update the menus, and check if we reached a new level.
 */
export function oneMoreClearedLine() {
    CLEARED_LINES++;

    $("#GameMenu-clearedLines span").text(CLEARED_LINES);

    // move up one level, once the number of cleared lines is reached
    if (CLEARED_LINES % Options.getLinesToLevelUp() === 0) {
        setLevel(CURRENT_LEVEL + 1);
    }
}

/**
 * Set the current level. Will influence the difficulty of the game.
 */
function setLevel(level) {
    var maxLevel = DELAY_PER_LEVEL.length;
    var text;

    if (level >= maxLevel - 1) {
        level = maxLevel - 1;
        text = "max";
    } else {
        text = level + 1;
    }

    CURRENT_LEVEL = level;
    DELAY_LIMIT = DELAY_PER_LEVEL[CURRENT_LEVEL];

    document.getElementById(
        "GameMenu-currentLevel"
    ).lastElementChild.innerHTML = text;
}

/**
 * Get the maximum achievable level of the game.
 */
export function getMaxLevel() {
    return DELAY_PER_LEVEL.length;
}

/**
 * Show a message in the game menu.
 * When the same message is trying to be shown, it will show a counter of the times it was tried.
 */
export function showMessage(text) {
    var currentText = $(MESSAGE_TEXT).text();

    // same message, add to the counter
    if (text === currentText) {
        var count = Number(MESSAGE_COUNT.getAttribute("data-count")) + 1;

        MESSAGE_COUNT.setAttribute("data-count", count.toString());
        $(MESSAGE_COUNT).text(count + "x");
    } else {
        MESSAGE_COUNT.setAttribute("data-count", "0");
        $(MESSAGE_COUNT).text("");
        $(MESSAGE_TEXT).text(text);
    }
}

/**
 * Game has ended. Show a message and then restart the game.
 */
function end() {
    clearEvents();
    setPaused(true);

    $("#DialogMessage").dialog({
        modal: true,
        buttons: {
            Ok: function() {
                $(this).dialog("close");

                clear();
                start();
            },
        },
    });
}

/**
 * Clear the current message.
 */
export function clearMessage() {
    MESSAGE_COUNT.setAttribute("data-count", "0");
    MESSAGE_COUNT.innerHTML = "";
    MESSAGE_TEXT.innerHTML = "";
}

/**
 * Toggle between the pause/resume state.
 */
function togglePaused() {
    setPaused(!isPaused());
}

/**
 * Pause/resume the game.
 */
function setPaused(state) {
    createjs.Ticker.paused = state;

    KEYS_HELD.leftArrow = false;
    KEYS_HELD.rightArrow = false;

    if (ACTIVE_PIECE) {
        stopSoftDrop();
    }

    if (state) {
        $("#GameMenu-pauseResume").text("Resume");
    } else {
        $("#GameMenu-pauseResume").text("Pause");
    }
}

/**
 * Tells if the game is currently paused or not.
 */
function isPaused() {
    return createjs.Ticker.paused;
}

/**
 * Deals with the keyboard shortcuts/controls.
 */
function keyDownListener(event) {
    if (isPaused()) {
        return true;
    }

    if (!event) {
        event = window.event;
    }

    switch (event.keyCode) {
        case Utilities.EVENT_KEY.leftArrow:
            KEYS_HELD.leftArrow = true;
            return false;

        case Utilities.EVENT_KEY.rightArrow:
            KEYS_HELD.rightArrow = true;
            return false;

        case Utilities.EVENT_KEY.downArrow:
            startSoftDrop();
            return false;
    }

    return true;
}

/**
 * Deals with the keyboard shortcuts/controls.
 */
function keyUpListener(event) {
    if (isPaused()) {
        return true;
    }

    if (!event) {
        event = window.event;
    }

    var activePiece = getActivePiece();

    switch (event.keyCode) {
        case Utilities.EVENT_KEY.leftArrow:
            KEYS_HELD.leftArrow = false;
            return false;

        case Utilities.EVENT_KEY.rightArrow:
            KEYS_HELD.rightArrow = false;
            return false;

        case Utilities.EVENT_KEY.downArrow:
            stopSoftDrop();
            return false;

        case Utilities.EVENT_KEY.space:
            activePiece.hardDrop();
            return false;

        case Utilities.EVENT_KEY.a:
            activePiece.rotateLeft();
            return false;

        case Utilities.EVENT_KEY.d:
            activePiece.rotateRight();
            return false;
    }

    return true;
}

/**
 * Get the grid object. You can use it to add/move/rotate pieces, etc.
 */
export function getGrid() {
    return GRID;
}

/**
 * Deals with the movement of the active piece.
 * Checks when we need to add a new piece to the game.
 * Redraws the game.
 */
function tick(event) {
    if (createjs.Ticker.paused) {
        return;
    }

    // move the active piece to the left/right
    movement_tick(event.delta);

    // move the active piece to the bottom (if the limit has been reached)
    DELAY_COUNT += event.delta;

    var limit = DELAY_LIMIT;

    // move faster if the soft drop is active
    if (SOFT_DROP_ACTIVE) {
        limit = 40;
    }

    if (DELAY_COUNT >= limit) {
        DELAY_COUNT = 0;

        // move bottom
        var successful = GRID.movePiece(ACTIVE_PIECE, 0, 1);

        if (!successful) {
            newPiece();
        }
    }

    STAGE.update();
}

/**
 * Deal with the horizontal movement of the active piece.
 */
function movement_tick(deltaTime) {
    HORIZONTAL_COUNT += deltaTime;

    if (HORIZONTAL_COUNT >= HORIZONTAL_LIMIT) {
        // move left
        if (KEYS_HELD.leftArrow) {
            HORIZONTAL_COUNT = 0;
            GRID.movePiece(ACTIVE_PIECE, -1, 0);
        }

        // move right
        else if (KEYS_HELD.rightArrow) {
            HORIZONTAL_COUNT = 0;
            GRID.movePiece(ACTIVE_PIECE, 1, 0);
        }
    }
}
