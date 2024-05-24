/**
 * @summary Create New Category 表示部分
 *
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React, { useRef } from 'react';
import styled from 'styled-components';

/* --- redux --------------------- */
import { useDispatch, useCategoriesSelector } from '../../../../providers/redux/store';
import { switchCategory, updateCategories } from '../../../../providers/redux/slices/categoriesSlice';

/* --- types --------------------- */
import { TodoType, CategoryType, notSet } from '../../../../providers/types/categories';

/* --- react-hook-form ----------- */
import { useForm } from 'react-hook-form';

/* --- utils --------------------- */
import { generateUUID } from '../../../../utils/generateUUID';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddBtn } from '../../../common/btns_icons/add_btn/AddBtn';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === CONST ========================================================= //
// 新規カテゴリーにデフォルトで入れるtodoの見出し及びコメント
const TEMPLATE_MESSAGE = {
    title: 'template message of main',
    detail: 'template message of detail',
};
// バリデーションエラーメッセージ
const NAME_VALIDATION = {
    required: 'この項目は必須です。',
    pattern: {
        value: /\S/,
        message: '空白・改行・タブ文字以外の入力が必要です。',
    },
};
// ========================================================= CONST === //

// === TYPE =========================================================== //
// - PROPS
// interface CreateNewCategoryType {}

// - OTHERS
interface DataType {
    category_name: string;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useCreateNewCategory = () => {
    const { categoriesEntity: categories } = useCategoriesSelector();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DataType>({ mode: 'onChange' });
    const { ref: refForName, ...restForName } = register('category_name', NAME_VALIDATION);
    const nameRef = useRef<HTMLInputElement | null>(null);

    const dispatchUpdateCategories = (data: DataType, now: Date) => {
        const templateTodo: TodoType = {
            id: generateUUID(),
            createdDate: now.toISOString(),
            updatedDate: now.toISOString(),
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
            createdDate: now.toISOString(),
            updatedDate: now.toISOString(),
            isArchived: false,
            name: data.category_name,
            todos: [templateTodo],
        };

        const newCategories: CategoryType[] = [...categories];
        newCategories.push(newTodos);
        dispatch(updateCategories(newCategories));
    };

    const formInitializer = () => {
        // 各項目の入力内容をクリア
        nameRef.current && (nameRef.current.value = '');
        // focus を category name にリセット
        nameRef.current && nameRef.current.focus();
    };

    const executeSubmit = (data: DataType) => {
        const now = new Date();
        formInitializer();
        dispatchUpdateCategories(data, now);
        dispatch(switchCategory(categories.length));
    };

    return { handleSubmit, executeSubmit, errors, refForName, restForName, nameRef };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<form/>`
 * @example
 * ```tsx
 * <CreateNewCategory />
 * ```
 *
 * @category Component
 */
export const CreateNewCategory = () => {
    const { handleSubmit, executeSubmit, errors, refForName, restForName, nameRef } = useCreateNewCategory();

    return (
        <StyledForm onSubmit={handleSubmit(executeSubmit)}>
            <fieldset>
                <legend children="Create New Category" />

                <div className="container category_name-container">
                    <label htmlFor="category_name">
                        <span className="input-feature required">Required</span>
                        <span>Category Name:</span>
                    </label>
                    <div className="input-and-error">
                        <input
                            type="text"
                            id="category_name"
                            placeholder="例: 買い物リスト"
                            {...restForName}
                            ref={(e) => {
                                refForName(e);
                                nameRef.current = e;
                            }}
                        />
                        <p>{errors.category_name?.message}</p>
                    </div>
                </div>

                <AddBtn className="btn-add"/>
            </fieldset>
        </StyledForm>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledForm = styled.form`
    fieldset {
        // reset
        border: none;
        padding: 0;
        margin: 0;
        color: var(--color-black-1);

        legend {
            padding: 0; // reset
            font-weight: bold;
            font-size: 2rem;
        }

        .container {
            margin-top: 1.6rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;

            label {
                display: flex;
                gap: 0.8rem;
                font-weight: bold;
                .input-feature {
                    font-size: 0.9em;
                    padding: 0.2rem 0.6rem;

                    background: var(--color-black-1);
                    color: var(--color-white-2);
                    font-weight: bold;
                    letter-spacing: 0.1rem;
                    border: var(--border-weight) solid var(--color-black-1);
                }
            }

            .input-and-error {
                flex: 1;
                input {
                    font-size: var(--fs-form);
                    line-height: 3.6rem;
                    width: 100%;
                    border-radius: 0;
                    border: none;
                    outline: none;
                    padding: 0 0.8rem;
                    background: var(--color-white-3);
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
            margin-top: 1.6rem;
        }


    }
`;
// ========================================================= STYLE === //
