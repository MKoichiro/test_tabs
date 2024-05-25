import { FormEvent, ChangeEvent, useEffect } from 'react';
import { CategoryType, PriorityUnionType, StatusUnionType, TodoType } from '../../providers/types/categories';
import { updateCategoryProps, updateTodoProps } from '../../providers/redux/slices/categoriesSlice';
import { setInEditing as setInEditingActionCreator } from '../../providers/redux/slices/immediateEditableSlice';
import { useDispatch, useImmediateEditableSelector } from '../../providers/redux/store';
import { useGlobalRef } from '../../providers/context_api/global_ref/GlobalRef';

type actionType = ReturnType<typeof updateCategoryProps> | ReturnType<typeof updateTodoProps>;
type ImmediateInputEditableArg =
    | { target: CategoryType; targetProperty: Extract<keyof CategoryType, 'name'> }
    | { target: TodoType; targetProperty: Extract<keyof TodoType, 'title' | 'deadline'> };
type ImmediateSelectEditableArg = { target: TodoType; targetProperty: Extract<keyof TodoType, 'status' | 'priority'> };

const useInEditingState = ({
    target,
    targetProperty,
}: ImmediateInputEditableArg | ImmediateSelectEditableArg): [boolean, (inEditing: boolean) => void] => {
    const targetId = target.id;

    // inEditing
    const inEditingsObj = useImmediateEditableSelector();
    const inEditings = inEditingsObj[targetProperty];
    const inEditingData = inEditings.find((item) => item.id === targetId);
    const inEditing = inEditingData?.inEditing || false;

    // setInEditing
    const dispatch = useDispatch();
    const setInEditing = (inEditing: boolean) => {
        dispatch(setInEditingActionCreator({ property: targetProperty, newState: { id: target.id, inEditing } }));
    };

    return [inEditing, setInEditing];
};

/**
 * @param arg
 * @returns
 */
export const useImmediateInputEditable = (arg: ImmediateInputEditableArg) => {
    const { target, targetProperty } = arg;
    const id = target.id;
    const dispatch = useDispatch();
    const [inEditing, setInEditing] = useInEditingState(arg);
    const inputRef = useGlobalRef({ propertyName: targetProperty, id });

    let actionCreator: (e: ChangeEvent<HTMLElement>) => actionType;
    switch (targetProperty) {
        case 'name': {
            actionCreator = (e) =>
                updateCategoryProps({ categoryId: id, update: { name: (e.target as HTMLTextAreaElement).value } });
            break;
        }
        case 'title': {
            actionCreator = (e) =>
                updateTodoProps({ todoId: id, update: { title: (e.target as HTMLTextAreaElement).value } });
            break;
        }
        case 'deadline': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: target.id,
                    update: { deadline: { date: (e.target as HTMLTextAreaElement).value, use_time: true } },
                });
            break;
        }
    }

    // handlers
    // onSubmit: bind to <form>
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setInEditing(false);
    };
    // onDoubleClick: bind to <element> you want to make trigger for entering into editing mode
    const handleDoubleClick = () => !inEditing && setInEditing(true);
    // onChange, onBlur: bind to <input> or <select>
    const handleChange = (e: ChangeEvent<HTMLElement>) => dispatch(actionCreator(e));
    const handleBlur = () => {
        console.log('handleBlur');
        setInEditing(false);
    };

    // autofocus
    useEffect(() => {
        inEditing && inputRef.current?.focus();
    }, [inEditing]);

    return {
        inputRef,
        inEditing,
        handleSubmit,
        handleDoubleClick,
        handleChange,
        handleBlur,
    };
};

/**
 * @param arg
 * @returns
 */
export const useImmediateSelectEditable = (arg: ImmediateSelectEditableArg) => {
    const { target, targetProperty } = arg;
    const id = target.id;
    const dispatch = useDispatch();
    const [inEditing, setInEditing] = useInEditingState(arg);
    const selectRef = useGlobalRef({ propertyName: targetProperty, id });

    let actionCreator: (e: ChangeEvent<HTMLElement>) => actionType;
    switch (targetProperty) {
        case 'status': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: id,
                    update: { status: (e.target as HTMLSelectElement).value as StatusUnionType },
                });
            break;
        }
        case 'priority': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: id,
                    update: { priority: (e.target as HTMLSelectElement).value as PriorityUnionType },
                });
            break;
        }
    }

    // handlers
    // onSubmit: bind to <form>
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setInEditing(false);
    };
    // onDoubleClick: bind to <element> you want to make trigger for entering into editing mode
    const handleDoubleClick = () => !inEditing && setInEditing(true);
    // onChange, onBlur: bind to <input> or <select>
    const handleChange = (e: ChangeEvent<HTMLElement>) => dispatch(actionCreator(e));
    const handleBlur = () => setInEditing(false);

    // autofocus
    useEffect(() => {
        inEditing && selectRef.current?.focus();
    }, [inEditing]);

    return {
        selectRef,
        inEditing,
        handleSubmit,
        handleDoubleClick,
        handleChange,
        handleBlur,
    };
};

// export const useImmediateEditable = <T,>(arg: T extends HTMLElement ? ImmediateInputEditableArg : ImmediateSelectEditableArg) => {

// };
