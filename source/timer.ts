export interface TimerArgs {
    interval: number; // in milliseconds
    onChange: (count: number) => void; // called when the timer value is changed
}

export default class Timer {
    private count: number;
    private args: TimerArgs;
    private intervalId: number | undefined;
    private isRunning: boolean;

    constructor(args: TimerArgs) {
        this.count = 0;
        this.args = args;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this.intervalId = window.setInterval(() => {
            this.count += this.args.interval;
            this.args.onChange(this.count);
        }, this.args.interval);
    }

    stop() {
        if (!this.isRunning) {
            return;
        }

        this.isRunning = false;
        window.clearInterval(this.intervalId);
        this.intervalId = undefined;
    }

    reset() {
        this.stop();
        this.count = 0;
        this.args.onChange(0);
    }

    getCount() {
        return this.count;
    }
}
