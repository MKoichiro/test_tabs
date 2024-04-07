import React, { FC } from 'react';
import styled from 'styled-components';
import { TodosType } from '../../../../../types/Todos';
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';
import { CategoryType } from '../../../../../types/Categories';


// === component 定義部分 ============================================= //
interface ArchivedCategoryType {
  archivedCategory: CategoryType;
}
export const ArchivedCategory: FC<ArchivedCategoryType> = (props) => {
  const { archivedCategory } = props;
  return (
    <StyledLi>
      <div className='category-name-container'>
        <p children={ archivedCategory.name } />
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
