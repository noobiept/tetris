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
 * Return the grid's number of columns.
 */
export function getNumberOfColumns() {
    return OPTIONS.numberOfColumns;
}

/**
 * Change the number of columns of the grid.
 */
export function setNumberOfColumns(columns: number) {
    OPTIONS.numberOfColumns = columns;
}

/**
 * Return the grid's number of lines.
 */
export function getNumberOfLines() {
    return OPTIONS.numberOfLines;
}

/**
 * Change the number of lines of the grid.
 */
export function setNumberOfLines(lines: number) {
    OPTIONS.numberOfLines = lines;
}

/**
 * Return the starting level of the game.
 */
export function getStartingLevel() {
    return OPTIONS.startingLevel;
}

/**
 * Change the starting level of the game.
 */
export function setStartingLevel(level: number) {
    OPTIONS.startingLevel = level;
}

/**
 * Return the number of cleared lines necessary to level up.
 */
export function getLinesToLevelUp() {
    return OPTIONS.linesToLevelUp;
}

/**
 * Change the number of cleared lines necessary to level up.
 */
export function setLinesToLevelUp(lines: number) {
    OPTIONS.linesToLevelUp = lines;
}

export function getGhostPiece() {
    return OPTIONS.ghostPiece;
}

export function setGhostPiece(value: boolean) {
    OPTIONS.ghostPiece = value;
}
