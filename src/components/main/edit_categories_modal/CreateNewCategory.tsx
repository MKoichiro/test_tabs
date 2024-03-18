/*
  [CreateNewCategory]
    element: form
    description:
      edit categories modal 内で新たな category を追加するためのフォームを提供している
*/


/* common: essential */
import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodoType, TodosType } from '../../../types/Todos';
import { AllTodosContext } from '../../../providers/AllTodosProvider';
/* react-hook-form */
import { useForm } from 'react-hook-form';


// === component 定義部分 ============================================= //
// 新規カテゴリーにデフォルトで入れるtodoの見出し及びコメント
const TEMPLATE_MESSAGE = {
  main: 'template message of main',
  detail: 'template message of detail',
}
// バリデーションエラーメッセージ
const NAME_VALIDATION = {
  required: 'この項目は必須です。',
  pattern: {
    value: /\S/,
    message: '空白・改行・タブ文字以外の入力が必要です。'
  }
}

interface DataType {
  category_name: string;
}
export const CreateNewCategory = () => {

  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);

  const { register, handleSubmit, formState: { errors } } = useForm<DataType>({ mode: 'onChange' });
  const { ref: refForName, ...restForName } = register('category_name', NAME_VALIDATION);
  const nameRef = useRef<HTMLInputElement | null>(null);


  const updateAllTodos = (data: DataType, now: Date) => {
    const templateTodo: TodoType = {
      id: 1,
      created_date: now,
      updated_date: now,
      deadline: 'not set',
      get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
      get completed() { return this.status === 'COMPLETED' },
      status: 'not set',
      priority: 'not set',
      archived: false,
      main: TEMPLATE_MESSAGE.main,
      detail: TEMPLATE_MESSAGE.detail,
      open: true,
    };

    const newTodos: TodosType = {
      id: allTodos.reduce((store, todos) => Math.max(store, todos.id), 0) + 1,
      active: false,
      created_date: now,
      updated_date: now,
      archived: false,
      category_name: data.category_name,
      get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
      todos: [templateTodo],
    };

    const newAllTodos: TodosType[] = [...allTodos];
    newAllTodos.push(newTodos);
    dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
  };

  const formInitializer = () => {
    // 各項目の入力内容をクリア
    nameRef.current && (nameRef.current.value = '');
    // focus を category name にリセット
    nameRef.current && nameRef.current.focus();
  };

  const executeSubmit = (data: DataType) => {
    const now = new Date;
    formInitializer();
    updateAllTodos(data, now);
    dispatchAllTodosChange({ type: 'switch_tab', newActiveIndex: allTodos.length });
  };

  return (
    <StyledForm onSubmit={ handleSubmit(executeSubmit) }>
      <fieldset>
        <legend children='Create New Categories' />

        <div className='container category_name-container'>
          <label htmlFor="category_name">
            <span className="input-feature required">required</span>
            <span>Category Name:</span>
          </label>
          <div className='input-and-error'>
            <input
              type="text"
              id="category_name"
              placeholder='例: 買い物リスト'
              { ...restForName }
              ref={ (e) => { refForName(e); nameRef.current = e; } } />
              <p>{ errors.category_name?.message }</p>
          </div>
        </div>

        <button>
          submit
        </button>
      </fieldset>

    </StyledForm>
  )
}
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledForm = styled.form`
  fieldset {
    // reset
    border: none;
    padding: 0;
  }
`;
// ================================================= style 定義部分 === //