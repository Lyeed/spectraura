import { useMemo } from "react";
import { useCurrentMessage } from "./useCurrentMessage";

export const useCurrentCode = () => {
    const currentMessage = useCurrentMessage();

    return useMemo(() => currentMessage?.code ?? "", [currentMessage]);
};
