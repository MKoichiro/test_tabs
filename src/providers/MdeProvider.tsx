import React, { LegacyRef, RefObject, MutableRefObject, ReactNode, createContext, useEffect, useRef, useState, useCallback, useContext } from 'react';
import SimpleMDE, { ToolbarIcon } from 'easymde';
import { AllTodosContext } from './AllTodosProvider';



const isDev = (process.env.NODE_ENV === 'development');


type ToolbarButton =
    'bold'
    | 'italic'
    | 'quote'
    | 'unordered-list'
    | 'ordered-list'
    | 'link'
    | 'image'
    | 'strikethrough'
    | 'code'
    | 'table'
    | 'redo'
    | 'heading'
    | 'undo'
    | 'heading-bigger'
    | 'heading-smaller'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'clean-block'
    | 'horizontal-rule'
    | 'preview'
    | 'side-by-side'
    | 'fullscreen'
    | 'guide'
    | '|';

// Context
interface MdeContextType {
  refs: {
    mde: MutableRefObject<any> | null;
    modal: MutableRefObject<HTMLDivElement | null> | null;
    mask: MutableRefObject<HTMLDivElement | null> | null;
  };
  inEditing: boolean;
  targetTodoIdx: number | undefined;
  handleModalOpen: (todoIdx: number | undefined, containerRef: LegacyRef<HTMLDivElement> | undefined) => void;
  updateEditorOverflow: () => void;
  toolbarOptions: (ToolbarIcon | ToolbarButton)[];
  getEditorValue: () => string;
  handleChange: (value: string) => void;
}


export const MdeContext = createContext<MdeContextType>({
  refs: {
    mde: null,
    modal: null,
    mask: null
  },
  inEditing: false,
  targetTodoIdx: 0,
  handleModalOpen: () => {},
  updateEditorOverflow: () => {},
  toolbarOptions: [],
  getEditorValue: () => '',
  handleChange: () => {},
});



