import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { type Language } from "../../core/i18n";

const supportedLanguages: Language[] = ["en", "de"];

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 10px;
`;

const Option = styled.div<{ selected?: boolean }>`
    color: ${({ selected }) => (selected ? "red" : "white")};
    cursor: pointer;
`;

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage;

    const changeLanguage = (lang: Language) => {
        i18n.changeLanguage(lang);
    };

    return (
        <Container>
            {supportedLanguages.map((lang) => (
                <Option
                    key={lang}
                    selected={currentLanguage === lang}
                    onClick={() => changeLanguage(lang)}
                >
                    {lang}
                </Option>
            ))}
        </Container>
    );
}
