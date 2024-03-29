/*
  [SortableCategory Component]
    element: li
    description:
      Category Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../../../types/Todos';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AllTodosContext } from '../../../../../providers/AllTodosProvider';
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';

// === logic 部分 ===================================================== //
const useEditableCategory = (thisTodos: TodosType) => {
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);
  const [inEditing, setInEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  // form 要素の イベントハンドラ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInEditing(false);
  };

  // p 要素のイベントハンドラ
  const handleDoubleClick = () => {
    if (!inEditing) {
      setInEditing(true);
    }
  };

  // input 要素のイベントハンドラ
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryIdx  = allTodos.findIndex(todos => todos.id === thisTodos.id);
    const newAllTodos = [...allTodos];
    newAllTodos[categoryIdx].category_name = e.target.value;
    dispatchAllTodosChange({type: 'update_all_todos', newAllTodos});
  };
  const handleBlur = () => {
    setInEditing(false);
  };
  useEffect(() => {
    if (inEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inEditing]);

  return { inEditing, inputRef, handleSubmit, handleDoubleClick, handleChange, handleBlur };
}
// ===================================================== logic 部分 === //


// === component 定義部分 ============================================= //
interface ActiveCategoryType {
  activeTodos: TodosType;
}

export const ActiveCategory: FC<ActiveCategoryType> = (props) => {
  const { activeTodos } = props;
  const { inEditing, inputRef, handleDoubleClick, handleSubmit, handleChange, handleBlur } = useEditableCategory(activeTodos);

  // dnd-ki関連
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: activeTodos.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <StyledLi
      ref={ setNodeRef }
      style={ style }
      $isDragging={ isDragging }
      $inEditing={inEditing}
      { ...attributes }
    >
      <span className='gripper' { ...listeners } >
        <DragIndicator />
      </span>
      <div className='category-name-container'>
        <p children={ activeTodos.category_name } onDoubleClick={handleDoubleClick} />
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            ref={inputRef}
            value={activeTodos.category_name}
            onChange={handleChange}
            onBlur={handleBlur} />
        </form>
      </div>
    </StyledLi>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
  ${ categoryCommonStyles }

  opacity: ${ props => props.$isDragging ? .5 : 1 };
  .gripper {
    touch-action: none;
    cursor: grab;
  }

  .category-name-container {
    border-bottom: ${ props => props.$inEditing ? '2px solid #000' : '2px solid transparent' };
    p {
      display: ${ props => props.$inEditing ? 'none' : 'block' };
    }
    form {
      display: ${ props => props.$inEditing ? 'block' : 'none' };
      input {
        width: 100%;
        outline: none;
        border: none;
        border-radius: 0;
        background: none;
      }
    }
  }

`;
// ================================================= style 定義部分 === //