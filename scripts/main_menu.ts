import * as Options from "./options.js";
import * as Game from "./game.js";
import * as Utilities from "./utilities.js";
import { CANVAS } from "./main.js";

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

    rePosition();
}

/**
 * Open the options menu.
 */
export function openOptions() {
    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }

    ACTIVE_MENU = OPTIONS_MENU;
    OPTIONS_MENU.classList.remove("hide");

    // :: number of columns :: //

    var columns = document.getElementById("Options-numberOfColumns")!;
    var columnsSpan = columns.querySelector("span")!;

    var numberOfColumns = Options.getNumberOfColumns();

    $(columnsSpan).text(numberOfColumns);

    var columnsSlider = document.getElementById(
        "Options-numberOfColumns-slider"
    )!;

    $(columnsSlider).slider({
        min: 10,
        max: 20,
        step: 1,
        value: numberOfColumns,
        range: "min",
        slide: function(event, ui) {
            const value = ui.value;

            if (value) {
                $(columnsSpan).text(value);

                Options.setNumberOfColumns(Math.round(value));
                rePosition();
            }
        },
    });

    // :: number of lines :: //

    var lines = document.getElementById("Options-numberOfLines")!;
    var linesSpan = lines.querySelector("span")!;
    var numberOfLines = Options.getNumberOfLines();

    $(linesSpan).text(numberOfLines);

    var linesSlider = document.getElementById("Options-numberOfLines-slider")!;

    $(linesSlider).slider({
        min: 15,
        max: 25,
        step: 1,
        value: numberOfLines,
        range: "min",
        slide: function(event, ui) {
            const value = ui.value;

            if (value) {
                $(linesSpan).text(value);

                Options.setNumberOfLines(Math.round(value));
                rePosition();
            }
        },
    });

    // :: starting level :: //

    var level = document.getElementById("Options-startingLevel")!;
    var levelSpan = level.querySelector("span")!;
    var startingLevel = Options.getStartingLevel();

    $(levelSpan).text(startingLevel + 1);

    var levelSlider = document.getElementById("Options-startingLevel-slider")!;

    $(levelSlider).slider({
        min: 1,
        max: Game.getMaxLevel(),
        step: 1,
        value: startingLevel + 1,
        range: "min",
        slide: function(event, ui) {
            const value = ui.value;

            if (value) {
                $(levelSpan).text(value);

                Options.setStartingLevel(Math.round(value) - 1);
                rePosition();
            }
        },
    });

    // :: Required Lines to Level Up :: //

    var linesToLevel = document.getElementById("Options-linesToLevelUp")!;
    var linesToLevelSpan = linesToLevel.querySelector("span")!;
    var linesToLevelValue = Options.getLinesToLevelUp();

    $(linesToLevelSpan).text(linesToLevelValue);

    var linesToLevelSlider = document.getElementById(
        "Options-linesToLevelUp-slider"
    )!;

    $(linesToLevelSlider).slider({
        min: 1,
        max: 15,
        step: 1,
        value: linesToLevelValue,
        range: "min",
        slide: function(event, ui) {
            const value = ui.value;

            if (value) {
                $(linesToLevelSpan).text(value);

                Options.setLinesToLevelUp(Math.round(value));
                rePosition();
            }
        },
    });

    // :: Other :: //

    var back = document.getElementById("Options-back")!;

    back.onclick = function() {
        Options.save();
        open();
    };

    rePosition();
}

/**
 * Open the help menu.
 */
export function openHelp() {
    var back = document.getElementById("Help-back")!;
    back.onclick = function() {
        open();
    };

    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }

    ACTIVE_MENU = HELP_MENU;
    ACTIVE_MENU.classList.remove("hide");

    rePosition();
}

/**
 * Re-center the menu elements.
 */
export function rePosition() {
    if (ACTIVE_MENU) {
        Utilities.centerElement(ACTIVE_MENU);
    }
}
