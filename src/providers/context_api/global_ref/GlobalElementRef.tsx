import React, { PropsWithChildren, createContext, useContext, useRef } from 'react';

type ElDataType = {
    id: string;
    el: HTMLElement | null;
};
interface Methods {
    set: (elData: ElDataType) => void;
    get: (id: string) => HTMLElement | null | undefined;
}

type PropertyNames = 'categoryDiv';
type ContextType = {
    categoryDiv: Methods;
};

const Context = createContext<ContextType>({
  categoryDiv: { set: () => {}, get: () => undefined },
});

interface GlobalRefProps {}
export const GlobalElementRef = ({ children }: PropsWithChildren<GlobalRefProps>) => {
    const categoryDivRef = useRef<ElDataType[]>([]);

    // setter
    const categoryDivSetter = ({ id, el }: ElDataType) => categoryDivRef.current.push({ id, el });

    // getter
    const categoryDivGetter = (id: string) => {
        const elData = categoryDivRef.current.find((item) => item.id === id);
        return elData?.el;
    };

    const value: ContextType = {
      categoryDiv: { set: categoryDivSetter, get: categoryDivGetter },
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

interface GlobalElementRefArg {
    propertyName: PropertyNames;
    id: string;
}
export const useGlobalElementRef = ({ propertyName, id }: GlobalElementRefArg) => {
    const context = useContext(Context);
    const { set, get } = context[propertyName];

    const setRef = (el: HTMLElement | null) => {
      set({ id, el });
    };
    const current = get(id);

    return { setRef, current };
};
