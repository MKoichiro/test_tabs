import React, { FC } from 'react';
import styled from 'styled-components';
import { TodoType } from '../../../../types/Todos';

const isDev = (process.env.NODE_ENV === 'development');

// === component 定義部分 ============================================= //
interface InfoTableType {
  todo: TodoType;
}
export const InfoTable: FC<InfoTableType> = (props) => {

  const {
    // some other props,
    todo: {
      id,
      completed,
      expired,
      created_date,
      updated_date,
      status,
      priority,
      archived,
      deadline,
      open: isOpen,
    },
  } = props;

  // deadline プロパティを表示形式に整形する関数
  const getDeadline = () => {
    if (deadline === '---') { return deadline }

    const date    = deadline.date.toLocaleDateString();
    const hours   = deadline.date.getHours();
    const minutes = String(deadline.date.getMinutes()).padStart(2, '0');
    const dateFormatted = deadline.use_time ? `${ date } ${ hours }:${ minutes }` : `${ date }`;
    return dateFormatted;
  };

  
  const getFormatted = () => {

  }

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
            <td className='info-value' children={                     getDeadline() } />
            <td className='info-value' children={ created_date.toLocaleDateString() } />
            <td className='info-value' children={ updated_date.toLocaleDateString() } />
            <td className='info-value' children={                            status } />
            <td className='info-value' children={                          priority } />
            { isDev && (
              <>
                <td className='dev-td info-value' children={  String(archived) } />
                <td className='dev-td info-value' children={    String(isOpen) } />
                <td className='dev-td info-value' children={   String(expired) } />
                <td className='dev-td info-value' children={        String(id) } />
                <td className='dev-td info-value' children={ String(completed) } />
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