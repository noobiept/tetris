import * as Options from "./options.js";
import * as Game from "./game.js";
import * as Utilities from "./utilities.js";
import { CANVAS } from "./main.js";
import { createSlider } from "./slider.js";

// reference to the html elements
var MAIN_MENU: HTMLElement;
var OPTIONS_MENU: HTMLElement;
var HELP_MENU: HTMLElement;

// current active (shown) menu
// either the main menu, options menu or the help menu
var ACTIVE_MENU: HTMLElement | undefined;

// the canvas dimensions (for the main menu only, it may change for the game)
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 450;

/**
 * Initialize the main menu.
 */
export function init() {
    MAIN_MENU = document.getElementById("MainMenu")!;
    OPTIONS_MENU = document.getElementById("Options")!;
    HELP_MENU = document.getElementById("Help")!;

    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;

    initMainMenu();
    initOptions();
    initHelp();
}

/**
 * Initialize the options elements (sliders, etc).
 */
function initOptions() {
    const optionsContainer = document.getElementById("Options-container")!;

    // :: number of columns :: //
    const columns = createSlider({
        min: 10,
        max: 20,
        step: 1,
        initialValue: Options.getNumberOfColumns(),
        description: "Columns: ",
        onSlide: (value: number) => {
            Options.setNumberOfColumns(value);
        },
    });
    optionsContainer.appendChild(columns);

    // :: number of lines :: //
    const lines = createSlider({
        min: 15,
        max: 25,
        step: 1,
        initialValue: Options.getNumberOfLines(),
        description: "Lines: ",
        onSlide: (value: number) => {
            Options.setNumberOfLines(value);
        },
    });
    optionsContainer.appendChild(lines);

    // :: starting level :: //
    const level = createSlider({
        min: 1,
        max: Game.getMaxLevel(),
        step: 1,
        initialValue: Options.getStartingLevel() + 1,
        description: "Starting level: ",
        onSlide: (value: number) => {
            Options.setStartingLevel(value - 1);
        },
    });
    optionsContainer.appendChild(level);

    // :: required lines to level up :: //
    const linesToLevelUp = createSlider({
        min: 1,
        max: 15,
        step: 1,
        initialValue: Options.getLinesToLevelUp(),
        description: "Lines to level up: ",
        onSlide: (value: number) => {
            Options.setLinesToLevelUp(value);
        },
    });
    optionsContainer.appendChild(linesToLevelUp);

    // :: back :: //
    var back = document.getElementById("Options-back")!;
    back.onclick = function() {
        Options.save();
        open();
    };
}

/**
 * Initialize the help menu elements.
 */
function initHelp() {
    var back = document.getElementById("Help-back")!;
    back.onclick = function() {
        open();
    };
}

/**
 * Initialize the main menu elements.
 */
function initMainMenu() {
    var startGame = document.getElementById("MainMenu-startGame")!;
    var options = document.getElementById("MainMenu-options")!;
    var help = document.getElementById("MainMenu-help")!;

    // set events
    startGame.onclick = function() {
        if (ACTIVE_MENU) {
            ACTIVE_MENU.classList.add("hide");
        }

        Game.start();
    };

    options.onclick = function() {
        openOptions();
    };

    help.onclick = function() {
        openHelp();
    };
}

/**
 * Open the main menu.
 * You can start the game, open the options or the help menu from this.
 */
export function open() {
    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }

    ACTIVE_MENU = MAIN_MENU;
    ACTIVE_MENU.classList.remove("hide");
}

/**
 * Open the options menu.
 */
function openOptions() {
    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }

    ACTIVE_MENU = OPTIONS_MENU;
    OPTIONS_MENU.classList.remove("hide");
}

/**
 * Open the help menu.
 */
export function openHelp() {
    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }

    ACTIVE_MENU = HELP_MENU;
    ACTIVE_MENU.classList.remove("hide");
}
