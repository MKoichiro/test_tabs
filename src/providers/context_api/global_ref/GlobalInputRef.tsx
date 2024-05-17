import React, { PropsWithChildren, createContext, useContext, useRef } from 'react';

type ElDataType = {
    id: string;
    el: HTMLInputElement | null;
};
interface Methods {
    set: (elData: ElDataType) => void;
    get: (id: string) => HTMLInputElement | null | undefined;
}

type PropertyNames = 'name' | 'title' | 'deadline';
type ContextType = {
    name: Methods;
    title: Methods;
    deadline: Methods;
};

const Context = createContext<ContextType>({
    name: { set: () => {}, get: () => undefined },
    title: { set: () => {}, get: () => undefined },
    deadline: { set: () => {}, get: () => undefined },
});

interface GlobalRefProps {}
export const GlobalInputRef = ({ children }: PropsWithChildren<GlobalRefProps>) => {
    const nameRef = useRef<ElDataType[]>([]);
    const titleRef = useRef<ElDataType[]>([]);
    const deadlineRef = useRef<ElDataType[]>([]);

    // setter
    const nameSetter = ({ id, el }: ElDataType) => nameRef.current.push({ id, el });
    const titleSetter = ({ id, el }: ElDataType) => titleRef.current.push({ id, el });
    const deadlineSetter = ({ id, el }: ElDataType) => deadlineRef.current.push({ id, el });

    // getter
    const nameGetter = (id: string) => {
        const elData = nameRef.current.find((item) => item.id === id);
        return elData?.el;
    };
    const titleGetter = (id: string) => {
        const elData = titleRef.current.find((item) => item.id === id);
        return elData?.el;
    };
    const deadlineGetter = (id: string) => {
        const elData = deadlineRef.current.find((item) => item.id === id);
        return elData?.el;
    };

    const value: ContextType = {
        name: { set: nameSetter, get: nameGetter },
        title: { set: titleSetter, get: titleGetter },
        deadline: { set: deadlineSetter, get: deadlineGetter },
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

interface GlobalInputRefArg {
    propertyName: PropertyNames;
    id: string;
}
export const useGlobalInputRef = ({
    propertyName,
    id,
}: GlobalInputRefArg) => {
    const context = useContext(Context);
    const { set, get } = context[propertyName];

    const setRef = (el: HTMLInputElement | null) => set({ id, el });
    const current = get(id);

    return { setRef, current };
};
