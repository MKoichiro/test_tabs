/*
  [Category Component]
    element: span
    description:
      ul 内に収まって drop 先を示唆する SortableCategory Component に対して、
      これは drag 中にカーソルに追従する、（外見上、）実体となるコピー要素
*/


/* common: essential */
import React, { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../../../types/Todos';
import { DragIndicator } from '@mui/icons-material';
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';
import { CategoryType } from '../../../../../types/Categories';


// === component 定義部分 ============================================= //
interface GhostCategoryType {
  category: CategoryType;
}

export const GhostCategory = forwardRef(({ ...props }: GhostCategoryType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const { category } = props;
  return (
    <StyledDiv ref={ ref }>
      <span className="gripper">
        <DragIndicator />
      </span>
      <p children={ category.name } />
    </StyledDiv>
  );
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div<CategoryCommonStylesType>`
  ${ categoryCommonStyles }
  .gripper {
    cursor: grabbing;
  }
  .category-name-container {
    p {
      display: block;
    }
  }
`;
// ================================================= style 定義部分 === //