import { saveObject, getObject } from "@drk4/utilities";
import { ScoreData } from "../high_score";
import { OptionsData } from "../options";

export interface StorageData {
    tetris_options?: OptionsData;
    tetris_high_score?: ScoreData[];
    tetris_has_run_before?: boolean;
}

/**
 * Get the value of the given key from `localStorage`.
 */
export function getData(key: keyof StorageData) {
    return getObject(key);
}

/**
 * Set the value of the given key in `localStorage`.
 */
export function setData<T extends keyof StorageData>(
    key: T,
    value: StorageData[T]
) {
    saveObject(key, value);
}
