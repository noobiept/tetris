import { createContext, useRef } from "react";
import { Options } from "./options";
import { getData, setData } from "../../core/data";
import { OptionsData } from "./options.types";

export type GetOption = <Key extends keyof OptionsData>(
    key: Key
) => OptionsData[Key];

type SetOption = <Key extends keyof OptionsData>(
    key: Key,
    value: OptionsData[Key]
) => void;

export type OptionsContextValue = {
    getOption: GetOption;
    setOption: SetOption;
    saveOptions: () => void;
};

interface OptionsContextProviderProps {
    children: React.ReactNode;
}

const STORAGE_KEY = "tetris_options";

export const OptionsContext = createContext<OptionsContextValue>({
    getOption: (() => {
        return true;
    }) as GetOption,
    setOption: () => {},
    saveOptions: () => {},
});

export function OptionsContextProvider({
    children,
}: OptionsContextProviderProps) {
    const options = useRef<Options>(new Options(getData(STORAGE_KEY)));
    const getOption: GetOption = (key) => {
        return options.current.get(key);
    };

    const setOption: SetOption = (key, value) => {
        options.current.set(key, value);
    };
    const saveOptions = () => {
        setData(STORAGE_KEY, options.current.getData());
    };

    const value = {
        getOption,
        setOption,
        saveOptions,
    };

    return (
        <OptionsContext.Provider value={value}>
            {children}
        </OptionsContext.Provider>
    );
}
