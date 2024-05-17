import React, { PropsWithChildren, createContext, useContext, useRef } from 'react';

type ElDataType = {
    id: string;
    el: HTMLSelectElement | null;
};
interface Methods {
    set: (elData: ElDataType) => void;
    get: (id: string) => HTMLSelectElement | null | undefined;
}

type PropertyNames = 'status' | 'priority';
type ContextType = {
    status: Methods;
    priority: Methods;
};

const Context = createContext<ContextType>({
    status: { set: () => {}, get: () => undefined },
    priority: { set: () => {}, get: () => undefined },
});

interface GlobalRefProps {}
export const GlobalSelectRef = ({ children }: PropsWithChildren<GlobalRefProps>) => {
    const statusRef = useRef<ElDataType[]>([]);
    const priorityRef = useRef<ElDataType[]>([]);

    // setter
    const statusSetter = ({ id, el }: ElDataType) => statusRef.current.push({ id, el });
    const prioritySetter = ({ id, el }: ElDataType) => priorityRef.current.push({ id, el });

    // getter
    const statusGetter = (id: string) => {
        const elData = statusRef.current.find((item) => item.id === id);
        return elData?.el;
    };
    const priorityGetter = (id: string) => {
        const elData = priorityRef.current.find((item) => item.id === id);
        return elData?.el;
    };

    const value: ContextType = {
        status: { set: statusSetter, get: statusGetter },
        priority: { set: prioritySetter, get: priorityGetter },
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};


interface GlobalSelectRefArg {
    propertyName: PropertyNames;
    id: string;
}
export const useGlobalSelectRef = ({
    propertyName,
    id,
}: GlobalSelectRefArg) => {
    const context = useContext(Context);
    const { set, get } = context[propertyName];

    const setRef = (el: HTMLSelectElement | null) => set({ id, el });
    const current = get(id);

    return { setRef, current };
};
