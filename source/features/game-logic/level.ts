export type LevelState = {
    level: number;
    maxLevel: number;
    pieceMovementDelay: number;
};

export type LevelArgs = {
    onLevelChange: (state: LevelState) => void;
};

// time between the downward movement of the active piece
// it is reduced as the current level increases
// value is in milliseconds (drops 20% per level)
const DELAY_PER_LEVEL = [600, 480, 384, 307, 246, 197, 157, 126, 101, 81];

/**
 * Get the maximum achievable level of the game.
 */
export function getMaxLevel() {
    return DELAY_PER_LEVEL.length;
}

export class Level {
    private currentLevel = 1; // starts at 1 instead of 0
    private onLevelChange: (level: LevelState) => void;

    constructor({ onLevelChange }: LevelArgs) {
        this.onLevelChange = onLevelChange;
    }

    /**
     * Set the current level. Will influence the difficulty of the game.
     */
    setLevel(level: number) {
        if (level < 1) {
            level = 1;
        }

        const maxLevel = getMaxLevel();

        if (level >= maxLevel) {
            level = maxLevel;
        }

        this.currentLevel = level;
        const pieceMovementDelay = DELAY_PER_LEVEL[level - 1];

        this.onLevelChange({
            level: this.currentLevel,
            maxLevel,
            pieceMovementDelay,
        });
    }

    /**
     * Get the current level.
     */
    getLevel() {
        return this.currentLevel;
    }
}
