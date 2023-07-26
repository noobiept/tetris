import { createContext, useState } from "react";
import { Dialog, DialogProps } from "./dialog";

export type DialogContextValue = {
    openDialog: (props: DialogProps) => void;
    closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextValue>({
    openDialog: () => {},
    closeDialog: () => {},
});

interface DialogContextProviderProps {
    children: React.ReactNode;
}

export function DialogContextProvider({
    children,
}: DialogContextProviderProps) {
    const [dialogProps, setDialogProps] = useState<DialogProps | undefined>();
    const value = {
        openDialog: (val: DialogProps) => setDialogProps(val),
        closeDialog: () => setDialogProps(undefined),
    };

    return (
        <DialogContext.Provider value={value}>
            {dialogProps && <Dialog {...dialogProps} />}
            {children}
        </DialogContext.Provider>
    );
}
