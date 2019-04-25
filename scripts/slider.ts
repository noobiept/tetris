export interface SliderArgs {
    min: number;
    max: number;
    step: number;
    initialValue: number;
    description: string;
    onSlide: (value: number) => void;
}

/**
 * Creates a slider HTML element and returns the container element (needs to be added somewhere after).
 */
export function createSlider(args: SliderArgs) {
    const container = document.createElement("div");
    const rangeInput = document.createElement("input");
    const description = document.createElement("div");
    const currentValue = document.createElement("span");

    rangeInput.type = "range";
    rangeInput.min = args.min.toString();
    rangeInput.max = args.max.toString();
    rangeInput.step = args.step.toString();
    rangeInput.value = args.initialValue.toString();
    rangeInput.oninput = function() {
        const valueStr = rangeInput.value;
        const value = parseInt(valueStr);
        currentValue.innerText = valueStr;

        args.onSlide(value);
    };

    currentValue.innerText = args.initialValue.toString();
    description.innerText = args.description;

    rangeInput.className = "rangeInput";
    currentValue.className = "value";

    description.appendChild(currentValue);
    container.appendChild(description);
    container.appendChild(rangeInput);

    return container;
}
