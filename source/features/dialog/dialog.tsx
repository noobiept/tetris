interface DialogProps {
    message: string;
}

export function Dialog({ message }: DialogProps) {
    return <div>{message}</div>;
}
