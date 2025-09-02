import {
    type SetStateAction,
    type Dispatch,
    type PropsWithChildren,
    createContext,
    useMemo,
    useState,
    type JSX,
} from "react";

interface IRenderingContext {
    editingCode: string;
    setEditingCode: Dispatch<SetStateAction<string>>;
    canSave: boolean;
    setCanSave: Dispatch<SetStateAction<boolean>>;
}

const RenderingContext = createContext<IRenderingContext>(
    {} as IRenderingContext
);

export const RenderingProvider = ({
    children,
}: PropsWithChildren): JSX.Element => {
    const [editingCode, setEditingCode] = useState("");

    const [canSave, setCanSave] = useState(false);

    const context = useMemo(
        () => ({
            editingCode,
            setEditingCode,
            canSave,
            setCanSave,
        }),
        [editingCode, canSave]
    );

    return (
        <RenderingContext.Provider value={context}>
            {children}
        </RenderingContext.Provider>
    );
};

export default RenderingContext;
