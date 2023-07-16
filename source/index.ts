import * as AppStorage from "./app_storage";
import * as Options from "./options";
import * as MainMenu from "./main_menu";
import * as Game from "./game";
import * as HighScore from "./high_score";

var CANVAS: HTMLCanvasElement;

window.onload = function () {
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
        MainMenu.open("help");
    } else {
        MainMenu.open("main");
    }
}

/**
 * Resize the canvas to a different width/height value.
 */
export function resizeCanvas(width: number, height: number) {
    CANVAS.width = width;
    CANVAS.height = height;
}
