/*
# "CreateNewTodo.tsx"

## RENDER AS:
- ``` <form/> ```

## DEPENDENCIES:
| type              | name               | role                                                       |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| PARENT COMPONENTS | Main.tsx           | 特になし                                                   |
| CHILD COMPONENTS  | FormParts.tsx      | フォームの各部品を提供                                     |
| PACKAGE           | react-hook-form    | フォームの状態管理                                         |
| PROVIDER          | CategoriesProvider | カテゴリー情報の提供                                       |
| SETTING           | FormSetting.tsx    | フォームのデフォルト値、プレースホルダー、選択肢などの設定 |
| UTILS             | generateUUID       | 確率的に一意な値を提供。新しい todo の id に使用           |

## FEATURES:
- component

## DESCRIPTION:
- このコンポーネントは、active な category に新しい todo を作成するためのフォームを提供します。
- フォームには、タイトル(title)、詳細(detail)、期限日(deadline: date)、期限時間(deadline: time)、進捗状況(status)、優先度(priority)を入力するフィールドがあります。
- 各フィールドは、FormParts コンポーネントを使用している。
- また、フォームのデフォルト値、プレースホルダー、選択肢などは、FormSetting.tsx で定義されています。

## PROPS:
- このコンポーネントは props を受け取りません。

## STATES:
- このコンポーネントで新たに定義された state はありません。

## FUTURE TASKS:
- フォームのバリデーションを強化する。
- error message を表示する。
- フォームのUIを改善する。

## COPILOT:
- useRefを使用している部分を、react-hook-formのregisterを使用するようにリファクタリングすることを提案します。これにより、フォームの状態管理をよりシンプルにできます。
- useContextを使用している部分を、カスタムフックを使用するようにリファクタリングすることを提案します。これにより、コンポーネントの再利用性とテストの容易性が向上します。
*/

