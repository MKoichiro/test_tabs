/*
# "Categories.tsx"

## RENDER AS:
- ``` <ul/> ```

## DEPENDENCIES:
| type     | name                    | role                 |
| -------- | ----------------------- | -------------------- |
| PARENT 1 | CategoriesContainer.tsx | カテゴリ一覧を表示   |
| CHILD 1  | CategoryContainer.tsx   | 個々のカテゴリを表示 |

## FEATURES:
- compenet

## DESCRIPTION:
- Categories の carousel コンテナ。

## PROPS:
- null

## STATES:
- null

## FUTURE TASKS:
- null

## COPILOT
- このコンポーネントは現状のままで問題ないと思われます。必要に応じて更新してください。
*/


/* --- react/styled-components --- */
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
/* --- child components ---------- */
import { CategoryContainer } from './category/CategoryContainer';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface CategoriesType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Categories: FC<CategoriesType> = (props) => {
  const {} = props;
  const { activeIdx, categories } = useContext(CategoriesContext);

  return (
    <StyledUl $activeIndex={ activeIdx }>

      { categories.map((category, i) => {
        return (
          <li key={ category.id }>
            <CategoryContainer category={ category } index={ i } />
          </li>
        );
      }) }
    </StyledUl>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledUl = styled.ul<{ $activeIndex: number }>`
  display: flex;
  transition: transform 750ms;
  transform: ${ props => `translateX(calc(-1 * var(--contents-width) * ${ props.$activeIndex }))` };
  > li {
    min-width: 100%;
    background: pink;
  }
`;
// ========================================================= STYLE === //