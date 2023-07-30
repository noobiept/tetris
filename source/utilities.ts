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
