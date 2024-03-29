/*
  [SortableCategory Component]
    element: li
    description:
      Category Componentと比較して、内部的にはこちらが実体だが、
      外見上は drop 位置を示唆するゴースト要素
*/


/* common: essential */
import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../../types/Todos';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AllTodosContext } from '../../../../providers/AllTodosProvider';


// === component 定義部分 ============================================= //
interface PropsType {
  todos: TodosType;
}

export const SortableCategory = (props: PropsType) => {
  const { todos: thisTodos } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: thisTodos.id });
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);

  // これはほとんどおまじない。
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [inEditing, setInEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDoubleClick = () => {
    if (!inEditing) {
      setInEditing(true);
    }
  };
  useEffect(() => {
    if (inEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inEditing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryIdx  = allTodos.findIndex(todos => todos.id === thisTodos.id);
    const newAllTodos = [...allTodos];
    newAllTodos[categoryIdx].category_name = e.target.value;
    dispatchAllTodosChange({type: 'update_all_todos', newAllTodos});
  };

  const handleBlur = () => {
    setInEditing(false);
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
        <p children={ thisTodos.category_name } onDoubleClick={handleDoubleClick} />
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            ref={inputRef}
            value={thisTodos.category_name}
            onChange={handleChange}
            onBlur={handleBlur} />
        </form>
      </div>
    </StyledLi>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<{ $isDragging: boolean; $inEditing: boolean; }>`
  /* touch-action: manipulation; */
  opacity: ${ props => props.$isDragging ? .5 : 1 };
  display: flex;
  align-items: center;

  * {
    font-size: var(--fs-category-name);
    line-height: 4rem;
  }
  .gripper {
    touch-action: none;
    cursor: grab;
    width: 3rem;
    svg {
      display: block;
      margin: 0 auto;
    }
  }
  .category-name-container {
    flex: 1;
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