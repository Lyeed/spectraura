import {
    type SetStateAction,
    type Dispatch,
    type PropsWithChildren,
    createContext,
    useMemo,
    useState,
    type JSX,
} from "react";
import defaultCode from "src/utils/defaultVisualizer?raw";

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
    "Select your audio source. I'll transform its frequencies into living visuals.\n\nIn the meantime, I've already prepared a visualization we can work with.",
    "Select your audio source, and I'll forge its spectrum into neon light.\n\nIn the meantime, I've already prepared a visualization we can work with.",
    "Select your audio source, and I'll show you the unseen patterns hiding in its sound.\n\nIn the meantime, I've already prepared a visualization we can work with.",
];

export const AppProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [localChatting, setLocalChatting] = useState(false);

    const [modelChatting, setModelChatting] = useState(false);

    const [selected, setSelected] = useState<string | null>("base");

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "base",
            type: "spectre",
            code: defaultCode,
            value: possibleEntrance[
                Math.floor(Math.random() * possibleEntrance.length)
            ]!,
        },
    ]);

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

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

export default AppContext;
