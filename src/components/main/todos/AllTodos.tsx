/*
  [AllTodos Component]
    element: div
    description:
      全 category の全 todos を表示する todos dir のトップコンポーネント
      carousel のように、active な category の todos のみを閲覧させるようにしている
*/

/* common: essential */
import React, { useContext, useEffect, useMemo, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { AllTodosAdminContext, MdeAdminContext } from '../../../Providers';
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
    dispatchAllTodosChange
  } = useContext(AllTodosAdminContext);

  const todosLis = allTodos.map((todos, i) => {
    return (
      <li key={ todos.id }>
        <EachTodos todosData={ todos } index={ i } />
      </li>
    );
  });

  const {
    mdeRef,
    modalRef,
    maskRef,
    inEditing,
    setInEditing,
    targetTodoIdx,
    handleModalClose,
    updateEditorOverflow,
    ...rest
  } = useContext(MdeAdminContext);

  const value = [...allTodos][activeIndex].todos[targetTodoIdx].detail;


  const handleChange = (value: string) => {
    // update: allTodos
    const newAllTodos = [...allTodos];
    newAllTodos[activeIndex].todos[targetTodoIdx].detail = value;
    dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });

    // update: hasEditorOverflow
    updateEditorOverflow();
  };

  useEffect(() => {
    if (inEditing === false) { return }
    // focus を当てる
    mdeRef?.current.codemirror.focus();
    // cursor を文末に移動
    const doc    = mdeRef?.current.codemirror.getDoc();
    const cursor = doc.getCursor();
    const line   = doc.getLine(cursor.line);
    doc.setCursor({ line: cursor.line, ch: line.length });
    // overflow を判定
    updateEditorOverflow();

    // if (innerWidth < 600) {
    //   mdeRef?.current && mdeRef?.current.codemirror.getWrapperElement().requestFullscreen();
    // }
  }, [inEditing]);



  // カスタムボタンを作成
  const customBtns = {
    'underline' : {
      name: "underline",
      action: (editor: any) => {
        // 現在の選択範囲を取得
        const selection = editor.codemirror.getSelection();
        // 選択範囲を<u></u>で囲む
        editor.codemirror.replaceSelection(`<u>${selection}</u>`);
      },
      className: "fa fa-underline",
      title: "Underline",
    },
    'submit' : {
      name: 'submit',
      action: () => {
        console.log(targetTodoIdx); // 今のところ不具合を起こすものではないが、なぜかいつもここで0になっている。
        handleModalClose();
      },
      className: "fa fa-paper-plane",
      title: 'Submiti',
    }
  };

  // ツールバーに表示するボタン
  const toolbarOptions = [
    'bold',                         // 太字
    'italic',                       // 斜体
    customBtns['underline'],        // 下線
    'strikethrough',                // 取り消し線
    'quote',                        // 引用符
    '|',
    'heading-bigger',               // 見出し(一段階大きく)
    // 'heading',                     // 見出し(h1)
    'heading-1',                    // 見出し(h1)(アイコン違い、どちらかを使う)
    'heading-2',                    // 見出し(h2)
    'heading-3',                   // 見出し(h3)
    'heading-smaller',              // 見出し(一段階小さく)
    '|',
    'ordered-list',                 // <ol/>
    'unordered-list',               // <ul/>
    'code',                         // <code/>
    'link',                         // <a/>
    'horizontal-rule',              // 水平区切り線
    // 'clean-block',                 // blockの初期化?
    // 'image',                       // <img/>
    '|',
    'preview',                      // プレビューに切り替え
    'fullscreen',                   // 全画面表示
    'side-by-side',                 // 全画面かつプレビューを右に表示
    '|',
    'undo',                         // undo
    'redo',                         // redo
    '|',
    customBtns['submit'],
  ];

  const convertRemToPx = (remValue: number): number => {
    let pxValue: number;
    if (innerWidth > 1024) {
      pxValue = remValue * (10 * 1.00);
    } else if (innerWidth > 600) {
      pxValue = remValue * (10 * 0.50);
    } else {
      pxValue = remValue * (10 * 0.35);
    }
    return pxValue;
  };

  let maxHeight: string, minHeight: string;
  if (innerWidth > 600) {
    maxHeight = `${innerHeight * (50 / 100) - convertRemToPx(3.0 + 1.8)}px`;
    minHeight = '';
  } else {
    maxHeight = `50dvh`;
    minHeight = '';
  }

  const options = useMemo(() => {
    return {
      autofocus: true,
      maxHeight: maxHeight,
      // minHeight: '30vh',
      toolbar: toolbarOptions,
    } as SimpleMDE.Options
  }, []);

  // const simpleMdeRef = useRef<SimpleMDE | null>(null);



  return (
    <StyledDiv $activeIndex={ activeIndex } $inEditing={ inEditing } >
      <ul children={ todosLis } />

        <div
          className='mde-modal'
          ref={modalRef}
        >
          <form
            className="mde-modal-contents"
            onSubmit={e => e.preventDefault()}
          >
            <SimpleMdeReact
              getMdeInstance={(instance: any) => { mdeRef && (mdeRef.current = instance) }}
              options={options}
              value={value}
              // ref={simpleMdeRef}
              onChange={handleChange} />
          </form>
        </div>

        {inEditing && (
          <div className='mask' ref={maskRef} />
        )}
      
    </StyledDiv>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div<{ $activeIndex: number; $inEditing: boolean; }>`
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
      top: ${ props => props.$inEditing ? '0' : '100dvh' };
      right: 0;
      bottom: ${ props => props.$inEditing ? '-50dvh' :'50dvh' };
      left: 0;
      height: auto;
      width: auto;
    }

    .EasyMDEContainer {

      display: flex;
      flex-direction: column-reverse;

      .editor-toolbar {
        padding: 0 .8rem;
        height: 3.0rem;

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