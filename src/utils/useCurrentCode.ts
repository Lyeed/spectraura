import { useMemo } from "react";
import { useCurrentMessage } from "./useCurrentMessage";
import defaultViso from "./defaultVisualizer?raw";

export const useCurrentCode = () => {
    const currentMessage = useCurrentMessage();

    return useMemo(() => currentMessage?.code ?? defaultViso, [currentMessage]);
};
