/*
# "CategoriesContainer.tsx"

## RENDER AS:
- ``` <div/> ```

## DEPENDENCIES:
| type              | name           | role                                                              |
| ----------------- | -------------- | ----------------------------------------------------------------- |
| PARENT COMPONENTS | Main.tsx       |                                                                   |
| CHILD COMPONENT 1 | Categories.tsx | Category がアイテムのカルーセルコンテナ                           |
| CHILD COMPONENT 2 | MdeModal.tsx   | detail を Markdown 形式で編集させるための editor を表示する modal |

## FEATURES:
- component

## DESCRIPTION:
- Categories カルーセルと detail 編集用のモーダルを表示している。

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
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { Categories } from './Categories';
// import { MdeModal } from './MdeModal';


// === 型定義部分 ===================================================== //
// - component props
interface CategoriesContainerType {}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const CategoriesContainer: FC<CategoriesContainerType> = (props) => {
  const {} = props;

  return (
    <StyledDiv>
      <Categories />
      {/* <MdeModal /> */}
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
  overflow-x: hidden;
`;
// ================================================= style 定義部分 === //