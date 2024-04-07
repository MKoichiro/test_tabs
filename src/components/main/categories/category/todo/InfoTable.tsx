import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../../../types/Categories';
import { CategoriesContext } from '../../../../../providers/CategoriesProvider';

const isDev = (process.env.NODE_ENV === 'development');

const useFormattedInfoEmitter = (todo: TodoType) => {
  const { checkIsCompleted, checkIsExpired, deadlineFormatters, getFormattedDate } = useContext(CategoriesContext);
  const { convertToDisplayFormat: getFormattedDeadline } = deadlineFormatters;
  // need to format
  const isExpired            = checkIsExpired(todo);
  const isCompleted          = checkIsCompleted(todo);
  const formattedDeadline    = getFormattedDeadline(todo);
  const formattedCreatedDate = getFormattedDate(todo.createdDate);
  const formattedUpdatedDate = getFormattedDate(todo.updatedDate);
  // others
  const { id, status, priority, isArchived, isOpen } = todo;

  return {
    id,
    isExpired,
    isCompleted,
    deadline: formattedDeadline,
    createdDate: formattedCreatedDate,
    updatedDate: formattedUpdatedDate,
    status,
    priority,
    isArchived,
    isOpen,
  };

}

// === component 定義部分 ============================================= //
interface InfoTableType {
  todo: TodoType;
}
export const InfoTable: FC<InfoTableType> = (props) => {
  const {
    todo,
  } = props;

  const {
    id,
    isExpired,
    isCompleted,
    deadline,
    createdDate,
    updatedDate,
    status,
    priority,
    isArchived,
    isOpen,
  } = useFormattedInfoEmitter(todo);


  return (
    <StyledTable $isDev={ isDev }>
        <thead className='info-heads-container'>
          <tr className='info-heads'>
            <th className='info-head' children='deadline' />
            <th className='info-head' children='created'  />
            <th className='info-head' children='updated'  />
            <th className='info-head' children='status'   />
            <th className='info-head' children='priority' />
            { isDev && (
              <>
                <th className='dev-th info-head' children='archived'  />
                <th className='dev-th info-head' children='open'      />
                <th className='dev-th info-head' children='expired'   />
                <th className='dev-th info-head' children='id'        />
                <th className='dev-th info-head' children='completed' />
              </>
            ) }
          </tr>
        </thead>
        <tbody className='info-values-container'>
          <tr className='info-values'>
            <td className='info-value' children={    deadline } />
            <td className='info-value' children={ createdDate } />
            <td className='info-value' children={ updatedDate } />
            <td className='info-value' children={      status } />
            <td className='info-value' children={    priority } />
            { isDev && (
              <>
                <td className='dev-td info-value' children={  String(isArchived) } />
                <td className='dev-td info-value' children={      String(isOpen) } />
                <td className='dev-td info-value' children={   String(isExpired) } />
                <td className='dev-td info-value' children={          String(id) } />
                <td className='dev-td info-value' children={ String(isCompleted) } />
              </>
            ) }
          </tr>
        </tbody>
      </StyledTable>
  )
}
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledTable = styled.table<{ $isDev: boolean }>`
  /* margin: 0 1.6rem; */
  margin-left: auto;
  border-collapse: collapse;
  /* padding: 1.6rem; */
  width: ${({ $isDev }) => $isDev ? '100%' : '50%'};

  .dev-th {
    background: #ddd;
  }
  .dev-td {
    background: #eee;
  }


  tr {
    display: flex;
    padding: 0 .8rem;
  }
  th, td {
    flex: 1;
    border: 1px solid #aaa;
    padding: .8rem 0;
    text-align: center;
  }
  
  thead.info-heads-container {
    /* background: #ddd; */
    tr.info-heads {
      
      th.info-head {

      }
    }
  }

  tbody.info-values-container {
    tr.info-values {
      
      td.info-value {

      }
    }
  }




`;
// ================================================= style 定義部分 === //