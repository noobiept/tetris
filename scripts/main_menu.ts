import * as Options from "./options.js";
import * as Game from "./game.js";
import { createSlider } from "./slider.js";
import { getHighScores } from "./high_score.js";
import { timeToString } from "./utilities.js";

interface MenuPages {
    main: HTMLElement;
    options: HTMLElement;
    highScores: HTMLElement;
    help: HTMLElement;
}

var PAGES: MenuPages;

// current active (shown) menu
// either the main menu, options menu or the help menu
var ACTIVE_MENU: HTMLElement | undefined;

/**
 * Initialize the main menu.
 */
export function init() {
    PAGES = {
        main: document.getElementById("MainMenu")!,
        options: document.getElementById("Options")!,
        highScores: document.getElementById("HighScores")!,
        help: document.getElementById("Help")!,
    };

    initMainMenu();
    initOptions();
    initHighScores();
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
    var back = PAGES.options.querySelector(".backButton") as HTMLElement;
    back.onclick = function() {
        Options.save();
        open("main");
    };
}

/**
 * Initialize the high-scores menu elements.
 */
function initHighScores() {
    const back = PAGES.highScores.querySelector(".backButton") as HTMLElement;
    back.onclick = function() {
        open("main");
    };
}

/**
 * Initialize the help menu elements.
 */
function initHelp() {
    var back = PAGES.help.querySelector(".backButton") as HTMLElement;
    back.onclick = function() {
        open("main");
    };
}

/**
 * Initialize the main menu elements.
 */
function initMainMenu() {
    const startGame = document.getElementById("MainMenu-startGame")!;
    const options = document.getElementById("MainMenu-options")!;
    const highScores = document.getElementById("MainMenu-highScores")!;
    const help = document.getElementById("MainMenu-help")!;

    // set events
    startGame.onclick = function() {
        hideMenu();
        Game.start();
    };

    options.onclick = function() {
        open("options");
    };

    highScores.onclick = function() {
        updateHighScoreTable();
        open("highScores");
    };

    help.onclick = function() {
        open("help");
    };
}

/**
 * Open the given page in the main menu.
 */
export function open(pageName: keyof MenuPages) {
    hideMenu();

    ACTIVE_MENU = PAGES[pageName];
    ACTIVE_MENU.classList.remove("hide");
}

/**
 * Hide the currently active menu.
 */
function hideMenu() {
    if (ACTIVE_MENU) {
        ACTIVE_MENU.classList.add("hide");
    }
}

/**
 * Update the high-score table with the most recent scores.
 */
function updateHighScoreTable() {
    const scores = getHighScores();
    const container = document.getElementById("HighScores-table")!;

    // clear the previous table
    container.innerHTML = "";

    // add the headers
    const headers = ["", "Score", "Lines Cleared", "Time"];
    const tr = document.createElement("tr");

    for (let a = 0; a < headers.length; a++) {
        const name = headers[a];
        const th = document.createElement("th");

        th.innerText = name;
        tr.appendChild(th);
    }

    container.appendChild(tr);

    // add the scores
    for (let a = 0; a < scores.length; a++) {
        const score = scores[a];
        const tr = document.createElement("tr");
        const position = document.createElement("td");
        const scoreTd = document.createElement("td");
        const linesCleared = document.createElement("td");
        const time = document.createElement("td");

        position.innerText = (a + 1).toString();
        scoreTd.innerText = score.score.toString();
        linesCleared.innerText = score.linesCleared.toString();
        time.innerText = timeToString(score.time);

        tr.appendChild(position);
        tr.appendChild(scoreTd);
        tr.appendChild(linesCleared);
        tr.appendChild(time);

        container.appendChild(tr);
    }
}
