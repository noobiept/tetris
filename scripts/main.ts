import * as AppStorage from "./app_storage.js";
import * as Options from "./options.js";
import * as MainMenu from "./main_menu.js";
import * as Game from "./game.js";
import * as HighScore from "./high_score.js";

var CANVAS: HTMLCanvasElement;

window.onload = function() {
    AppStorage.getData(
        ["tetris_options", "tetris_high_score", "tetris_has_run_before"],
        initApp
    );
};

function initApp(data: AppStorage.StorageData) {
    Options.load(data["tetris_options"]);
    HighScore.load(data["tetris_high_score"]);

    CANVAS = document.getElementById("mainCanvas") as HTMLCanvasElement;
    CANVAS.width = 600; // the width/height may change later on based on the game options
    CANVAS.height = 450;

    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    MainMenu.init();
    Game.init(CANVAS);

    if (!data["tetris_has_run_before"]) {
        AppStorage.setData({ tetris_has_run_before: true });
        MainMenu.openHelp();
    } else {
        MainMenu.open();
    }
}

/**
 * Resize the canvas to a different width/height value.
 */
export function resizeCanvas(width: number, height: number) {
    CANVAS.width = width;
    CANVAS.height = height;
}
