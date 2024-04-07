/*
  [Categories Component]
    element: div
    description:
      全 category の全 todos を表示する todos dir のトップコンポーネント
      carousel のように、active な category の todos のみを閲覧させるようにしている
*/

/* common: essential */
import React from 'react';
import styled from 'styled-components';
/* child components */
import { MdeModal } from './MdeModal';
import { Categories } from './Categories';


// === component 定義部分 ============================================= //
export const CategoriesContainer = () => {

  return (
    <StyledDiv>
      <Categories />
      <MdeModal />
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`
  overflow-x: hidden;
`;
// ================================================= style 定義部分 === //