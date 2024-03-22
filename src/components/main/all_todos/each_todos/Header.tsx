/*
  [(/todos/)Header Component]
    element: header
    description:
      todo の見出し部分を表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/

/* common: essential */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';


// === component 定義部分 ============================================= //
interface PropsType {
  isCompleted: boolean;
  sortable: boolean;
  isExpired: boolean;
  main: string;
  handleTodoPropsEdit?: (propName: string, newValue?: string) => void;
  listeners?: SyntheticListenerMap;
}

export const TodoHeader = (props: PropsType) => {
  const {
    isCompleted,
    sortable,
    main,
    isExpired,
    handleTodoPropsEdit,
    listeners
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inEditing, setInEditing] = useState(false);


  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest('.main-container')) {
      console.log('You clicked outside of me!');
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
    >
      <span className="gripper" {...listeners}>
        <DragIndicator />
      </span>
      <input type="checkbox" />
      {isExpired && <FontAwesomeIcon className="icon-expired" icon={faCircleExclamation} />}

      <div
        className='main-container'
        onDoubleClick={ toggleMode }
      >
        <h4 children={main} />
        {sortable && (
          <form onSubmit={ handleSubmit }>
            <input type="text" ref={ inputRef } defaultValue={main}/>
          </form>
        )}
      </div>

      <div className="btn-container">
        <button onClick={() => executeTodoPropsEdit('archived')}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <button onClick={() => executeTodoPropsEdit('open')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button onClick={() => executeTodoPropsEdit('open')}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
    </StyledHeader>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledHeader = styled.header<{ $isCompleted: boolean; $inEditing: boolean; }>`
  display: flex;
  .main-container {
    flex: 1;
    h4, input {
      font-size: 2rem;
      line-height: 2.4rem;
      padding: 0;
      @media (width < 600px) {
        font-size: 16px;
        line-height: 20px;
      }
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

  .icon-expired {
    color: red;
  }
  .gripper {
    touch-action: none;
    padding: 0 .8rem;
    cursor: grab;
  }
`;
// ================================================= style 定義部分 === //
