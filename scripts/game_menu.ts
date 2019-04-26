import * as MainMenu from "./main_menu.js";

export interface InitArgs {
    togglePaused: () => void;
    clearGame: () => void;
}

let GAME_MENU: HTMLElement; // the container of the game menu

/**
 * Initialize the game menu elements.
 */
export function init(args: InitArgs) {
    GAME_MENU = document.getElementById("GameMenu")!;

    // :: Cleared Lines :: //

    var clearedLines = GAME_MENU.querySelector(
        "#GameMenu-clearedLines span"
    ) as HTMLElement;
    clearedLines.innerText = "0";

    // :: Pause / Resume :: //

    var pauseResume = document.getElementById("GameMenu-pauseResume")!;
    pauseResume.addEventListener("click", args.togglePaused);

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
