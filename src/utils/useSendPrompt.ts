import { useCallback, useContext } from "react";
import AppContext from "src/contexts/AppContext";
import { useCurrentCode } from "./useCurrentCode";

interface FetchResponse {
    message: string;
    code: string;
}

export const useSendPrompt = (): ((
    prompt: string,
    includeCode: boolean
) => Promise<void>) => {
    const currentCode = useCurrentCode();

    const { setModelChatting, setMessages, setSelected } =
        useContext(AppContext);

    return useCallback(
        async (prompt, includeCode) => {
            setModelChatting(true);

            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "user",
                    value: prompt,
                    code: includeCode ? currentCode || null : null,
                },
                ...previous,
            ]);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/visualizer`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            prompt,
                            code: includeCode ? currentCode : undefined,
                        }),
                    }
                );

                if (!response.ok || response.status !== 200) {
                    throw new Error("Invalid response");
                }

                const json = (await response.json()) as FetchResponse;
                const id = self.crypto.randomUUID();
                const code = json.code || null;

                setMessages((previous) => [
                    {
                        id,
                        type: "spectre",
                        code,
                        value: json.message,
                    },
                    ...previous,
                ]);
                if (code) {
                    setSelected(id);
                }

                setModelChatting(false);
            } catch (error) {
                setMessages((previous) => [
                    {
                        id: self.crypto.randomUUID(),
                        type: "spectre",
                        code: null,
                        value: "Sorry, something went wrong, I could not answer you properly",
                    },
                    ...previous,
                ]);
                console.error(error);
                setModelChatting(false);
            }
        },
        [setModelChatting, setMessages, setSelected, currentCode]
    );
};