export const MdeProvider = ({ children }: { children: ReactNode }) => {
  const { activeIndex, allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);
  const mdeRef   = useRef<SimpleMDE      | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const maskRef  = useRef<HTMLDivElement | null>(null);
  const [inEditing,         setInEditing        ] = useState(false);
  const [targetTodoIdx,     setTargetTodoIdx    ] = useState<number | undefined>(undefined);
  const [hasEditorOverflow, setHasEditorOverflow] = useState(false);

  const preventScroll = useCallback((e: MouseEvent) => e.preventDefault(), []);
  const reviveScroll = useCallback((e: WheelEvent) => e.stopPropagation(), []);
  const getCodemirrorElm = () => {
    if (!mdeRef.current) { console.error('mdeRef.currentがfalsyです。[Providers.tsx, handleModalClose()]'); return }
    return mdeRef.current.codemirror.getWrapperElement();
  }
  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as Element).closest('.mde-modal-contents')) { return }
    handleModalClose();
  };

  // --- handleModalOpen ---
  const controllScrollPos = (containerRef: LegacyRef<HTMLDivElement> | undefined) => {
    // scroll 位置を制御: 該当 todo の頭が画面内の先頭に来るように
    const targetDiv = (containerRef as RefObject<HTMLDivElement | null>).current;
    if (!targetDiv) { console.error('scroll先の要素(targetDiv)が見つかりません。 [Detail.tsx, controllScrollPos()]'); return }

    const innerY  = targetDiv.getBoundingClientRect().top;
    const targetY = innerY + scrollY;
    scrollTo({top: targetY, behavior: 'smooth'});
  };
  const handleModalOpen = (todoIdx: number | undefined, containerRef: LegacyRef<HTMLDivElement> | undefined) => {
    if (!(todoIdx || todoIdx === 0)) { console.error('todoIdxがundefinedです。 [Mde.tsx handleModalOpen()]'); return }
    setInEditing(true);
    setTargetTodoIdx(todoIdx);
    document.addEventListener('mousedown', handleOutsideClick);
    controllScrollPos(containerRef);
  };
  // --- handleModalOpen ---

  const handleModalClose = () => {
    const codemirrorElm = getCodemirrorElm();
    if (!codemirrorElm) { console.error('codemirrorElmがfalsyです。[Providers.tsx, handleModalClose()]'); return }
    if (!maskRef.current) { console.error('maskRef.currentがfalsyです。[Providers.tsx, handleModalClose()]'); return }
    if (!modalRef.current) { console.error('modalRef.currentがfalsyです。[Providers.tsx, handleModalClose()]'); return }

    // initialize states and event listener
    setInEditing(false);
    setHasEditorOverflow(false);
    maskRef.current.removeEventListener('wheel', preventScroll);
    modalRef.current.removeEventListener('wheel', preventScroll);
    codemirrorElm.removeEventListener('wheel', reviveScroll);
    document.removeEventListener('mousedown', handleOutsideClick);
  };


  const updateEditorOverflow = () => {
    const codemirrorElm = getCodemirrorElm();
    if (!mdeRef.current) { console.error('mdeRef.currentがfalsyです。[Providers.tsx, updateEditorOverflow()]'); return }
    if (!codemirrorElm) { console.error('codemirrorElmがfalsyです。[Providers.tsx, updateEditorOverflow()]'); return }

    const  contentsHeight = mdeRef.current.codemirror.getScrollInfo().height;
    const editorHeight = codemirrorElm.getBoundingClientRect().height;
    const newOverflow  = (contentsHeight > editorHeight);

    const startOverflow: boolean = (newOverflow === true && hasEditorOverflow === false);
    const endOverflow:   boolean = (newOverflow === false && hasEditorOverflow === true);

    if (startOverflow) {
      codemirrorElm.addEventListener('wheel', reviveScroll, { passive: false });
    } else if (endOverflow) {
      codemirrorElm.removeEventListener('wheel', reviveScroll);
    }
    setHasEditorOverflow(newOverflow);
  };

  const targetTodos = [...allTodos][activeIndex].todos;
  const getEditorValue = (): string => {
    if (typeof targetTodoIdx === 'number') {
      if (0 <= targetTodoIdx && targetTodoIdx < targetTodos.length) {
        return targetTodos[targetTodoIdx].detail;
      } else {
        console.error(`targetTodoIdxが無効な値です。（targetTodoIdx: ${targetTodoIdx}) [AllTodos.tsx, getEditorValue()]`);
      }
    } else {
      console.error(`targetTodoIdxが${targetTodoIdx}です。 [AllTodos.tsx, getEditorValue()]`);
    }
    return '';
  };

  const handleChange = (value: string) => {
    if (!(targetTodoIdx || targetTodoIdx === 0)) { console.error(`targetTodoIdxが${targetTodoIdx}です。 [AllTodos.tsx, handleChange()]`); return}
    // update: allTodos
    const newAllTodos = [...allTodos];
    newAllTodos[activeIndex].todos[targetTodoIdx].detail = value;
    dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });

    // update: hasEditorOverflow
    updateEditorOverflow();
  };


  // --- toolbarOptions ---
  // カスタムボタンを作成
  const customBtns: { [key: string]: ToolbarIcon /* cf) index signature */} = {
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
        setInEditing(false);
        handleModalClose();
      },
      className: "fa fa-paper-plane",
      title: 'Submiti',
    }
  };
  // ツールバーに表示するボタン
  const toolbarOptions: (ToolbarButton | ToolbarIcon)[] = [
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


  useEffect(() => {
    if (inEditing === false) { return }
    if (!maskRef.current) { console.error('maskRef.currentがfalsyです。[Providers.tsx, useEffect()]'); return }
    if (!modalRef.current) { console.error('modalRef.currentがfalsyです。[Providers.tsx, useEffect()]'); return }
    if (!mdeRef.current) { console.error('mdeRef.currentがfalsyです。[Providers.tsx, useEffect()]'); return }

    maskRef.current.addEventListener('wheel', preventScroll, { passive: false });
    modalRef.current.addEventListener('wheel', preventScroll, { passive: false });

    // focus を当てる
    mdeRef.current.codemirror.focus();
    // cursor を文末に移動
    const doc    = mdeRef.current.codemirror.getDoc();
    const cursor = doc.getCursor();
    const line   = doc.getLine(cursor.line);
    doc.setCursor({ line: cursor.line, ch: line.length });
    // overflow を判定
    updateEditorOverflow();
  }, [inEditing]);


  // value
  const refs = {
    mde: mdeRef,
    modal: modalRef,
    mask: maskRef,
  };

  const value = {
    refs,
    inEditing,
    targetTodoIdx,
    handleModalOpen,
    updateEditorOverflow,
    toolbarOptions,
    getEditorValue,
    handleChange,
  };
  return <MdeContext.Provider value={value}>{ children }</MdeContext.Provider>
}