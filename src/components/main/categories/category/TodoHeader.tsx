/*
  [(/todos/)Header Component]
    element: header
    description:
      todo の見出し部分を表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/

/* common: essential */
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { TodoType } from '../../../../types/Categories';
import { CategoriesContext } from '../../../../providers/CategoriesProvider';


// === component 定義部分 ============================================= //
interface PropsType {
  todo: TodoType;
  sortable: boolean;
  handleTodoPropsEdit?: (propName: string, newValue?: string) => void;
  listeners?: SyntheticListenerMap;
}

export const TodoHeader = (props: PropsType) => {
  const {
    todo,
    sortable,
    handleTodoPropsEdit,
    listeners
  } = props;

  const {
    checkIsCompleted,
    checkIsExpired
  } = useContext(CategoriesContext);

  const { title, isOpen } = todo;
  const isExpired = checkIsExpired(props.todo);
  const isCompleted = checkIsCompleted(props.todo);


  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inEditing, setInEditing] = useState(false);


  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest('.main-container')) {
      setInEditing(false);
    }
  }
  const toggleMode = () => {
    if (inEditing) {
      document.removeEventListener('mousedown', handleClickOutside);
    } else {
      setInEditing(true);
      document.addEventListener('mousedown', handleClickOutside);
    }
  };
  useEffect(() => {
    if (inEditing && inputRef.current) { inputRef.current.focus(); }
  }, [inEditing]);

  const executeTodoPropsEdit = (propName: string) => {
    if (sortable) { handleTodoPropsEdit && handleTodoPropsEdit(propName) }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInEditing(false);
    document.removeEventListener('mousedown', handleClickOutside);
    const value = inputRef.current?.value;
    handleTodoPropsEdit && handleTodoPropsEdit('main', value);
    console.log(value);
  };


  return (
    <StyledHeader
      $isCompleted={ isCompleted }
      $inEditing={ inEditing }
      $isOpen={ isOpen }
    >
      <span className="gripper" {...listeners}>
        <DragIndicator />
      </span>

      { isExpired && (
        <span className="icon-expired">
          <FontAwesomeIcon icon={ faCircleExclamation } /> 
        </span>
      ) }

      <div
        className='main-container'
        onDoubleClick={ toggleMode }
      >
        <h4 children={title} />
        {sortable && (
          <form onSubmit={ handleSubmit }>
            <input type="text" ref={ inputRef } defaultValue={title}/>
          </form>
        )}
      </div>

      <div className="btn-container">
        <button className='btn-toggle-detail' onClick={() => executeTodoPropsEdit('open')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
    </StyledHeader>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledHeader = styled.header<{ $isCompleted: boolean; $inEditing: boolean; $isOpen: boolean; }>`

  /* background: #eee; */



  display: flex;
  align-items: center;
  font-size: 2rem;
  line-height: 1.6em;
  height: 1.6em;
  @media (width < 600px) {
    font-size: 16px;
  }

  .gripper {
    display: flex;
    align-items: center;
    height: 100%;
    touch-action: none;
    padding: 0 .8rem;
    cursor: grab;
    svg {
      font-size: inherit;
      @media (width < 600px) {
        font-size: 14px;
      }
    }
  }

  .icon-expired {
    color: #b00;
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: .8rem;
    svg {
      height: 50%;
    }
  }

  .main-container {
    flex: 1;
    h4, input {
      font-size: inherit;
      line-height: inherit;
      padding: 0;
    }
    h4 {
      display: ${ props => props.$inEditing ? 'none' : 'block' };
      text-decoration: ${ props => props.$isCompleted ? 'line-through' : '' };
      cursor: pointer;
    }
    input {
      border: none;
      outline: none;
      background: none;
      border-bottom: 1px solid #000;
      border-radius: 0;
      display: ${ props => props.$inEditing ? 'block' : 'none' };
      width: 100%;
    }
  }

  .btn-container {
    display: flex;
    > button {
      height: 100%;
    }
    .btn-toggle-detail {
      scale: ${ props => props.$isOpen ? '1 1' : '1 -1' };
      transition: scale 500ms;
      display: flex;
      align-items: center;
      padding: 0 .8rem;
      width: 3.6rem;
      svg {
        height: 50%;
      }
    }
  }

`;
// ================================================= style 定義部分 === //
