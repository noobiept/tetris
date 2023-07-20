import * as Options from "./options";
import * as Game from "./features/game/game";
import { createSlider } from "./slider";
import { getHighScores } from "./high_score";
import { timeToString } from "./utilities";

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
        initialValue: Options.get("numberOfColumns"),
        description: "Columns: ",
        onSlide: (value: number) => {
            Options.set("numberOfColumns", value);
        },
    });
    optionsContainer.appendChild(columns);

    // :: number of lines :: //
    const lines = createSlider({
        min: 15,
        max: 25,
        step: 1,
        initialValue: Options.get("numberOfLines"),
        description: "Lines: ",
        onSlide: (value: number) => {
            Options.set("numberOfLines", value);
        },
    });
    optionsContainer.appendChild(lines);

    // :: starting level :: //
    const level = createSlider({
        min: 1,
        max: Game.getMaxLevel(),
        step: 1,
        initialValue: Options.get("startingLevel"),
        description: "Starting level: ",
        onSlide: (value: number) => {
            Options.set("startingLevel", value);
        },
    });
    optionsContainer.appendChild(level);

    // :: required lines to level up :: //
    const linesToLevelUp = createSlider({
        min: 1,
        max: 15,
        step: 1,
        initialValue: Options.get("linesToLevelUp"),
        description: "Lines to level up: ",
        onSlide: (value: number) => {
            Options.set("linesToLevelUp", value);
        },
    });
    optionsContainer.appendChild(linesToLevelUp);

    // :: ghost piece :: //
    const ghostPiece = document.getElementById(
        "Options-ghostPiece"
    ) as HTMLInputElement;
    ghostPiece.checked = Options.get("ghostPiece");
    ghostPiece.onchange = function () {
        Options.set("ghostPiece", ghostPiece.checked);
    };

    // :: back :: //
    var back = PAGES.options.querySelector(".backButton") as HTMLElement;
    back.onclick = function () {
        Options.save();
        open("main");
    };
}

/**
 * Initialize the high-scores menu elements.
 */
function initHighScores() {
    const back = PAGES.highScores.querySelector(".backButton") as HTMLElement;
    back.onclick = function () {
        open("main");
    };
}

/**
 * Initialize the help menu elements.
 */
function initHelp() {
    var back = PAGES.help.querySelector(".backButton") as HTMLElement;
    back.onclick = function () {
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
    startGame.onclick = function () {
        hideMenu();
        Game.start();
    };

    options.onclick = function () {
        open("options");
    };

    highScores.onclick = function () {
        updateHighScoreTable();
        open("highScores");
    };

    help.onclick = function () {
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
    const table = document.getElementById("HighScores-table")!;
    const noScores = document.getElementById("HighScores-notYet")!;

    // show either the table with the scores or a message saying that there are no scores yet
    if (scores.length === 0) {
        noScores.classList.remove("hide");
        table.classList.add("hide");
    } else {
        noScores.classList.add("hide");
        table.classList.remove("hide");
    }

    // clear the previous table
    const tbody = document.getElementById("HighScores-tbody")!;
    tbody.innerHTML = "";

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

        tbody.appendChild(tr);
    }
}
