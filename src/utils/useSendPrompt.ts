import { useCallback, useContext } from "react";
import AppContext from "src/contexts/AppContext";

interface FetchResponse {
    message: string;
    code: string;
}

export const useSendPrompt = (): ((topic: string) => Promise<void>) => {
    const { setChatting, setMessages, setSelected } = useContext(AppContext);

    return useCallback(
        async (prompt: string): Promise<void> => {
            setChatting(true);

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

                setChatting(false);
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
                setChatting(false);
            }
        },
        [setChatting, setMessages, setSelected]
    );
};
