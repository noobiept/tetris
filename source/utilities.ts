/**
 * Keys code for the keyboard events.
 */
export const EVENT_KEY = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    end: 35,
    home: 36,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    del: 46,

    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,

    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,

    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
};

/**
 * Get a random integer between the minimum and maximum values provided (inclusive).
 */
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert a time value into a displayable string.
 */
export function timeToString(milliseconds: number) {
    const totalSeconds = Math.round(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let str = "";
    let minutesAdded = false;

    if (minutes !== 0) {
        str += minutes + "m";
        minutesAdded = true;
    }

    if (seconds !== 0 || !minutesAdded) {
        if (minutesAdded) {
            str += " ";
        }

        str += seconds + "s";
    }

    return str;
}

/**
 * 1 to 1st, 2 to 2nd, 3 to 3rd, 4 to 4th, etc.
 */
export function cardinalToOrdinal(value: number) {
    const ten = value % 10;
    const hundred = value % 100;

    if (ten === 1 && hundred !== 11) {
        return value + "st";
    }

    if (ten === 2 && hundred !== 12) {
        return value + "nd";
    }

    if (ten === 3 && hundred !== 13) {
        return value + "rd";
    }

    return value + "th";
}