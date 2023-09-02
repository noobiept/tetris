/**
 * Splits the string in any \n (new line) it finds. Returns an array with all the lines separated.
 */
export function parseNewLines(value: string) {
    return value.split("\n");
}
