/*
  [(/todos/)Header Component]
    element: header
    description:
      todo の見出し部分を表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/

/* common: essential */
import React from 'react'
import styled from 'styled-components'
/* font awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
/* material icons */
import { DragIndicator } from '@mui/icons-material';
/* dnd-kit */
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';


// === component 定義部分 ============================================= //
interface PropsType{
  sortable: boolean;
  isExpired: boolean;
  main?: string;
  onBtnsClick?: (propName: string) => void;
  listeners?: SyntheticListenerMap;
}

export const TodoHeader = (props: PropsType) => {
  const {sortable, main, isExpired, onBtnsClick, listeners} = props;

  const executeTodoPropsEdit = (propName: string) => {
    if (sortable) {onBtnsClick && onBtnsClick(propName);}
  }


  return (
    <header>
      <span className="gripper" {...listeners}>
        <DragIndicator />
      </span>
      <input type="checkbox" />
      {isExpired && <FontAwesomeIcon className="icon-expired" icon={faCircleExclamation} />}

      <h4 children={main} />

      <div className="btn-container">
        <button onClick={() => executeTodoPropsEdit('archived')}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <button onClick={() => executeTodoPropsEdit('open')}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
    </header>
  )
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledHeader = styled.header`
  
`;
// ================================================= style 定義部分 === //
