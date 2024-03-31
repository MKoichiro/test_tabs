import { useContext, useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { TodosType } from '../../types/Todos';
import { AllTodosContext } from '../../providers/AllTodosProvider';


export const useImmediateEditable = (thisTodos: TodosType) => {
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);
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
    const categoryIdx = allTodos.findIndex(todos => todos.id === thisTodos.id);
    const newAllTodos = [...allTodos];
    newAllTodos[categoryIdx].category_name = e.target.value;
    dispatchAllTodosChange({type: 'update_all_todos', newAllTodos});
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