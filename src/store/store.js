import { init } from "@rematch/core";
import { user } from "./user.model"

export const store = init({
    models: {
        user,
    },
});