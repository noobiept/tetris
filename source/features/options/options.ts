import { OptionsData } from "./options.types";

export class Options {
    private data = {
        numberOfColumns: 10,
        numberOfLines: 20,
        startingLevel: 1,
        linesToLevelUp: 5,
        ghostPiece: true,
    };

    constructor(options: OptionsData | undefined | null) {
        if (options) {
            if (Number.isInteger(options.numberOfColumns)) {
                this.data.numberOfColumns = options.numberOfColumns;
            }

            if (Number.isInteger(options.numberOfLines)) {
                this.data.numberOfLines = options.numberOfLines;
            }

            if (Number.isInteger(options.startingLevel)) {
                this.data.startingLevel = options.startingLevel;
            }

            if (Number.isInteger(options.linesToLevelUp)) {
                this.data.linesToLevelUp = options.linesToLevelUp;
            }

            if (typeof options.ghostPiece === "boolean") {
                this.data.ghostPiece = options.ghostPiece;
            }
        }
    }

    getData() {
        return this.data;
    }

    get<Key extends keyof OptionsData>(option: Key): OptionsData[Key] {
        return this.data[option];
    }

    set<Key extends keyof OptionsData>(option: Key, value: OptionsData[Key]) {
        this.data[option] = value;
    }
}
