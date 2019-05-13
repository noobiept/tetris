import * as AppStorage from "./app_storage.js";

export interface OptionsData {
    numberOfColumns: number;
    numberOfLines: number;
    startingLevel: number;
    linesToLevelUp: number;
    ghostPiece: boolean;
}

// default options
var OPTIONS: OptionsData = {
    numberOfColumns: 10,
    numberOfLines: 20,
    startingLevel: 1,
    linesToLevelUp: 5,
    ghostPiece: true,
};

/**
 * Save the current options to the local storage.
 */
export function save() {
    AppStorage.setData({ tetris_options: OPTIONS });
}

/**
 * Load the options from the local storage.
 */
export function load(options?: OptionsData) {
    if (options) {
        if (Number.isInteger(options.numberOfColumns)) {
            OPTIONS.numberOfColumns = options.numberOfColumns;
        }

        if (Number.isInteger(options.numberOfLines)) {
            OPTIONS.numberOfLines = options.numberOfLines;
        }

        if (Number.isInteger(options.startingLevel)) {
            OPTIONS.startingLevel = options.startingLevel;
        }

        if (Number.isInteger(options.linesToLevelUp)) {
            OPTIONS.linesToLevelUp = options.linesToLevelUp;
        }

        if (typeof options.ghostPiece === "boolean") {
            OPTIONS.ghostPiece = options.ghostPiece;
        }
    }
}

/**
 * Get the current value of the given option.
 */
export function get<T extends keyof OptionsData>(option: T) {
    return OPTIONS[option];
}

/**
 * Change the given option to a new value.
 */
export function set<T extends keyof OptionsData>(
    option: T,
    value: OptionsData[T]
) {
    OPTIONS[option] = value;
}
