import {
    type SetStateAction,
    type Dispatch,
    type PropsWithChildren,
    createContext,
    useMemo,
    useState,
    type JSX,
    useEffect,
} from "react";

interface IAppContext {
    selected: string | null;
    setSelected: Dispatch<SetStateAction<string | null>>;
    ready: boolean;
    setReady: Dispatch<SetStateAction<boolean>>;
    messages: ChatMessage[];
    setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
    chatting: boolean;
    setChatting: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

const possibleEntrance = [
    "To begin, choose or drop an audio file. I'll transform its frequencies into living visuals.",
    "Select your track, and I'll forge its spectrum into neon light.",
    "Upload a song, and I'll show you the unseen patterns hiding in its sound.",
];

const possibleBegin = [
    "The song is bound to me now… Speak, and I shall weave its aura into light.",
    "I hear its rhythm pulsing. Guide me, and we will shape the spectrum together.",
    "Your track breathes within the void. Tell me how you wish to see it, and I will obey.",
];

export const AppProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [ready, setReady] = useState(false);

    const [chatting, setChatting] = useState(true);

    const [selected, setSelected] = useState<string | null>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const context = useMemo(
        () => ({
            selected,
            setSelected,
            ready,
            setReady,
            messages,
            setMessages,
            chatting,
            setChatting,
        }),
        [ready, messages, chatting, selected]
    );

    useEffect(() => {
        setChatting(true);

        if (!ready) {
            const timeout = window.setTimeout(() => {
                setMessages((previous) => [
                    {
                        id: self.crypto.randomUUID(),
                        type: "spectre",
                        code: "",
                        value: possibleEntrance[
                            Math.floor(Math.random() * possibleEntrance.length)
                        ]!,
                    },
                    ...previous,
                ]);
                setChatting(false);
            }, 1000);

            return () => {
                window.clearTimeout(timeout);
            };
        }

        const timeout = window.setTimeout(() => {
            setMessages((previous) => [
                {
                    id: self.crypto.randomUUID(),
                    type: "spectre",
                    code: "",
                    value: possibleBegin[
                        Math.floor(Math.random() * possibleBegin.length)
                    ]!,
                },
                ...previous,
            ]);
            setChatting(false);
        }, 2000);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [ready]);

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

export default AppContext;
