import React from 'react';
import styled from 'styled-components';
import { PriorityType, StatusType } from '../../../types/Todos';

interface PropsType { 
  created_date: Date;
  updated_date: Date;
  status: StatusType;
  priority: PriorityType;
  archived: boolean;
  detail?: string;
  deadline: { date: Date; use_time: boolean; } | 'not set';
}

export const Detail = (props: PropsType) => {
  const {
    created_date,
    updated_date,
    status,
    priority,
    archived,
    detail,
    deadline,
  } = props;

  // deadline プロパティを表示形式に整形する関数
  const getDeadline = () => {
    if (deadline !== 'not set') {
      const date    = deadline.date.toLocaleDateString();
      const hours   = deadline.date.getHours();
      const minutes = String(deadline.date.getMinutes()).padStart(2, '0');

      const dateFormatted = deadline.use_time ? `${ date } ${ hours }:${ minutes }` : `${ date }`;
      return dateFormatted;
    } else {
      return 'not set'
    }
  };

  return (
    <StyledSection className="detail-container">
      <section className="detail">
        <p>{detail}</p>
      </section>
      <section className="todo-info">
        <p className="info-item">
          <span className="info-label">deadline:</span>
          <span className="info-value">{getDeadline()}</span>
        </p>
        <p className="info-item">
          <span className="info-label">creation:</span>
          <span className="info-value">{created_date.toLocaleDateString()}</span>
        </p>
        <p className="info-item">
          <span className="info-label">updated:</span>
          <span className="info-value">{updated_date.toLocaleDateString()}</span>
        </p>
        <p className="info-item">
          <span className="info-label">status:</span>
          <span className="info-value">{status}</span>
        </p>
        <p className="info-item">
          <span className="info-label">priority:</span>
          <span className="info-value">{priority}</span>
        </p>
        <p className="info-item" style={{ color: 'red' }}>
          <span className="info-label">archived:</span>
          <span className="info-value">{String(archived)}</span>
        </p>
      </section>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  .todo-info {
    width: 20%;
    margin: 0 1.6rem 0 auto;
    .info-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .info-label {

      }
      .info-value {
      }
    }
  }
`;