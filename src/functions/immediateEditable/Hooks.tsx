import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { CategoryType, TodoType } from '../../providers/types/categories';
import { useDispatch } from 'react-redux';
import { updateCategoryName, updateTodoProps } from '../../providers/redux/slices/categoriesSlice';

type AttrType = 'category' | 'todo';
type TargetType = CategoryType | TodoType;


export const useImmediateEditable = (attr: AttrType, target: TargetType) => {
  const dispatch = useDispatch();
  const [inEditing, setInEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  // onSubmit: bind to <form>
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInEditing(false);
  };

  // onDoubleClick: bind to <li>
  const handleDoubleClick = () => {
    if (!inEditing) {
      setInEditing(true);
    }
  };

  // onChange, onBlur: bind to <input>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (attr) {
      case 'category': {
        dispatch(updateCategoryName({categoryId: target.id, newName: e.target.value}));
        break;
      }
      case 'todo': {
        dispatch(updateTodoProps({todoId: target.id, update: {title: e.target.value}}));
        break;
      }
    }
  };

  const handleBlur = () => {
    setInEditing(false);
  };
  
  // atuofocus
  useEffect(() => {
    if (inEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inEditing]);

  return { inEditing, inputRef, handleSubmit, handleDoubleClick, handleChange, handleBlur };
};