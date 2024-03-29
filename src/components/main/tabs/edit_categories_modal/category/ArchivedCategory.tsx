import React, { FC } from 'react';
import styled from 'styled-components';
import { TodosType } from '../../../../../types/Todos';
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';


// === component 定義部分 ============================================= //
interface ArchivedCategoryType {
  archivedTodos: TodosType;
}
export const ArchivedCategory: FC<ArchivedCategoryType> = (props) => {
  const { archivedTodos } = props;
  return (
    <StyledLi>
      <div className='category-name-container'>
        <p children={ archivedTodos.category_name } />
      </div>
    </StyledLi>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
  ${ categoryCommonStyles }

  .category-name-container {
    p {
      display: block;
      opacity: 0.5;
    }
  }
`;
// ================================================= style 定義部分 === //
