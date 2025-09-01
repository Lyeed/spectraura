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
    messages: ChatMessage[];
    setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
    chatting: boolean;
    setLocalChatting: Dispatch<SetStateAction<boolean>>;
    setModelChatting: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

const possibleEntrance = [
    "To begin, choose or drop an audio file. I'll transform its frequencies into living visuals.",
    "Select your track, and I'll forge its spectrum into neon light.",
    "Upload a song, and I'll show you the unseen patterns hiding in its sound.",
];

export const AppProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [localChatting, setLocalChatting] = useState(true);

    const [modelChatting, setModelChatting] = useState(false);

    const [selected, setSelected] = useState<string | null>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const context = useMemo(
        () => ({
            selected,
            setSelected,
            messages,
            setMessages,
            chatting: localChatting || modelChatting,
            setLocalChatting,
            setModelChatting,
        }),
        [messages, modelChatting, selected, localChatting]
    );

    useEffect(() => {
        setLocalChatting(true);

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
            setLocalChatting(false);
        }, 1000);

        return () => {
            window.clearTimeout(timeout);
        };
    }, []);

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

export default AppContext;
