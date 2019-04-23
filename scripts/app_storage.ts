import { OptionsData } from "./options.js";

export interface StorageData {
    tetris_options?: OptionsData;
}

/**
 * Calls the `callback` with a dictionary that has all the requested keys/values from `localStorage`.
 */
export function getData(
    keys: (keyof StorageData)[],
    callback: (data: StorageData) => void
) {
    var objects: StorageData = {};

    for (var a = 0; a < keys.length; a++) {
        var key = keys[a];
        var value = localStorage.getItem(key);

        objects[key] = value && JSON.parse(value);
    }

    callback(objects);
}

/**
 * Sets the given key/value into `localStorage`. Calls the `callback` when its done.
 * Converts the value to string (with json).
 */
export function setData(items: StorageData, callback?: () => void) {
    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            localStorage.setItem(key, JSON.stringify(items[key]));
        }
    }

    if (callback) {
        callback();
    }
}
