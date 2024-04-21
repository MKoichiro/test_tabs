import { useContext, useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
// import { CategoriesContext } from '../../providers/CategoriesProvider';
import { CategoryType, TodoType } from '../../types/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../providers/store';
import { updateCategories, updateCategoryName, updateTodoTitle } from '../../providers/slices/categories';

type AttrType = 'category' | 'todo';
type TargetType = CategoryType | TodoType;


export const useImmediateEditable = (attr: AttrType, target: TargetType) => {
  // const { activeIdx, categories, dispatchCategoriesChange } = useContext(CategoriesContext);
  const { activeIdx, categories } = useSelector((state: RootState) => state.categories);
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
        // const categoryIdx = categories.findIndex(category => category.id === target.id);
        // const newCategories = [...categories];
        // newCategories[categoryIdx].name = e.target.value;
        // dispatchCategoriesChange({type: 'update_categories', newCategories});
        dispatch(updateCategoryName({categoryId: target.id, newName: e.target.value}));
        break;
      }
      case 'todo': {
        // const todoIdx = categories[activeIdx].todos.findIndex(todo => todo.id === target.id);
        // const newCategories = [...categories];
        // newCategories[activeIdx].todos[todoIdx].title = e.target.value;
        // dispatchCategoriesChange({type: 'update_categories', newCategories});
        dispatch(updateTodoTitle({todoId: target.id, newTitle: e.target.value}));
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