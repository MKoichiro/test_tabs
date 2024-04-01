/*
  [CreateNewTodo Component]
    element: form
    description:
      active な category に新たなtodoを追加するためのフォームを提供している
*/


/* common: essential */
import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodoType, TodosType, PriorityType, StatusType } from '../../types/Todos';
import { AllTodosContext } from '../../providers/AllTodosProvider';
/* react-hook-form */
import { useForm } from 'react-hook-form';


// === component 定義部分 ============================================= //
interface DataType {
  title?: string;
  detail?: string;
  deadline_date?: Date;
  deadline_time?: Date;
  priority?: PriorityType;
  status?: StatusType;
}

type DeadlineType = { date: Date; use_time: boolean } | '---';


export const CreateNewTodo = () => {
  const { activeIndex, allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  // set up element refs
  const { ref: refForTitle,    ...restForTitle    } = register('title');
  const { ref: refForDetail,   ...restForDetail   } = register('detail');
  const { ref: refForDate,     ...restForDate     } = register('deadline_date');
  const { ref: refForTime,     ...restForTime     } = register('deadline_time');
  const { ref: refForPriority, ...restForPriority } = register('priority');
  const { ref: refForStatus,   ...restForStatus   } = register('status');
  const titleRef    = useRef<HTMLInputElement    | null>(null);
  const detailRef   = useRef<HTMLTextAreaElement | null>(null);
  const dateRef     = useRef<HTMLInputElement    | null>(null);
  const timeRef     = useRef<HTMLInputElement    | null>(null);
  const priorityRef = useRef<HTMLSelectElement   | null>(null);
  const statusRef   = useRef<HTMLSelectElement   | null>(null);

  // --- executeSubmit で実行する関数 ------------------------------------------------------ //
  // 1. form を初期化
  const formInitializer = () => {
    // 各項目の入力内容をクリア
    titleRef.current    && (titleRef.current.value    = '');
    detailRef.current   && (detailRef.current.value   = '');
    dateRef.current     && (dateRef.current.value     = '');
    timeRef.current     && (timeRef.current.value     = '');
    priorityRef.current && (priorityRef.current.value = '---');
    statusRef.current   && (statusRef.current.value   = '---');
    // focus を title にリセット
    titleRef.current && titleRef.current.focus();
  }

  // 2. deadline プロパティに渡す値を整形
  const formatDeadline = (data: DataType, now: Date): DeadlineType => {
    const date = data.deadline_date;
    const time = data.deadline_time;
    if (date) {
      if (time) { return { date: new Date(`${ date } ${ time }`), use_time: true }                } // 年月日: 有り,   時刻: 有り
      else      { return { date: new Date(`${ date } 23:59:59`), use_time: false, }               } // 年月日: 有り,   時刻: 無し
    } else {
      if (time) { return { date: new Date(`${ now.toDateString() } ${ time }`), use_time: true, } } // 年月日: 無し,   時刻: 有り
      else      { return '---'                                                                } // 年月日: 無し,   時刻: 無し
    }
  }

  // 3. newTodo を allTodos に追加, dispatch して変更を実装
  const updateAllTodos = (data: DataType, now: Date, deadlineFormatted: DeadlineType) => {
    const currentAllTodos: TodosType[] = [...allTodos];
    const newTodo: TodoType = {
      id: currentAllTodos[activeIndex].next_assigning_id,
      created_date: now,
      updated_date: now,
      status: data.status || '---',
      get completed() { return data.status === 'COMPLETED' },
      deadline: deadlineFormatted,
      get expired() { return (!this.completed && this.deadline !== '---') && Date.now() > this.deadline.date.getTime(); },
      priority: data.priority || '---',
      archived: false,
      main: data.title || '',
      detail: data.detail || '',
      open: true,
    };

    currentAllTodos[activeIndex].todos.push(newTodo);
    const newAllTodos: TodosType[] = currentAllTodos;
    dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
  };
  // ------------------------------------------------------ executeSubmit で実行する関数 --- //

  // --------------------------------------------------------------------- submit で実行 --- //
  const executeSubmit = (data: DataType) => {
    const now = new Date;
    const deadlineFormatted: DeadlineType = formatDeadline(data, now);  // deadline を整形
    formInitializer();                              // form の初期化
    updateAllTodos(data, now, deadlineFormatted);   // newAllTodos を作成
  };
  // --- submit で実行 --------------------------------------------------------------------- //



  return (
    <StyledForm onSubmit={ handleSubmit(executeSubmit) }>
      <fieldset>
        <legend>CREATE NEW TODO</legend>

        <div className="container title-container">
          <label htmlFor="title">
            <span className="input-feature optional">optional</span>
            <span>Title:</span>
          </label>
          <div className='input-and-error'>
            <input
              type="text"
              id="title"
              { ...restForTitle }
              // name="title" {...rest} 内で設定される
              ref={ (e) => { refForTitle(e); titleRef.current = e; }} />
            <p>error message</p>
          </div>
        </div>

        <div className="container detail-container">
          <label htmlFor="detail">
            <span className="input-feature optional">optional</span>
            <span>Detail:</span>
          </label>
          <div className='input-and-error'>
            <textarea
              id="detail"
              { ...restForDetail }
              ref={ (e) => { refForDetail(e); detailRef.current = e; } } />
            <p>error message</p>
          </div>
        </div>

        <div className="outer-container deadline-container">

          <header>Deadline:</header>

          <div className='inner-container'>
            <div className="deadline-date-container">
              <label htmlFor="deadline_date">
                <span className="input-feature optional">optional</span>
                <span>Date:</span>
              </label>
              <div className='input-and-error'>
                <input
                  type="date"
                  id="deadline_date"
                  defaultValue=""
                  { ...restForDate }
                  ref={ (e) => { refForDate(e); dateRef.current = e; } } />
                <p>error message</p>
              </div>
            </div>

            <div className="deadline-time-container">
              <label htmlFor="deadline_time">
                <span className="input-feature optional">optional</span>
                <span>Time:</span>
              </label>
              <div className='input-and-error'>
                <input
                  type="time"
                  id="deadline_time"
                  defaultValue=""
                  { ...restForTime }
                  ref={ (e) => { refForTime(e); timeRef.current = e; } } />
                <p>error message</p>
              </div>

            </div>
          </div>

        </div>

        <div className="container priority-container">
          <label htmlFor="priority">
            <span className="input-feature optional">optional</span>
            <span>Priority:</span>
          </label>
          <div className='input-and-error'>
            <select
              id="priority"
              defaultValue="---"
              { ...restForPriority }
              ref={ (e) => { refForPriority(e); priorityRef.current = e; } }
            >
              <option value="---" > --- </option>
              <option value="Highest" > Highest </option>
              <option value="High"    > High    </option>
              <option value="Medium"  > Medium  </option>
              <option value="Low"     > Low     </option>
              <option value="Lowest"  > Lowest  </option>
            </select>
            <p>error message</p>
          </div>
        </div>

        <div className="container status-container">
          <label htmlFor="status">
            <span className="input-feature optional">optional</span>
            <span>Status:</span>
          </label>
          <div className='input-and-error'>
            <select
              id="status"
              defaultValue="---"
              { ...restForStatus }
              ref={ (e) => { refForStatus(e); statusRef.current = e; } }
            >
              <option value="---"         > ---         </option>
              <option value="Not Started"     > Not Started     </option>
              <option value="In Progress..."  > In Progress...  </option>
              <option value="COMPLETED"       > COMPLETED       </option>
              <option value="Aborted"         > Aborted         </option>
              <option value="Pending"         > Pending         </option>
            </select>
            <p>error message</p>
          </div>
        </div>

        <button >
          test
        </button>
      </fieldset>
    </StyledForm>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledForm = styled.form`
  height: 500px;
  background: cyan;

  fieldset {
    // reset
    border: none;
    padding: 0;

    legend {
      font-size: 2rem;
    }

    .container,
    .outer-container { 
      margin-top: 3.2rem;
      label {
        display: flex;
        gap: .8rem;
        height: fit-content;
        .input-feature {
          background: pink;
        }
      }

      .input-and-error {
        flex: 1;
        p {
          margin-left: auto;
          width: fit-content;
        }
      }

    }

    .container {
      display: flex;
      label {
        width: 15%;
      }
      .input-and-error {
        input,
        textarea {
          width: 100%;
        }
        select {
          width: 15%;
        }
      }
    }

    .outer-container {
      .inner-container {
        display: flex;
        gap: 3.2rem;
        .deadline-date-container,
        .deadline-time-container {
          display: flex;
          flex: 1;
          label {
            width: 30%;
          }
          .input-and-error {
            input {
              width: 37%;
            }
          }
        }
      }
    }

  }
`;
// ================================================= style 定義部分 === //