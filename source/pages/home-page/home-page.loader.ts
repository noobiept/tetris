import { redirect } from "react-router-dom";

import { getData, setData } from "../../core/data";
import { RoutePath } from "../../core/routes";

// land on the help page the first time the game is run
export function homePageLoader() {
    const hasRunBefore = getData("tetris_has_run_before") ?? false;

    if (!hasRunBefore) {
        setData("tetris_has_run_before", true);
        return redirect(RoutePath.help);
    }

    return null;
}
