import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import {
    CategoryType,
    PriorityUnionType,
    StatusUnionType,
    TodoType,
} from '../../providers/types/categories';
import { useDispatch } from 'react-redux';
import { updateCategoryProps, updateTodoProps } from '../../providers/redux/slices/categoriesSlice';

type todoProp = Extract<keyof TodoType, 'title' | 'deadline' | 'status' | 'priority'>;
type categoryProp = Extract<keyof CategoryType, 'name'>;

type Arg =
    | { target: CategoryType; targetProperty: categoryProp }
    | { target: TodoType; targetProperty: todoProp };
type PossibleChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type actionType = ReturnType<typeof updateCategoryProps> | ReturnType<typeof updateTodoProps>;

/**
 *
 * @param arg
 * @returns
 */
export const useImmediateEditable = ({ target, targetProperty }: Arg) => {
    const dispatch = useDispatch();
    const [inEditing, setInEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);

    // 型注釈の引数eでno-unused-varsの警告が出る。これを無視する。
    // なお、ダミー関数による初期化でも対応可能だが、typescriptで型注釈を適切に行う場合、警告の無視以外にロジカルな意味は持たないので、コメントアウトで対応する。
    // eslint-disable-next-line no-unused-vars
    let actionCreator: (e: PossibleChangeEvent) => actionType;

    switch (targetProperty) {
        case 'name': {
            actionCreator = (e) =>
                updateCategoryProps({ categoryId: target.id, update: { name: e.target.value } });
            break;
        }
        case 'title': {
            actionCreator = (e) =>
                updateTodoProps({ todoId: target.id, update: { title: e.target.value } });
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
        setInEditing(false);
    };

    // onDoubleClick: bind to <element> you want to make trigger for entering into editing mode
    const handleDoubleClick = () => {
        if (!inEditing) setInEditing(true);
        console.log('double clicked');
    };

    // onChange, onBlur: bind to <input> or <select>
    const handleChange = (e: PossibleChangeEvent) => dispatch(actionCreator(e));
    const handleBlur = () => setInEditing(false);

    // autofocus
    useEffect(() => {
        if (inEditing) {
            inputRef.current && inputRef.current.focus();
            selectRef.current && selectRef.current.focus();
        }
    }, [inEditing]);

    // 共通の返り値
    const returnObj = {
        inEditing,
        inputRef,
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
                selectRef: null /* , IEForm, IEInput, IESelect: undefined */,
            };
        }
        // IESelectを返す場合
        case 'status':
        case 'priority': {
            return {
                ...returnObj,
                inputRef: null,
                selectRef /* , IEForm, IEInput: undefined, IESelect */,
            };
        }
    }
};
