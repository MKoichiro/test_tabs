import { createGlobalStyle, css } from 'styled-components';
import { contentsWidths } from './data/styleMagics';

const GlobalStyle = createGlobalStyle`

/* reset css などの共通スタイル */
  :root {
    /* width of main, header, footer contents */
    --contents-width: ${`${contentsWidths.pc}vw`};
    @media (width < 600px) {
      --contents-width: ${`${contentsWidths.sp}vw`};
    }


    /* font-family */
    --ff-1:                            Arial, 'Helvetica Neue', Helvetica, sans-serif;
    --ff-2: 'Times NewRoman', 'Times', Arial, 'Helvetica Neue', Helvetica, sans-serif;
    --ff-3: 'Economica'              , Arial, 'Helvetica Neue', Helvetica, sans-serif;

    /* color */
    --color-black-1: #444;
    --color-black-2: #262626;

    --color-white-1: #e1e1e1;
    --color-white-2: #f9f9f9;
    --color-white-3: #efefef;
    --color-white-4: #f5f5f5;

    --color-gray-1: #888;


    /* border */
    --border-1: var(--border-weight) solid var(--color-black-1);
    --border-weight: .15rem;
    @media (width < 600px) {
      --border-weight: .1rem;
    }

    /* icon size */
    --icon-size-1: 3.2rem;

    /* list */
    --active-todo-width: var(--contents-width);
    --archived-todo-width: calc(var(--active-todo-width) * .95);
    --active-category-width: 100%;
    --archived-category-width: calc(var(--active-category-width) * .95);
    --list-title-line-height: 3.2rem;
    @media (width < 600px) {
      --list-title-line-height: 24px;
    }



  }

  /* reset */
  * { box-sizing: border-box }
    
  html {
    font-size: 62.5%;
  }

  body {
    background: var(--color-white-1);
    color: var(--color-black-1);
    font-family: Economica, Arial, 'Helvetica Neue', Helvetica, 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, メイリオ, '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック体', 'Yu Gothic', YuGothic, 'MS PGothic', Osaka, arial, sans-serif;
    margin: 0; padding: 0;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2,
  h3, h4,
  h5, h6,
  p,
  a, button,
  ol, ul, li { padding: 0; margin: 0; }


  button {
    color: var(--color-black-1);
    background: none;
    border: none;
    font-size: inherit;
    cursor: pointer;
    font-family: var(--ff-3);
    font-weight: 700;
    user-select: none;
    touch-action: manipulation; /* Modern browsers */
    -webkit-tap-highlight-color: rgba(0,0,0,0); /* iOS Safari */
    -webkit-touch-callout: none; /* iOS Safari */
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  ol, ul {
    list-style-type: none;
  }

  form {
    font-size: inherit;
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }
  label {
    cursor: pointer;
  }
  input,
  textarea,
  select {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
    border-radius: 0;
  }
  textarea {
    resize: none;
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline-offset: 0;
  }
  input[type='date'],
  input[type='time'],
  input[type='datetime-local'] {
      -webkit-appearance: none;
  }
  /* Webkit（Chrome、Safari）の日付入力箇所のスタイリング */
  input[type='date']::-webkit-inner-spin-button {
    /* スピンボタンの非表示 */
    /* display: none; */
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    /* カレンダーピッカーのスタイリング */
    /* background: transparent; */
  }



  /* font-size */
  h1 { font-size: 3.2rem }
  h2 { font-size: 2.4rem }
  h3 { font-size: 1.8rem }
  h4 { font-size: 1.6rem }
  h5 { font-size: 1.2rem }
  h6 { font-size: 1.0rem }
  p,
  a, button, label { font-size: 1.6rem }


  .no-user-select {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    & * {
      cursor: grabbing !important;
    }
  }



  @media (max-width: 1024px) {
    html { font-size: 50% }
  }
  @media (max-width: 600px) {
    html { font-size: 35% }
  }

`;

export default GlobalStyle;

export const marginBetweenLiEls = () => css`
    li + & {
        margin-top: 1.4rem;
        @media (width < 600px) {
            margin-top: 0.8rem;
        }
    }
`;

export const activeListCommon = ({ type }: { type: 'todo' | 'category' }) => css`
    border-radius: 0.2rem;
    background: var(--color-white-2);
    width: ${type === 'todo' ? 'var(--active-todo-width)' : 'var(--active-category-width)'};
`;

export const archivedListCommon = ({ type }: { type: 'todo' | 'category' }) => css`
    border-radius: 0.2rem;
    background-color: var(--color-white-3);
    width: ${type === 'todo' ? 'var(--archived-todo-width)' : 'var(--archived-category-width)'};
    margin-right: auto;
    margin-left: auto;
`;

export const listTitleFont = () => css`
    font-size: 2rem;
    line-height: var(--list-title-line-height);
    @media (width < 600px) {
        font-size: 16px;
    }
`;

export const immediateEditableInput = ({
    fontSizes: { pc, tb, sp } = { pc: '1.8rem', tb: '16px', sp: '11px' },
    $inEditing,
}: {
    fontSizes?: { pc?: string; tb?: string; sp?: string };
    $inEditing: boolean;
}) => css`
    position: relative;
    border-bottom: ${$inEditing ? 'var(--border-1)' : 'var(--border-weight) solid transparent'};

    --pc-formatted: ${pc?.replace('rem', '')};
    --tb-formatted: ${tb?.replace('px', '')};
    --sp-formatted: ${sp?.replace('px', '')};
    .IE-display {
        cursor: pointer;
        visibility: ${$inEditing ? 'hidden' : 'visible'};
        // 半角英数字の文字列、の場合にも折り返しを行う
        overflow-wrap: break-word;
        word-wrap: break-word;
        // 改行を適切に反映させる
        white-space: pre-line;
    }
    .IE-display,
    .IE-edit {
        font-weight: bold;
        line-height: 1.5em;
        min-height: 1.5em;
        --fs: var(--pc-formatted);
        @media (width < 1024px) {
            --fs: var(--tb-formatted);
        }
        font-size: calc(var(--fs) * 1rem);
        @media (width < 600px) {
            --fs: var(--sp-formatted);
            font-size: calc(var(--fs) * 1px);
        }
    }
    .IE-form {
        display: ${$inEditing ? 'block' : 'none'};
        .IE-edit {
            color: var(--color-gray-1);
            position: absolute;
            top: 0;
            left: 0;
            font-family: var(--ff-3);
            --real-fs: 1.6;
            font-size: calc(var(--real-fs) * 1rem);
            @media (width < 1024px) {
                --real-fs: 16;
                font-size: calc(var(--real-fs) * 1px);
            }
            font-size: calc(var(--real-fs) * 1rem);
            @media (width < 1024px) {
                font-size: calc(var(--real-fs) * 1px);
            }
            --net-fs: var(--fs);
            --shrink: calc(var(--net-fs) / var(--real-fs));
            --expand: calc(var(--real-fs) / var(--net-fs));

            transform: scale(var(--shrink));
            transform-origin: top left;
            // 縮めた分だけ矩形も縮まるので、その分だけ拡大する
            height: calc(100% * var(--expand));
            width: calc(100% * var(--expand));
            // おそらく小数点以下の桁数によって微妙にずれることでスクロールが発生することがあるので隠す
            overflow: hidden;
        }
    }
`;

export const draggingItemStyle = ($isDragging: boolean, $isGhost = false) => css`
    background: ${$isDragging ? 'var(--color-black-1)' : ''};
    & * {
        color: ${$isDragging ? 'var(--color-white-1) !important' : ''};
    }
    opacity: ${$isGhost ? 0.8 : 1};
`;
