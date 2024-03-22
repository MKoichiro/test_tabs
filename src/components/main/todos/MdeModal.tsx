/*
  [Test Component]
    element: div
    description:
      hogehogehogehogehogehogehogehoge
*/


import React, { useContext } from 'react';
import styled from 'styled-components';
/* contexts */
import { AllTodosContext } from '../../../providers/AllTodosProvider';
import { MdeContext } from '../../../providers/MdeProvider';
/* utils */
/* child components */
/* easymde */
import SimpleMdeReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

export const MdeModal = () => {
  const {
    activeIndex,
    allTodos,
  } = useContext(AllTodosContext);

  const {
    refs,
    inEditing,
    getEditorValue,
    handleChange,
    options,
    viewportHeight,
    hasEditorOverflow,
    ...rest
  } = useContext(MdeContext);

  return (
    <>
      <StyledDiv
        // className="mde-modal"
        $activeIndex={ activeIndex }
        $inEditing={ inEditing }
        $viewportHeight={viewportHeight}
        $hasEditorOverflow={hasEditorOverflow}
        ref={refs.modal}
      >
        <form
          className="mde-modal-contents"
          onSubmit={e => e.preventDefault()}
        >
          <SimpleMdeReact
            getMdeInstance={(instance: any) => { refs.mde && (refs.mde.current = instance) }}
            options={options}
            value={getEditorValue()}
            onChange={handleChange} />
        </form>
      </StyledDiv>


      {inEditing && (
        <StyledMask className='mask' ref={refs.mask} />
      )}
    </>
  );
}


interface StyleType {
  $activeIndex: number;
  $inEditing: boolean;
  $viewportHeight: number | undefined;
  $hasEditorOverflow: boolean;
}
const StyledDiv = styled.div<StyleType>`
  position: fixed;
  z-index: 10;
  opacity: ${ props => props.$inEditing ? '1' : '0' };
  top: ${ props => props.$inEditing ? '50vh' : '100vh' };
  bottom: ${ props => props.$inEditing ? '-50vh' :'0' };
  transition: top 750ms, bottom 750ms, opacity 750ms;
  background: lightgrey;
  width: var(--contents-width);
  height: 50vh;
  @media (width < 600px) {
    top: ${ props => props.$inEditing ? '0' : '100vh' };
    bottom: auto;
    right: 0;
    left: 0;
    height: ${ props => props.$inEditing ? `${props.$viewportHeight}px` :'' };
    width: auto;
    transition: opacity 750ms;
  }

  .EasyMDEContainer {
    display: flex;
    flex-direction: column-reverse;
    .editor-toolbar {
      padding: 0 .8rem;
      min-height: 3.0rem;

      display: flex;
      align-items: center;
      overflow-x: auto;

      scrollbar-width: none;
      -ms-scrollbar: none;
      ::-webkit-scrollbar {
        display: none;
      }
      button {
        border-radius: 0;
        border: none;
        min-width: 2.6rem;
        height: 2.6rem;
        padding: 0;
        i {
          font-size: 1.4rem;
        }
        &.heading-2 {
          i { scale: .85 }
        }
        &.heading-3 {
          i { scale: .7 }
        }
        &.submit {
          margin-left: auto;
        }
      }
    }
    .CodeMirror {
      padding: 0;
      font-size: 16px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .CodeMirror-scroll {
        overscroll-behavior: none; // スクロールチェーンを回避
        touch-action: ${ props => props.$hasEditorOverflow ? '': 'none' };
      }
    }
    .editor-statusbar {
      padding: 0 .8rem;
      font-size: 1.4rem;
      min-height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }


`;

const StyledMask = styled.div`
  /* .mask { */
    position: fixed;
    inset: 0;
    z-index: 5;
    touch-action: none;
  /* } */
`;