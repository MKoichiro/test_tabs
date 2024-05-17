import { FormEvent, ChangeEvent, useEffect } from 'react';
import {
    CategoryType,
    PriorityUnionType,
    StatusUnionType,
    TodoType,
} from '../../providers/types/categories';
import { updateCategoryProps, updateTodoProps } from '../../providers/redux/slices/categoriesSlice';
import { setInEditing as setInEditingActionCreator } from '../../providers/redux/slices/immediateEditableSlice';
import { useDispatch, useImmediateEditableSelector } from '../../providers/redux/store';
import { useGlobalInputRef } from '../../providers/context_api/global_ref/GlobalInputRef';
import { useGlobalSelectRef } from '../../providers/context_api/global_ref/GlobalSelectRef';


type actionType = ReturnType<typeof updateCategoryProps> | ReturnType<typeof updateTodoProps>;
type ImmediateInputEditableArg = 
    | { target: CategoryType; targetProperty: Extract<keyof CategoryType, 'name'>; }
    | { target: TodoType; targetProperty: Extract<keyof TodoType, 'title' | 'deadline'>; };
type ImmediateSelectEditableArg = { target: TodoType; targetProperty: Extract<keyof TodoType, 'status' | 'priority'>; };


const useInEditingState = ({ target, targetProperty }: ImmediateInputEditableArg | ImmediateSelectEditableArg): [boolean, (inEditing: boolean) => void] => {
  const targetId = target.id;
  
  // inEditing
  const inEditingsObj = useImmediateEditableSelector();
  const inEditings = inEditingsObj[targetProperty];
  const inEditingData = inEditings.find((item) => item.id === targetId);
  const inEditing = inEditingData?.inEditing || false;

  // setInEditing
  const dispatch = useDispatch();
  const setInEditing = (inEditing: boolean) => {
    dispatch(
      setInEditingActionCreator({ property: targetProperty, newState: { id: target.id, inEditing } })
    );
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
  const inputRef = useGlobalInputRef({ propertyName: targetProperty, id });

  let actionCreator: (e: ChangeEvent<HTMLInputElement>) => actionType;
  switch (targetProperty) {
      case 'name': {
          actionCreator = (e) =>
              updateCategoryProps({ categoryId: id, update: { name: e.target.value } });
          break;
      }
      case 'title': {
          actionCreator = (e) =>
              updateTodoProps({ todoId: id, update: { title: e.target.value } });
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
  }

  // handlers
  // onSubmit: bind to <form>
  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setInEditing(false);
  };
  // onDoubleClick: bind to <element> you want to make trigger for entering into editing mode
  const handleDoubleClick = () => {
    console.log('handleDoubleClick', inEditing);
    !inEditing && setInEditing(true);
  };
  // onChange, onBlur: bind to <input> or <select>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(actionCreator(e));
  const handleBlur = () => setInEditing(false);

  // autofocus
  useEffect(() => { inEditing && inputRef.current?.focus() }, [inEditing]);

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
  const selectRef = useGlobalSelectRef({ propertyName: targetProperty, id });


  let actionCreator: (e: ChangeEvent<HTMLSelectElement>) => actionType;
  switch (targetProperty) {
      case 'status': {
          actionCreator = (e) =>
              updateTodoProps({
                  todoId: id,
                  update: { status: e.target.value as StatusUnionType },
              });
          break;
      }
      case 'priority': {
          actionCreator = (e) =>
              updateTodoProps({
                  todoId: id,
                  update: { priority: e.target.value as PriorityUnionType },
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
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(actionCreator(e));
  const handleBlur = () => setInEditing(false);

  // autofocus
  useEffect(() => { inEditing && selectRef.current?.focus() }, [inEditing]);

    return {
      selectRef,
        inEditing,
        handleSubmit,
        handleDoubleClick,
        handleChange,
        handleBlur,
    };
};


// export const useImmediateEditable = <T,>(arg: T extends HTMLInputElement ? ImmediateInputEditableArg : ImmediateSelectEditableArg) => {


// };