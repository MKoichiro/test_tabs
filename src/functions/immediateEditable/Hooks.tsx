import { useContext, useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { CategoriesContext } from '../../providers/CategoriesProvider';
import { CategoryType } from '../../types/Categories';


export const useImmediateEditable = (thisCategory: CategoryType) => {
  const  { categories, dispatchCategoriesChange } = useContext(CategoriesContext);
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
    const categoryIdx = categories.findIndex(category => category.id === thisCategory.id);
    const newCategories = [...categories];
    newCategories[categoryIdx].name = e.target.value;
    dispatchCategoriesChange({type: 'update_categories', newCategories});
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