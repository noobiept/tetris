import * as AppStorage from "./app_storage.js";
import * as Options from "./options.js";
import * as MainMenu from "./main_menu.js";

export var STAGE: createjs.Stage;
export var CANVAS: HTMLCanvasElement;

window.onload = function() {
    AppStorage.getData(["tetris_options", "tetris_has_run_before"], initApp);
};

function initApp(data: AppStorage.StorageData) {
    Options.load(data["tetris_options"]);

    CANVAS = document.getElementById("mainCanvas") as HTMLCanvasElement;
    STAGE = new createjs.Stage(CANVAS);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    MainMenu.init();

    if (!data["tetris_has_run_before"]) {
        AppStorage.setData({ tetris_has_run_before: true });
        MainMenu.openHelp();
    } else {
        MainMenu.open();
    }
}
