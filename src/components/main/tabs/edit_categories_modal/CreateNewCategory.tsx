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
import { AddBtn } from '../../../common/btns_icons/add_btn/AddBtn';
import { AddNewLabel } from './AddNewLabel';
import { StyledLegend } from '../../create_new_todo/fields/StyledLegend';
import { SFC, SFCContainer } from '../../create_new_todo/fields/parts/form_controls/ShrinkableFormControl';
import { FormLayoutContainer, FormLayoutItem } from '../../create_new_todo/fields/parts/FormLayout';
import { FormPartsWithError } from '../../create_new_todo/fields/parts/FormPartsWithError';

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

    const setRef = (e: HTMLInputElement) => {
        refForName(e);
        nameRef.current = e;
    };

    return { handleSubmit, executeSubmit, errors, restForName, setRef };
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
    const { handleSubmit, executeSubmit, errors, restForName, setRef } = useCreateNewCategory();

    return (
        <StyledForm onSubmit={handleSubmit(executeSubmit)}>
            <fieldset>
                <StyledLegend children="Create New Category" />

                <FormLayoutContainer $twoCols={false}>
                    <FormLayoutItem idx={0}>
                        <AddNewLabel
                            htmlFor="category_name"
                            feature="required"
                            labelTxt="name"
                        />
                        <FormPartsWithError error={errors.category_name}>
                            <SFCContainer>
                                <SFC
                                    type="text"
                                    id="category_name"
                                    placeholder="例: 買い物リスト"
                                    {...restForName}
                                    ref={setRef}
                                />
                            </SFCContainer>
                        </FormPartsWithError>
                    </FormLayoutItem>
                </FormLayoutContainer>

                <AddBtn className="btn-add" />
            </fieldset>
        </StyledForm>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledForm = styled.form`
    fieldset {
        .btn-add {
            margin-top: 0.4rem;
        }
    }
`;
// ========================================================= STYLE === //
