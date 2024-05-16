import { css } from 'styled-components';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

export interface CategoryCommonStylesType {
    $isDragging?: boolean;
    $inEditing?: boolean;
}

export const categoryCommonStyles = css<{ $isDragging?: boolean; $inEditing?: boolean }>`
    display: flex;
    align-items: center;

    * {
        font-size: var(--fs-category-name);
        line-height: 4rem;
    }


    .category-name-container {
        flex: 1;
    }
`;
