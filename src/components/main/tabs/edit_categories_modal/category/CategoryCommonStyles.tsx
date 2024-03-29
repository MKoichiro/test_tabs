import { css } from 'styled-components';

export interface CategoryCommonStylesType {
  $isDragging?: boolean;
  $inEditing?: boolean;
}

export const categoryCommonStyles = css<{ $isDragging?: boolean; $inEditing?: boolean; }>`
  display: flex;
  align-items: center;

  * {
    font-size: var(--fs-category-name);
    line-height: 4rem;
  }

  .gripper {
    touch-action: none;
    cursor: grab;
    width: 3rem;
    svg {
      display: block;
      margin: 0 auto;
    }
  }

  .category-name-container {
    flex: 1;
  }
`;