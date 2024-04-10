/*
# "FormParts.tsx"

## RENDER AS:
- ``` <div/> ```

## FEATURES:
- component

## DEPENDENCIES:
| type     | name                                         | role                 |
| -------- | -------------------------------------------- | -------------------- |
| PARENT 1 | CreateNewTodo.tsx                            |                      |
| CHILD 1  | null                                         |                      |
| TYPES    | StatusLiteralsType <br> PriorityLiteralsType | selectOptions に使用 |

## DESCRIPTION:
- このコンポーネントは、スタイリングされた div 要素を提供します。

## PROPS:
| name           | type                                       | role                                                    | 
| -------------- | ------------------------------------------ | ------------------------------------------------------- | 
| className      | string                                     | スタイリングのためのクラス名                            | 
| partsFor       | string                                     | フォーム要素の名前、htmlFor, id, label のテキストに使用 | 
| as             | 'input' \| 'textarea' \| 'select'          | レンダリング要素の選択                                  | 
| feature        | 'optional' \| 'required'                   | 必須項目か任意項目かの指定                              | 
| register       | UseFormRegister<FieldValues>               | react-hook-form の register                             | 
| partsRef       | MutableRefObject<any>                      | 親コンポーネントでフォームのクリアに使用する ref を登録 | 
| defaultValue?  | string                                     | デフォルト値                                            | 
| inputType?     | 'text' \| 'date' \| 'time'                 | input の type 属性に指定                                | 
| placeholder?   | string                                     | placeholder の指定                                      | 
| selectOptions? | StatusLiteralsType \| PriorityLiteralsType | select の option の指定                                 | 

## STATES:
- null

## FUTURE TASKS:
- スタイリングの詳細を追加する。
- 他のHTML要素に対応するように拡張する。
- input type="date" はスタイリングが難しいため、muiのDatePickerの使用を検討する。

## COPILOT:
*/


/* --- react/styled-components --- */
import React, { FC, MutableRefObject } from 'react';
import styled from 'styled-components';
/* --- types --------------------- */
import { StatusLiteralsType, PriorityLiteralsType } from '../../../types/Categories';
/* --- react-hook-form ----------- */ /* の型 */
import { FieldValues, UseFormRegister } from 'react-hook-form';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface FormPartsType {
  className: string;
  partsFor: string;
  as: 'input' | 'textarea' | 'select';
  feature: 'optional' | 'required';

  register: UseFormRegister<FieldValues>;
  partsRef: MutableRefObject<any>;

  defaultValue?: string;
  inputType?: 'text' | 'date' | 'time';
  placeholder?: string;
  selectOptions?: StatusLiteralsType | PriorityLiteralsType;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const FormParts:FC<FormPartsType> = (props) => {
  const {
    className,        // ↓ essentials
    partsFor,
    as,
    feature,
    register,         // ↓ react-hook-form
    partsRef,
    defaultValue,     // ↓ input/textarea/selectなどに渡すもの
    inputType,
    placeholder,
    selectOptions,
  } = props;

  const { ref, ...rest } = register(partsFor); // 第二引数でrequired などを設定することもできる

  const htmlFor  = partsFor;
  const id       = partsFor;
  const labelTxt = partsFor.charAt(0).toUpperCase() + partsFor.slice(1); // 例: 'Title', ::after で ':' を付与

  return (
    <StyledDiv className={className}>

      <label htmlFor={htmlFor}>
        <span className="feature">{feature}</span>
        <span className="label-txt">{labelTxt}</span>
      </label>

      <div className='input-error'>

        { as === 'input'
          && (
            <input
              type={inputType}
              id={id}
              placeholder={placeholder || ''}
              {...rest}                                             // [memo] name="title" が {...rest} 内で設定される
              ref= {(e) => { ref(e); partsRef.current = e; }} />
          )
        }

        { as === 'textarea'
          && (
            <textarea
              id={id}
              placeholder={placeholder || ''}
              {...rest}
              ref= {(e) => { ref(e); partsRef.current = e; }} />
          )
        }

        { as === 'select'
          && (
            <select
              id={id}
              defaultValue={defaultValue || ''}
              {...rest}
              ref= {(e) => { ref(e); partsRef.current = e; }}
            >
              { selectOptions?.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              )) }
            </select>
          )
        }

        <p className='error-message'>error message</p>
      </div>
    </StyledDiv>
  )
};

// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div`


/* Webkit（Chrome、Safari）の日付入力箇所のスタイリング */
input[type="date"]::-webkit-inner-spin-button {
  /* スピンボタンの非表示 */
  /* display: none; */
}
input[type="date"]::-webkit-calendar-picker-indicator {
  /* カレンダーピッカーのスタイリング */
  /* background: transparent; */
}
  
`;
// ========================================================= STYLE === //
