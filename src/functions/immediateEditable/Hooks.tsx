import { useState, useRef, FormEvent, ChangeEvent, useEffect, MutableRefObject } from 'react';
import { CategoryType, PriorityUnionType, StatusUnionType, TodoType } from '../../providers/types/categories';
import { updateCategoryProps, updateTodoProps } from '../../providers/redux/slices/categoriesSlice';
import { setInEditing } from '../../providers/redux/slices/immediateEditableSlice';

import { useDispatch, useImmediateEditableSelector } from '../../providers/redux/store';
import { useGlobalInputRef } from '../../providers/context_api/global_ref/GlobalInputRef';

type todoProp = Extract<keyof TodoType, 'title' | 'deadline' | 'status' | 'priority'>;
type categoryProp = Extract<keyof CategoryType, 'name'>;

type Arg = { target: CategoryType; targetProperty: categoryProp } | { target: TodoType; targetProperty: todoProp };
type PossibleChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type actionType = ReturnType<typeof updateCategoryProps> | ReturnType<typeof updateTodoProps>;

/**
 * @param arg
 * @returns
 */
// export const useImmediateInputEditable = ({ target, targetProperty }: Arg) => {

export const useImmediateEditable = ({ target, targetProperty }: Arg) => {
    const dispatch = useDispatch();

    const targetId = target.id;
    const inputRef = useGlobalInputRef({ propertyName: targetProperty, id: targetId });

    // const [inEditing, setInEditing] = useState(false);
    // const inputRef = useRef<HTMLInputElement | null>(null);
    // // const selectRef = useRef<HTMLSelectElement | null>(null);
    // const statusInEditing = useImmediateEditableSelector();

    // let selectRef: MutableRefObject<HTMLSelectElement | null> | null = null;
    // switch (targetProperty) {
    //     case 'status': {
    //         selectRef = useGlobalRef().statusSelectRef;
    //         break;
    //     }
    //     case 'priority': {
    //         selectRef = useGlobalRef().prioritySelectRef;
    //         break;
    //     }
    // }

    let actionCreator: (e: PossibleChangeEvent) => actionType;

    switch (targetProperty) {
        case 'name': {
            actionCreator = (e) => updateCategoryProps({ categoryId: target.id, update: { name: e.target.value } });
            break;
        }
        case 'title': {
            actionCreator = (e) => updateTodoProps({ todoId: target.id, update: { title: e.target.value } });
            break;
        }
        case 'deadline': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: target.id,
                    update: { deadline: { date: e.target.value, use_time: false } },
                });
            break;
        }
        case 'status': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: target.id,
                    update: { status: e.target.value as StatusUnionType },
                });
            break;
        }
        case 'priority': {
            actionCreator = (e) =>
                updateTodoProps({
                    todoId: target.id,
                    update: { priority: e.target.value as PriorityUnionType },
                });
            break;
        }
    }

    // onSubmit: bind to <form>
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setInEditing({ property: targetProperty, target: { id: target.id, inEditing: false } }));
    };

    // onDoubleClick: bind to <element> you want to make trigger for entering into editing mode
    const handleDoubleClick = () => {
        if (!inEditing) setInEditing(true);
        // console.log('double clicked');
    };

    // onChange, onBlur: bind to <input> or <select>
    const handleChange = (e: PossibleChangeEvent) => dispatch(actionCreator(e));
    const handleBlur = () => {
        if (targetProperty === 'status') {
            dispatch(setStatusInEditing(false));
            return;
        }
        setInEditing(false);
    };

    // autofocus
    useEffect(() => {
        if (targetProperty === 'status') {
            if (statusInEditing) {
                selectRef?.current && selectRef.current.focus();
            }
            return;
        }
        if (inEditing) {
            inputRef.current && inputRef.current.focus();
            selectRef?.current && selectRef.current.focus();
        }
    }, [inEditing]);

    // 共通の返り値
    const returnObj = {
        inEditing,
        handleSubmit,
        handleDoubleClick,
        handleChange,
        handleBlur,
    };

    switch (targetProperty) {
        // IEInputを返す場合
        case 'name':
        case 'title':
        case 'deadline': {
            return {
                ...returnObj,
                inputRef,
                selectRef: null,
            };
        }
        // IESelectを返す場合
        case 'status': {
            return {
                ...returnObj,
                inEditing: useImmediateEditableSelector().inEditing,
                inputRef: null,
                selectRef,
            };
        }
        case 'priority': {
            return {
                ...returnObj,
                inputRef: null,
                selectRef,
            };
        }
    }
};
