import React, { PropsWithChildren, createContext, useContext, useRef } from 'react';

type ElDataType = {
    id: string;
    el: HTMLElement | null;
};
interface Methods {
    set: (elData: ElDataType) => void;
    get: (id: string) => HTMLElement | null | undefined;
}

type PropertyNames =
  // input
  | 'name'
  | 'title'
  | 'deadline'
  // select
  | 'status'
  | 'priority'
  // div
  | 'categoryDiv';
type ContextType = {
    // input
    name: Methods;
    title: Methods;
    deadline: Methods;
    // select
    status: Methods;
    priority: Methods;
    // div
    categoryDiv: Methods;
};

const Context = createContext<ContextType>({
    // input
    name: { set: () => {}, get: () => undefined },
    title: { set: () => {}, get: () => undefined },
    deadline: { set: () => {}, get: () => undefined },
    // select
    status: { set: () => {}, get: () => undefined },
    priority: { set: () => {}, get: () => undefined },
    // div
    categoryDiv: { set: () => {}, get: () => undefined },
});

interface GlobalRefProps {}
export const GlobalRef = ({ children }: PropsWithChildren<GlobalRefProps>) => {
    // input
    const nameRef = useRef<ElDataType[]>([]);
    const titleRef = useRef<ElDataType[]>([]);
    const deadlineRef = useRef<ElDataType[]>([]);
    // select
    const statusRef = useRef<ElDataType[]>([]);
    const priorityRef = useRef<ElDataType[]>([]);
    // div
    const categoryDivRef = useRef<ElDataType[]>([]);

    // setter
    // input
    const nameSetter = ({ id, el }: ElDataType) => nameRef.current.push({ id, el });
    const titleSetter = ({ id, el }: ElDataType) => titleRef.current.push({ id, el });
    const deadlineSetter = ({ id, el }: ElDataType) => deadlineRef.current.push({ id, el });
    // select
    const statusSetter = ({ id, el }: ElDataType) => statusRef.current.push({ id, el });
    const prioritySetter = ({ id, el }: ElDataType) => priorityRef.current.push({ id, el });
    // div
    const categoryDivSetter = ({ id, el }: ElDataType) => categoryDivRef.current.push({ id, el });

    // getter
    // input
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
    // select
    const statusGetter = (id: string) => {
      const elData = statusRef.current.find((item) => item.id === id);
      return elData?.el;
    };
    const priorityGetter = (id: string) => {
        const elData = priorityRef.current.find((item) => item.id === id);
        return elData?.el;
    };
    // div
    const categoryDivGetter = (id: string) => {
        const elData = categoryDivRef.current.find((item) => item.id === id);
        return elData?.el;
    };


    const value: ContextType = {
        // input
        name: { set: nameSetter, get: nameGetter },
        title: { set: titleSetter, get: titleGetter },
        deadline: { set: deadlineSetter, get: deadlineGetter },
        // select
        status: { set: statusSetter, get: statusGetter },
        priority: { set: prioritySetter, get: priorityGetter },
        // div
        categoryDiv: { set: categoryDivSetter, get: categoryDivGetter },
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

interface GlobalRefArg {
    propertyName: PropertyNames;
    id: string;
}
export const useGlobalRef = ({ propertyName, id }: GlobalRefArg) => {
    const context = useContext(Context);
    const { set, get } = context[propertyName];

    const setRef = (el: HTMLElement | null) => set({ id, el });
    const current = get(id);

    return { setRef, current };
};
