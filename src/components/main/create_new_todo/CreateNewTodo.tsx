/*
  [CreateNewTodo Component]
    element: form
    description:
      active な category に新たなtodoを追加するためのフォームを提供している
*/


/* common: essential */
import React, { FC, useContext, useRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { PriorityType, StatusType, DeadlineType, TodoType, priorityLiterals, statusLiterals } from '../../../types/Categories';
/* react-hook-form */
import { useForm } from 'react-hook-form';
import { CategoriesContext } from '../../../providers/CategoriesProvider';
import { generateUUID } from '../../../utils/generateUUID';
import { FormParts } from '../FormParts';

interface InputDataType {
  title?:              string;
  detail?:             string;
  deadlineDate?:         Date;
  deadlineTime?:         Date;
  priority?:     PriorityType;
  status?:         StatusType;
}

// categories に追加する todo の deadline プロパティに渡す値を整形
const deadlineFormatter = (dateInput: Date | undefined, timeInput: Date | undefined): DeadlineType => {
  const now = new Date();
  let deadline: Date;

  if (timeInput) {

    if (dateInput) { deadline = new Date(`${ dateInput } ${ timeInput }`); } // 年月日: 有り,   時刻: 有り
    else { deadline = new Date(`${ now.toDateString() } ${ timeInput }`);  } // 年月日: 無し,   時刻: 有り
    return { date: deadline, use_time: true }

  } else  if (dateInput) {
      deadline = new Date(`${ dateInput } 23:59:59`);
      return { date: deadline, use_time: false }                             // 年月日: 有り,   時刻: 無し
  }

  return '---';                                                              // 年月日: 無し,   時刻: 無し
};


// === component 定義部分 ============================================= //
interface CreateNewTodoType {
}
export const CreateNewTodo: FC<CreateNewTodoType> = (props) => {
  const {} = props;
  const { dispatchCategoriesChange, deadlineFormatters } = useContext(CategoriesContext);
  const { convertToStoredFormat: deadlineFormatter } = deadlineFormatters;

  // --- react-hook-form --------------------------------------------------------------- //
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  // set up element refs
  const titleRef    = useRef<HTMLInputElement    | null>(null);
  const detailRef   = useRef<HTMLTextAreaElement | null>(null);
  const dateRef     = useRef<HTMLInputElement    | null>(null);
  const timeRef     = useRef<HTMLInputElement    | null>(null);
  const priorityRef = useRef<HTMLSelectElement   | null>(null);
  const statusRef   = useRef<HTMLSelectElement   | null>(null);
  // --------------------------------------------------------------- react-hook-form --- //


  // --- executeSubmit の helper 関数 ------------------------------------------------------ //
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
    const newTodo: TodoType = {
      id:                                                               generateUUID(),
      createdDate:                                                          new Date(),
      updatedDate:                                                          new Date(),
      status:                                                inputData.status || '---',
      deadline:      deadlineFormatter(inputData.deadlineDate, inputData.deadlineTime),
      priority:                                            inputData.priority || '---',
      isArchived:                                                                false,
      title:                                                     inputData.title || '',
      detail:                                                   inputData.detail || '',
      isOpen:                                                                     true,
    };
    dispatchCategoriesChange({ type: 'add_new_todo', newTodo });
  }
  // ------------------------------------------------------ executeSubmit の helper 関数 --- //

  // --------------------------------------------------------------------- submit で実行 --- //
  const executeSubmit = (inputData: InputDataType) => {
    formInitializer();                              // 1. form の初期化
    addNewTodo(inputData);                          // 2. newTodo を categories に追加
  };
  // --- submit で実行 --------------------------------------------------------------------- //

  const priorityValues: PriorityType[] = priorityLiterals;
  const statusValues:     StatusType[] =   statusLiterals;


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
              className    = {    'parts title' }
              partsFor     = {    'title' }
              as           = {    'input' }
              feature      = { 'optional' }
              register     = {   register }
              partsRef     = {   titleRef }
              defaultValue = {         '' }
              inputType    = {     'text' }
              placeholder  = {    'Title' } />

            <FormParts
              className    = {   'parts detail' }
              partsFor     = {   'detail' }
              as           = { 'textarea' }
              feature      = { 'optional' }
              register     = {   register }
              partsRef     = {  detailRef }
              defaultValue = {         '' }
              placeholder  = {   'Detail' } />
          </div>

        </fieldset>


        <fieldset className="child-field">
          <legend className='child-legend'>
            Deadline:
          </legend>
          <div className='parts-container date-time'>
            <FormParts
              className    = {     'parts date' }
              partsFor     = {     'date' }
              as           = {    'input' }
              feature      = { 'optional' }
              register     = {   register }
              partsRef     = {    dateRef }
              defaultValue = {         '' }
              inputType    = {     'date' } />
            <span className='form-separater'></span>
            <FormParts
              className    = {     'parts time' }
              partsFor     = {     'time' }
              as           = {    'input' }
              feature      = { 'optional' }
              register     = {   register }
              partsRef     = {    timeRef }
              defaultValue = {         '' }
              inputType    = {     'time' } />
          </div>

        </fieldset>

        <fieldset className="child-field">
          <legend className='child-legend'>
            Others:
          </legend>
          <div className='parts-container status-priority'>
            <FormParts
              className     = {     'parts status' }
              partsFor      = {     'status' }
              as            = {     'select' }
              feature       = {   'optional' }
              register      = {     register }
              partsRef      = {    statusRef }
              defaultValue  = {        '---' }
              selectOptions = { statusValues } />
            <span className='form-separater'></span>
            <FormParts
              className     = {     'parts priority' }
              partsFor      = {     'priority' }
              as            = {       'select' }
              feature       = {     'optional' }
              register      = {       register }
              partsRef      = {    priorityRef }
              defaultValue  = {          '---' }
              selectOptions = { priorityValues } />
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

  /* height: 500px; */
  /* background: cyan; */

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