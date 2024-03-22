/*
  [AllTodos Component]
    element: div
    description:
      全 category の全 todos を表示する todos dir のトップコンポーネント
      carousel のように、active な category の todos のみを閲覧させるようにしている
*/

/* common: essential */
import React, { useContext } from 'react';
import styled from 'styled-components';
/* contexts */
import { AllTodosContext } from '../../../providers/AllTodosProvider';
import { MdeContext } from '../../../providers/MdeProvider';
/* utils */
/* children components */
import { EachTodos } from './EachTodos';
/* easymde */
import SimpleMDE from 'easymde';
import "easymde/dist/easymde.min.css";
const marked = require("marked");
import DOMPurify from "dompurify";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import SimpleMdeReact from 'react-simplemde-editor';


// === component 定義部分 ============================================= //
export const AllTodos = () => {
  const {
    activeIndex,
    allTodos,
  } = useContext(AllTodosContext);

  const todosLis = allTodos.map((todos, i) => {
    return (
      <li key={ todos.id }>
        <EachTodos todosData={ todos } index={ i } />
      </li>
    );
  });

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
    <StyledDiv
      $activeIndex={ activeIndex }
      $inEditing={ inEditing }
      $viewportHeight={viewportHeight}
      $hasEditorOverflow={hasEditorOverflow}
    >
      <ul children={ todosLis } />

        <div
          className='mde-modal'
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
        </div>

        {inEditing && (
          <div className='mask' ref={refs.mask} />
        )}
      
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div<{ $activeIndex: number; $inEditing: boolean; /* $isKeyBoardDisplayed: boolean; */ $viewportHeight: number | undefined; $hasEditorOverflow: boolean}>`
  overflow-x: hidden;

  .mask {
    position: fixed;
    inset: 0;
    z-index: 5;
    touch-action: none;
  }

  .mde-modal {
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

      .CodeMirror-scroll {
        touch-action: ${ props => props.$hasEditorOverflow ? '': 'none' };
      }

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
  }



  > ul {
    display: flex;
    transition: transform 750ms;
    transform: ${ props => `translateX(calc(-1 * var(--contents-width) * ${ props.$activeIndex }))` };
    > li {
      min-width: 100%;
      background: pink;
      /* height: 500px; */
    }
  }
`;
// ================================================= style 定義部分 === //