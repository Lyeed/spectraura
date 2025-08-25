import { useContext, useMemo } from "react";
import AppContext from "src/contexts/AppContext";

export const useCurrentMessage = () => {
    const { selected, messages } = useContext(AppContext);

    return useMemo(
        () =>
            (selected
                ? messages.find((message) => message.id === selected)
                : messages.find((message) => Boolean(message.code))) ?? null,
        [messages, selected]
    );
};
