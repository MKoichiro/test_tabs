import React, { LegacyRef, RefObject, MutableRefObject, ReactNode, createContext, useEffect, useRef, useState, useCallback, useContext } from 'react';
import SimpleMDE, { ToolbarIcon, Options } from 'easymde';
import { AllTodosContext } from './AllTodosProvider';
import { convertRemToPx } from '../utils/converters';



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
  handleModalOpen: (todoIdx: number | undefined, containerRef: LegacyRef<HTMLDivElement> | undefined) => void;
  getEditorValue: () => string;
  handleChange: (value: string) => void;
  options: Options | undefined;
  viewportHeight: number | undefined;
  hasEditorOverflow: boolean;
}


export const MdeContext = createContext<MdeContextType>({
  refs: {
    mde: null,
    modal: null,
    mask: null
  },
  inEditing: false,
  handleModalOpen: () => {},
  getEditorValue: () => '',
  handleChange: () => {},
  options: undefined,
  viewportHeight: undefined,
  hasEditorOverflow: false,
});



export const MdeProvider = ({ children }: { children: ReactNode }) => {

  // --- toolbarOptions ---
  // カスタムボタンを作成
  const customBtns: { [key: string]: ToolbarIcon /* cf) index signature */} = {
    'underline' : {
      name: "underline",
      action: (editor: any) => {
        const selection = editor.codemirror.getSelection();         // 現在の選択範囲を取得
        editor.codemirror.replaceSelection(`<u>${selection}</u>`);  // 選択範囲を<u></u>で囲む
      },
      className: "fa fa-underline",
      title: "Underline",
    },
    'submit' : {
      name: 'submit',
      action: () => {
        console.log(targetTodoIdx); // 今のところ不具合を起こすものではないが、なぜかいつもここでundefinedになっている。
        setInEditing(false);
        handleModalClose();
      },
      className: "fa fa-paper-plane",
      title: 'Submiti',
    }
  };
  // ツールバーに表示するボタン
  const toolbarOptions: (ToolbarButton | ToolbarIcon)[] = [
    'bold',                   // 太字                       [**blah**]
    'italic',                 // 斜体                       [*blah*]
    customBtns['underline'],  // 下線                       [<u>blah</u>]
    'strikethrough',          // 取り消し線                 [~~blah~~]
    'quote',                  // 引用block                  [> blah]
    '|',
    'heading-bigger',         // 見出し(一段階大きく)
    // 'heading',               // 見出し(h1)                 [# blah]
    'heading-1',              // 見出し(h1)(アイコン違い)   [# blah]
    'heading-2',              // 見出し(h2) [## blah]
    'heading-3',              // 見出し(h3) [### blah]
    'heading-smaller',        // 見出し(一段階小さく)
    '|',
    'ordered-list',           // <ol/>                      [1. blah]
    'unordered-list',         // <ul/>                      [* blah]
    'code',                   // <code/>                    [```blah```]
    'link',                   // <a/>                       [[blah](https://)]
    'horizontal-rule',        // 水平区切り線               [---]
    // 'clean-block',           // blockの初期化?
    // 'image',                 // <img/>
    '|',
    'preview',                // プレビューに切り替え
    'fullscreen',             // 全画面表示
    'side-by-side',           // 全画面かつプレビューを右に表示
    '|',
    'undo',                   // undo
    'redo',                   // redo
    '|',
    customBtns['submit'],     // 変更内容を反映してエディタを閉じる
  ];
  const maxHeight = `${innerHeight * (50 / 100) - convertRemToPx(3.0 + 1.8)}px`;
  const defaultOptions = {
    autofocus: true,
    maxHeight: maxHeight,
    toolbar: toolbarOptions,
  };


  const { activeIndex, allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);
  const mdeRef   = useRef<SimpleMDE      | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const maskRef  = useRef<HTMLDivElement | null>(null);
  const [inEditing,         setInEditing        ] = useState(false);
  const [targetTodoIdx,     setTargetTodoIdx    ] = useState<number  | undefined>(undefined);
  const [options,           setOptions          ] = useState<Options | undefined>(defaultOptions);
  const [viewportHeight,    setViewportHeight   ] = useState<number  | undefined>(undefined);
  const [hasEditorOverflow, setHasEditorOverflow] = useState(false);

  const preventScroll = useCallback((e: MouseEvent) => e.preventDefault(),  []);
  const reviveScroll  = useCallback((e: WheelEvent) => e.stopPropagation(), []);
  const getCodemirror = () => {
    if (!mdeRef.current) { console.error('mdeRef.currentがfalsyです。[Providers.tsx, getCodemirrorElm()]'); return }
    return mdeRef.current.codemirror;
  }


  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as Element).closest('.mde-modal-contents')) { return }
    handleModalClose();
  };

  // --- handleModalOpen ---
  const handleModalOpen = (todoIdx: number | undefined, containerRef: LegacyRef<HTMLDivElement> | undefined) => {
    if (inEditing) { return }
    if (typeof todoIdx !== 'number') { console.error('targetTodoIdxがundefinedです。 [Mde.tsx handleModalOpen()]'); return }
    setInEditing(true);
    setTargetTodoIdx(todoIdx);
    document.addEventListener('mousedown', handleOutsideClick);


    if (innerWidth < 600) { return }
    // scroll 位置を制御: 編集する todo の頭が画面内の先頭に来るように
    const targetDiv = (containerRef as RefObject<HTMLDivElement | null>).current;
    if (!targetDiv) { console.error('scroll先の要素(targetDiv)が見つかりません。 [Detail.tsx, controllScrollPos()]'); return }

    const innerY  = targetDiv.getBoundingClientRect().top;
    const targetY = innerY + scrollY;
    scrollTo({ top: targetY, behavior: 'smooth' });
  };
  // --- handleModalOpen ---

  const handleModalClose = () => {
    const codemirrorElm = getCodemirror()?.getWrapperElement();
    if (!maskRef.current) { console.error('maskRef.currentがfalsyです。[Providers.tsx, handleModalClose()]'); return }
    if (!modalRef.current) { console.error('modalRef.currentがfalsyです。[Providers.tsx, handleModalClose()]'); return }

    // initialize states & event listener
    setInEditing(false);
    setHasEditorOverflow(false);
    maskRef.current.removeEventListener('wheel', preventScroll);
    modalRef.current.removeEventListener('wheel', preventScroll);
    codemirrorElm?.removeEventListener('wheel', reviveScroll);
    document.removeEventListener('mousedown', handleOutsideClick);
  };

  const targetTodos = [...allTodos][activeIndex].todos;
  const getEditorValue = (): string => {
    if (!(typeof targetTodoIdx === 'number')) {
      console.error(`targetTodoIdxが${targetTodoIdx}です。 [AllTodos.tsx, handleChange()]`);
      return '';
    }
    if (!(0 <= targetTodoIdx && targetTodoIdx < targetTodos.length)) {
      console.error(`targetTodoIdxが無効な値です。（targetTodoIdx: ${targetTodoIdx}) [AllTodos.tsx, getEditorValue()]`);
      return '';
    }
    return targetTodos[targetTodoIdx].detail;
  };

  const handleChange = (value: string) => {
    if (!(typeof targetTodoIdx === 'number')) {
      console.error(`targetTodoIdxが${targetTodoIdx}です。 [AllTodos.tsx, handleChange()]`);
      return;
    }
    if (!(0 <= targetTodoIdx && targetTodoIdx < targetTodos.length)) {
      console.error(`targetTodoIdxが無効な値です。（targetTodoIdx: ${targetTodoIdx}) [AllTodos.tsx, getEditorValue()]`);
      return;
    }
    // update: allTodos
    const newAllTodos = [...allTodos];
    newAllTodos[activeIndex].todos[targetTodoIdx].detail = value;
    dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
    // update: hasEditorOverflow
    updateEditorOverflow();
  };


  const updateEditorOverflow = () => {
    // mdeRef.current の null check は getCodemirror() に集約して、ここでは optional chaining で記述
    const codemirror    = getCodemirror();
    const codemirrorElm = getCodemirror()?.getWrapperElement();

    const oldOverflow    = hasEditorOverflow;
    const contentsHeight = codemirror?.getScrollInfo().height;
    const editorHeight   = codemirrorElm?.getBoundingClientRect().height;
    const newOverflow    = (contentsHeight && editorHeight) && (contentsHeight > editorHeight);

    const startOverflow: boolean = (oldOverflow === false && newOverflow === true);
    const endOverflow:   boolean = (oldOverflow === true && newOverflow === false);

    if (startOverflow) {
      codemirrorElm?.addEventListener('wheel', reviveScroll, { passive: true });
    } else if (endOverflow) {
      codemirrorElm?.removeEventListener('wheel', reviveScroll);
    }
    newOverflow && setHasEditorOverflow(newOverflow);
  };

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


      // mobile サイト用: keyboard の on, off で mde modal の高さを変更する
      if (innerWidth > 600) { return }
      let id: NodeJS.Timeout | null = null;
      const delay = 0; // keyboard の on, off は一瞬なので要らないが、今後の不測の状況のために間引くように書いておく
      const resizeListener = () => {
          if (id) { return }
          id = setTimeout(() => {
            if (visualViewport === null) { return }
                const newViewportHeight = visualViewport.height;
                const maxHeight = `${newViewportHeight - convertRemToPx(6.0 + 1.8)}px`;
                const newOptions = {...defaultOptions};
                newOptions.maxHeight = maxHeight;
                setOptions(newOptions);
                setViewportHeight(newViewportHeight);
                id = null;
          }, delay);
      };

      visualViewport && visualViewport.addEventListener('resize', resizeListener);

      return () => {
          visualViewport && visualViewport.removeEventListener('resize', resizeListener);
      };
  }, [inEditing]);

  const refs = {
    mde: mdeRef,
    modal: modalRef,
    mask: maskRef,
  };

  const value = {
    refs,
    inEditing,
    options,
    viewportHeight,
    hasEditorOverflow,
    handleModalOpen,
    getEditorValue,
    handleChange,
  };
  return <MdeContext.Provider value={ value }>{ children }</MdeContext.Provider>
}