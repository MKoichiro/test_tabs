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
import { CategoriesContext } from '../../../../providers/CategoriesProvider';
import { TodoType, CategoryType, notSet } from '../../../../types/Categories';
/* react-hook-form */
import { useForm } from 'react-hook-form';
import { generateUUID } from '../../../../utils/generateUUID';


// === component 定義部分 ============================================= //
// 新規カテゴリーにデフォルトで入れるtodoの見出し及びコメント
const TEMPLATE_MESSAGE = {
  title: 'template message of main',
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

  const { categories, dispatchCategoriesChange } = useContext(CategoriesContext);

  const { register, handleSubmit, formState: { errors } } = useForm<DataType>({ mode: 'onChange' });
  const { ref: refForName, ...restForName } = register('category_name', NAME_VALIDATION);
  const nameRef = useRef<HTMLInputElement | null>(null);


  const updateCategories = (data: DataType, now: Date) => {
    const templateTodo: TodoType = {
      id: generateUUID(),
      createdDate: now,
      updatedDate: now,
      deadline: notSet,
      status: notSet,
      priority: notSet,
      isArchived: false,
      title: TEMPLATE_MESSAGE.title,
      detail: TEMPLATE_MESSAGE.detail,
      isOpen: true,
    };

    const newTodos: CategoryType = {
      id: generateUUID(),
      isActive: false,
      createdDate: now,
      updatedDate: now,
      isArchived: false,
      name: data.category_name,
      todos: [templateTodo],
    };

    const newCategories: CategoryType[] = [...categories];
    newCategories.push(newTodos);
    dispatchCategoriesChange({ type: 'update_categories', newCategories });
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
    updateCategories(data, now);
    dispatchCategoriesChange({ type: 'switch_tab', newActiveIdx: categories.length });
  };

  return (
    <StyledForm onSubmit={ handleSubmit(executeSubmit) }>
      <fieldset>
        <legend children='Create New Category' />

        <div className='container category_name-container'>
          <label htmlFor="category_name">
            <span className="input-feature required">Required</span>
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

        <button className='btn-add'>
          ADD
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
    margin: 0;

    legend {
      padding: 0; // reset
      font-size: 2rem;
    }

    .container {
      margin-top: 1.6rem;
      display: flex;
      align-items: center;
      gap: .8rem;

      label {
        display: flex;
        gap: .8rem;
        .input-feature {
          background: pink;
          padding: 0 1em;
        }
      }

      .input-and-error {
        flex: 1;
        input {
          font-size: var(--fs-form);
          /* height: 4rem; */
          line-height: 3.6rem;
          width: 100%;
          border-radius: 0;
          border: none;
          outline: none;
          padding: 0 .8rem;
        }
        p {
          margin-left: auto;
          width: fit-content;
        }
      }

      @media (width < 600px) {
        flex-direction: column;
        align-items: flex-start;
        label {
          margin-right: auto;
        }
        .input-and-error {
          flex: 0 1 auto;
          width: 100%;
          input {
            
          }
        }
      }
    }

    .btn-add {
      background: #fff;

      display: block;
      width: fit-content;
      height: fit-content;
      margin-top: 1.6rem;
      margin-left: auto;
      padding: .4rem .8rem;
    }


  }
`;
// ================================================= style 定義部分 === //