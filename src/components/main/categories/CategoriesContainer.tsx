/*
# "CategoriesContainer.tsx"

## RENDER AS:
- ``` <div/> ```

## DEPENDENCIES:
| type     | name           | role                                                              |
| -------- | -------------- | ----------------------------------------------------------------- |
| PARENT 1 | Main.tsx       |                                                                   |
| CHILD 1  | Categories.tsx | Category がアイテムのカルーセルコンテナ                           |
| CHILD 2  | MdeModal.tsx   | detail を Markdown 形式で編集させるための editor を表示する modal |

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
import { MdeModal } from './MdeModal';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface CategoriesContainerType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CategoriesContainer: FC<CategoriesContainerType> = (props) => {
  const {} = props;

  return (
    <StyledDiv>
      <Categories />
      <MdeModal />
    </StyledDiv>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div`
  overflow-x: hidden;
`;
// ========================================================= STYLE === //