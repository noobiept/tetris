import * as MainMenu from "./main_menu.js";

export interface InitArgs {
    togglePaused: () => void;
    clearGame: () => void;
}

let GAME_MENU: HTMLElement; // the container of the game menu
let CLEARED_LINES: HTMLElement;
let CURRENT_LEVEL: HTMLElement;
let PAUSE_RESUME: HTMLElement;
let TIMER: HTMLElement;

/**
 * Initialize the game menu elements.
 */
export function init(args: InitArgs) {
    GAME_MENU = document.getElementById("GameMenu")!;

    // :: Cleared Lines :: //
    CLEARED_LINES = GAME_MENU.querySelector(
        "#GameMenu-clearedLines span"
    ) as HTMLElement;

    // :: Current Level :: //
    CURRENT_LEVEL = GAME_MENU.querySelector(
        "#GameMenu-currentLevel span"
    ) as HTMLElement;

    // :: Timer :: //
    TIMER = document.getElementById("GameMenu-timer")!;

    // :: Pause / Resume :: //
    PAUSE_RESUME = document.getElementById("GameMenu-pauseResume")!;
    PAUSE_RESUME.addEventListener("click", args.togglePaused);

    // :: Quit :: //
    var quit = document.getElementById("GameMenu-quit")!;
    quit.addEventListener("click", function() {
        args.clearGame();
        MainMenu.open();
    });
}

/**
 * Reposition the game menu on the right part of the canvas (needs to be called on the start of a new game).
 */
export function rePosition(canvasHeight: number) {
    // show the menu
    GAME_MENU.classList.remove("hide");

    // need to set the height of the menu to the same height of the canvas, so that it is position correctly
    GAME_MENU.style.height = canvasHeight + "px";
}

/**
 * Return the width in pixels of the game menu container.
 */
export function getWidth() {
    const rect = GAME_MENU.getBoundingClientRect();
    return rect.width;
}

/**
 * Hide the game menu UI elements.
 */
export function hide() {
    GAME_MENU.classList.add("hide");
}

/**
 * Update the number of cleared lines value.
 */
export function setClearedLines(value: number) {
    CLEARED_LINES.innerText = value.toString();
}

/**
 * Update the current level value.
 */
export function setCurrentLevel(level: number, maxLevel: number) {
    var text = "";

    if (level >= maxLevel) {
        text = "max";
    } else {
        text = level.toString();
    }

    CURRENT_LEVEL.innerHTML = text;
}

/**
 * Update the text of the pause/resume button (based on the current game pause state).
 */
export function updatePauseResume(paused: boolean) {
    if (paused) {
        PAUSE_RESUME.innerText = "Resume";
    } else {
        PAUSE_RESUME.innerText = "Pause";
    }
}

/**
 * Update the timer UI. We receive the time value in milliseconds.
 */
export function updateTimer(timeMilliseconds: number) {
    const seconds = timeMilliseconds / 1000;
    TIMER.innerText = seconds.toFixed(1) + "s";
}