/* --- react/styled-components --- */
import React, { FC, useContext, useRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { FormParts } from './FormParts';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
/* --- types --------------------- */
import { StatusUnionType, PriorityUnionType, TodoType } from '../../../types/Categories';
/* --- utils --------------------- */
import { generateUUID } from '../../../utils/generateUUID';
/* --- react-hook-form ----------- */
import { useForm } from 'react-hook-form';
/* --- settings ------------------ */
import { defaultValues, statusOptions, priorityOptions, placeholders } from './FormSetting';

// === 型定義部分 ===================================================== //
// - component props
interface CreateNewTodoType {
}

// - others
interface InputDataType {
  title?:                    string;
  detail?:                   string;
  deadlineDate?:               Date;
  deadlineTime?:               Date;
  status?:          StatusUnionType;
  priority?:      PriorityUnionType;
}
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //

export const CreateNewTodo: FC<CreateNewTodoType> = (props) => {
  const {} = props;
  const { dispatchCategoriesChange, deadlineFormatters } = useContext(CategoriesContext);
  const { convertToStoredFormat: deadlineFormatter } = deadlineFormatters;

  // --- react-hook-form ---------------------------------------- //
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  // set up element refs
  const titleRef    = useRef<HTMLInputElement    | null>(null);
  const detailRef   = useRef<HTMLTextAreaElement | null>(null);
  const dateRef     = useRef<HTMLInputElement    | null>(null);
  const timeRef     = useRef<HTMLInputElement    | null>(null);
  const priorityRef = useRef<HTMLSelectElement   | null>(null);
  const statusRef   = useRef<HTMLSelectElement   | null>(null);
  // ---------------------------------------- react-hook-form --- //


  // --- executeSubmit の helper 関数 --------------------------- //
  // 1. form を初期化
  const formInitializer = () => {
    // 各項目の入力内容をクリア
    titleRef.current    && (titleRef.current.value    =    '');
    detailRef.current   && (detailRef.current.value   =    '');
    dateRef.current     && (dateRef.current.value     =    '');
    timeRef.current     && (timeRef.current.value     =    '');
    priorityRef.current && (priorityRef.current.value = '---');
    statusRef.current   && (statusRef.current.value   = '---');
    // focus を title にリセット
    titleRef.current && titleRef.current.focus();
  }

  // 2. newTodo を categories に追加
  const addNewTodo = (inputData: InputDataType) => {
    const formattedDeadline = deadlineFormatter(inputData.deadlineDate, inputData.deadlineTime);
    const newTodo: TodoType = {
      id:                       generateUUID(),
      createdDate:                  new Date(),
      updatedDate:                  new Date(),
      status:        inputData.status || '---',
      deadline:              formattedDeadline,
      priority:    inputData.priority || '---',
      isArchived:                        false,
      title:             inputData.title || '',
      detail:           inputData.detail || '',
      isOpen:                             true,
    };
    dispatchCategoriesChange({ type: 'add_new_todo', newTodo });
  }
  // --------------------------- executeSubmit の helper 関数 --- //

  // --- submit で実行 ------------------------------------------ //
  const executeSubmit = (inputData: InputDataType) => {
    formInitializer();      // 1. form の初期化
    addNewTodo(inputData);  // 2. newTodo を categories に追加
  };
  // ------------------------------------------ submit で実行 --- //


  


  return (
    <StyledForm onSubmit={ handleSubmit(executeSubmit) }>
      <fieldset>
        <legend className='form-legend'>
          CREATE NEW TODO
        </legend>

        <fieldset className="child-field">
          <legend className='child-legend'>
              Main:
          </legend>
          <div className='parts-container title-detail'>
            <FormParts
              className    = {       'parts title' }
              partsFor     = {             'title' }
              as           = {             'input' }
              feature      = {          'optional' }
              register     = {            register }
              partsRef     = {            titleRef }
              defaultValue = { defaultValues.title }
              inputType    = {              'text' }
              placeholder  = {  placeholders.title } />

            <FormParts
              className    = {       'parts detail' }
              partsFor     = {             'detail' }
              as           = {           'textarea' }
              feature      = {           'optional' }
              register     = {             register }
              partsRef     = {            detailRef }
              defaultValue = { defaultValues.detail }
              placeholder  = {  placeholders.detail } />
          </div>

        </fieldset>


        <fieldset className="child-field">
          <legend className='child-legend'>
            Deadline:
          </legend>
          <div className='parts-container date-time'>
            <FormParts
              className    = {       'parts date' }
              partsFor     = {             'date' }
              as           = {            'input' }
              feature      = {         'optional' }
              register     = {           register }
              partsRef     = {            dateRef }
              defaultValue = { defaultValues.date }
              inputType    = {             'date' }
              placeholder  = {  placeholders.date } />
            <span className='form-separater'></span>
            <FormParts
              className    = {       'parts time' }
              partsFor     = {             'time' }
              as           = {            'input' }
              feature      = {         'optional' }
              register     = {           register }
              partsRef     = {            timeRef }
              defaultValue = { defaultValues.time }
              inputType    = {             'time' }
              placeholder  = {  placeholders.time } />
          </div>

        </fieldset>

        <fieldset className="child-field">
          <legend className='child-legend'>
            Others:
          </legend>
          <div className='parts-container status-priority'>
            <FormParts
              className     = {      'parts status' }
              partsFor      = {            'status' }
              as            = {            'select' }
              feature       = {          'optional' }
              register      = {            register }
              partsRef      = {           statusRef }
              defaultValue  = {               '---' }
              selectOptions = {       statusOptions }
              placeholder   = { placeholders.status } />
            <span className='form-separater'></span>
            <FormParts
              className     = {      'parts priority' }
              partsFor      = {            'priority' }
              as            = {              'select' }
              feature       = {            'optional' }
              register      = {              register }
              partsRef      = {           priorityRef }
              defaultValue  = {                 '---' }
              selectOptions = {       priorityOptions }
              placeholder   = { placeholders.priority } />
          </div>
        </fieldset>

        <div className="btn-submit-container">
          <button>
            Submit
          </button>
        </div>
      </fieldset>
    </StyledForm>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledForm = styled.form`

  /* reset */
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }
  input, textarea, select {
    border: none;
    border-radius: 0;
    outline: none;
    padding: .4rem .8rem;
    font-size: 1.8rem;
    @media (width < 600px) {
      font-size: 16px;
    }
  }
  /* reset */



  fieldset {
    margin: 0 .8rem;

    .form-legend {
      font-size: 2rem;
    }

    .child-field {
      margin-top: 1.6rem;
      .child-legend {
        font-size: 1.8rem;
        margin-bottom: .8rem;
      }


      /* common */
      .parts-container {
        display: flex;
        .parts {
          display: flex;
          gap: .8rem;
          /* align-items: center; */

          label {
            display: flex;
            height: fit-content;
            gap: .4rem;
            .feature {
              font-size: .8em;
              padding: 0 .6rem;
              background: lightgray;
            }
            .label-txt {
              flex: 1;
              display: flex;
              justify-content: space-between;
              &::after {
                content: ':';
              }
              font-size: 1.8rem;
              @media (width < 600px) {
                font-size: 16px;
              }
            }
          }

          .input-error {
            input, textarea, select {
              width: 100%;
            }
            .error-message {
              text-align: right;
            }

          }
        }
      }

      /* each */
      /* .parts-container for title-detail */
      .title-detail {
        gap: .8rem;
        flex-direction: column;
        /* label : input = 2 : 6 + 1 + 2 + 6 (=15) */
        .parts {
          label        { flex: 2; }
          .input-error { flex: 15; }
        }

      }
      /* .parts-container for date-time, status-priority */
      .date-time, .status-priority {
        flex-direction: row;
        /* label : input : separater : label : input = 2 : 6 : 1 : 2 : 6 */
        .parts {
          flex: 8; // 2 + 6
          label        { flex: 2; }
          .input-error { flex: 6; }
        }
        .form-separater {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before {
            content: '';
            display: block;
            height: 80%;
            border-left: .2rem solid black;
          }

        }
        @media (width < 600px) {
          flex-direction: column;
          gap: .8rem;
          .parts {
            label        { flex: 2; }
            .input-error { flex: 6; }
          }
          .form-separater {
            display: none;
          }
        }

      }
    }


    

    .btn-submit-container {
      margin-top: 2.4rem;
      button {
        display: block;
        margin-left: auto;
      }
    }

  }
`;
// ================================================= style 定義部分 === //