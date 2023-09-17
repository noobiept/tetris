import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { Button } from "../../../components/button";
import { homeNavigationAtom } from "../home-page.hooks";
import { items } from "../home-page.store";

export function HomePageButtonList() {
    const { t } = useTranslation();
    const selected = useAtomValue(homeNavigationAtom);

    return (
        <>
            {items.map((item, index) => (
                <Button
                    key={item.path}
                    size="large"
                    to={item.path}
                    selected={selected === index}
                >
                    {t(item.translationKey)}
                </Button>
            ))}
        </>
    );
}
