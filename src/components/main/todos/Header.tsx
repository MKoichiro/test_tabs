import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { DragIndicator } from '@mui/icons-material';

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
}

const StyledHeader = styled.header`
  
`;