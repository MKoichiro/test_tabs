import { createGlobalStyle } from 'styled-components';
import { $contentsWidth } from './data/styleMagics';

const GlobalStyle = createGlobalStyle`

/* reset css などの共通スタイル */
  :root {
    --eng-ff-1:                            Arial, 'Helvetica Neue', Helvetica, sans-serif;
    --eng-ff-2: 'Times NewRoman', 'Times', Arial, 'Helvetica Neue', Helvetica, sans-serif;
    --eng-ff-3: 'Economica'              , Arial, 'Helvetica Neue', Helvetica, sans-serif;

    
    --color-txt-black-1: #444;

    --color-bg-white-1: #e1e1e1;
    --color-bg-white-2: #f9f9f9;

    --contents-width: ${`${$contentsWidth.pc}vw`};
    --border-weight: .15rem;
    @media (width < 600px) {
      --contents-width: ${`${$contentsWidth.sp}vw`};
      --border-weight: .1rem;
    }

    --fs-form: 2rem;
    @media (width < 600px) {
      --fs-form: 16px;
    }

  }
  

  * { box-sizing: border-box }
    
  html {
    /* overflow-y: hidden; */
    font-size: 62.5%;
  }

  body {
    /* overflow-y: hidden; */
    /* position: fixed; */
    /* width: 100%; */
    background: var(--color-bg-white-1);
    color: var(--color-txt-black-1);
    font-family: Economica, Arial, 'Helvetica Neue', Helvetica, 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, メイリオ, '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック体', 'Yu Gothic', YuGothic, 'MS PGothic', Osaka, arial, sans-serif;
    /* reset */
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
    color: #444;
    background: none;
    border: none;
    font-size: inherit;
    cursor: pointer;
    font-family: Economica, Arial, 'Helvetica Neue';
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
  label {
    cursor: pointer;
  }
  input {
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: none;
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



  @media (max-width: 1024px) {
    html { font-size: 50% }
  }
  @media (max-width: 600px) {
    html { font-size: 35% }
  }

`;

export default GlobalStyle;
