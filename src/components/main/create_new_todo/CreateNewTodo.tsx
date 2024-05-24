/**
 * @summary Create New Todo のフォームを表示するコンポーネント
 * @issues
 * - TODO: title は必須項目にする
 * @copilot
 * - 未確認
 * @module
 */

/* --- react/styled-components --- */
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

/* --- child components ---------- */
import { SectionSeparator } from '../../common/section_separator/SectionSeparator';
import { MainField } from './fields/MainField';
import { DeadlineField } from './fields/DeadlineField';
import { OthersField } from './fields/OthersField';
import { AddBoxOutlined } from '@mui/icons-material';
import { AddBtn } from '../../common/btns_icons/add_btn/AddBtn';

/* --- providers/contexts -------- */
import { addTodo } from '../../../providers/redux/slices/categoriesSlice';

/* --- redux ---------------------- */
import { useDispatch } from 'react-redux';

/* --- types --------------------- */
import { StatusUnionType, PriorityUnionType, TodoType } from '../../../providers/types/categories';

/* --- utils --------------------- */
import { generateUUID } from '../../../utils/generateUUID';
import { DLFormatters } from '../../../utils/todoPropsHandler';

/* --- react-hook-form ----------- */
import { useForm } from 'react-hook-form';

/* --- settings ------------------ */
import { useGlobalRef } from '../../../providers/context_api/global_ref/GlobalRef';
import { useCategoriesSelector } from '../../../providers/redux/store';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CreateNewTodoType {}

interface InputDataType {
    title?: string;
    detail?: string;
    deadlineDate?: string;
    deadlineTime?: string;
    status?: StatusUnionType;
    priority?: PriorityUnionType;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useCreateNewTodo = () => {
    const dispatch = useDispatch();
    const { toSaveDeadline } = DLFormatters;

    // --- react-hook-form ---------------------------------------- //
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm({ mode: 'onChange' });
    // set up element refs
    // const titleRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const detailRef = useRef<HTMLTextAreaElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const timeRef = useRef<HTMLInputElement | null>(null);
    const priorityRef = useRef<HTMLSelectElement | null>(null);
    const statusRef = useRef<HTMLSelectElement | null>(null);
    // ---------------------------------------- react-hook-form --- //

    // --- executeSubmit の helper 関数 --------------------------- //
    // 1. form を初期化
    const formInitializer = () => {
        // 各項目の入力内容をクリア
        titleRef.current && (titleRef.current.value = '');
        detailRef.current && (detailRef.current.value = '');
        dateRef.current && (dateRef.current.value = '');
        timeRef.current && (timeRef.current.value = '');
        priorityRef.current && (priorityRef.current.value = '---');
        statusRef.current && (statusRef.current.value = '---');
        // focus を title にリセット
        titleRef.current && titleRef.current.focus();
    };

    // 2. newTodo を categories に追加
    const addNewTodo = (inputData: InputDataType) => {
        const formattedDeadline = toSaveDeadline(inputData.deadlineDate, inputData.deadlineTime);
        const nowDateISOStr = new Date().toISOString();
        const newTodo: TodoType = {
            id: generateUUID(),
            createdDate: nowDateISOStr,
            updatedDate: nowDateISOStr,
            status: inputData.status || '---',
            deadline: formattedDeadline,
            priority: inputData.priority || '---',
            isArchived: false,
            title: inputData.title || '',
            detail: inputData.detail || '',
            isOpen: true,
        };
        dispatch(addTodo(newTodo));
    };
    // --------------------------- executeSubmit の helper 関数 --- //

    // --- submit で実行 ------------------------------------------ //
    const executeSubmit = (inputData: InputDataType) => {
        formInitializer(); // 1. form の初期化
        addNewTodo(inputData); // 2. newTodo を categories に追加
        resetField('title', { keepError: false }); // 3. react-hook-form の form をリセット(エラーメッセージの表示など、これをしないと「エラーで拒絶→正常な入力でsubmit」の次回以降の入力時、フォーカスしただけでエラーメッセージが表示されてしまう)
    };
    // ------------------------------------------ submit で実行 --- //

    return {
        register,
        handleSubmit,
        titleRef,
        detailRef,
        dateRef,
        timeRef,
        priorityRef,
        statusRef,
        executeSubmit,
        errors,
        resetField,
    };
};

// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * @renderAs
 * - `<form/>`
 * @example
 * ```tsx
 * <CreateNewTodo />
 * ```
 * @category Component
 */
export const CreateNewTodo = () => {
    const {
        register,
        handleSubmit,
        titleRef,
        detailRef,
        dateRef,
        timeRef,
        priorityRef,
        statusRef,
        executeSubmit,
        errors,
        resetField,
    } = useCreateNewTodo();

    const [isFieldsetBlurred, setIsFieldsetBlurred] = useState(false);
    const handleFocus = () => {
        setIsFieldsetBlurred(false);
    };
    const handleBlur = () => {
        setIsFieldsetBlurred(true);
        resetField('title', { keepError: false });
    };

    // activeCategoryDiv を取得し、その中にフォームを表示。
    // activeIdxが更新されるたびに、activeCategoryDivも更新し、フォームを付け替えるイメージ。
    const { categoriesEntity: categories, activeIdx } = useCategoriesSelector();
    const activeCategoryId = categories[activeIdx].id;
    const categoryDivRef = useGlobalRef({ propertyName: 'categoryDiv', id: activeCategoryId });
    const [activeCategoryDiv, setActiveCategoryDiv] = useState<HTMLElement | undefined | null>(null);

    // 初回ロード時にcategoryDivRefのセットより先にフォームを表示しようとするため、
    // useEffectでcategoryDivRefが初期化されたらactiveCategoryDivにセットする。
    useEffect(() => {
        setActiveCategoryDiv(categoryDivRef.current);
    }, [categoryDivRef.current]);

    return activeCategoryDiv
        ? createPortal(
              <>
                  <SectionSeparator
                      sectionName="Add New"
                      icon={<AddBoxOutlined />}
                      marginTop="3.2rem"
                  />
                  <StyledForm onSubmit={handleSubmit(executeSubmit)}>
                      <fieldset
                          className="parent-field"
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                      >
                          <MainField
                              className="child-field"
                              register={register}
                              refs={{ title: titleRef, detail: detailRef }}
                              error={errors.title}
                              isFieldsetBlurred={isFieldsetBlurred}
                          />

                          <DeadlineField
                              className="child-field"
                              register={register}
                              refs={{ date: dateRef, time: timeRef }}
                              error={errors.date}
                              isFieldsetBlurred={isFieldsetBlurred}
                          />

                          <OthersField
                              className="child-field"
                              register={register}
                              refs={{ status: statusRef, priority: priorityRef }}
                              error={errors.status}
                              isFieldsetBlurred={isFieldsetBlurred}
                          />
                      </fieldset>
                      <AddBtn />
                  </StyledForm>
              </>,
              activeCategoryDiv
          )
        : null; // copilot: nullよりloading iconを表示した方が良い。とのこと、今のところ読み込みにはほぼ時間がかからないので、そのまま。
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledForm = styled.form`
    /* variables */
    --input-padding: 0.8rem;
    --input-line-height: 1.5rem;
    --input-fs-num: 1.6;
    --input-fs: calc(var(--input-fs-num) * 1rem);
    @media (width < 600px) {
        --input-fs-num: 11;
        --input-fs: calc(var(--input-fs-num) * 1px);
    }
`;
// ========================================================= STYLE === //
