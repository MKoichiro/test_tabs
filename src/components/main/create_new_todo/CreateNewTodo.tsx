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
import { StatusUnionType, PriorityUnionType, TodoType, notSet } from '../../../providers/types/categories';

/* --- utils --------------------- */
import { generateUUID } from '../../../utils/generateUUID';
import { DLFormatters } from '../../../utils/todoPropsHandler';

/* --- react-hook-form ----------- */
import { useForm } from 'react-hook-form';

/* --- settings ------------------ */
import { useGlobalRef } from '../../../providers/context_api/global_ref/GlobalRef';
import { useCategoriesSelector } from '../../../providers/redux/store';
import { formControlStyleContext } from '../../../styles/common/formControl';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
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
    } = useForm({
        mode: 'onChange',
        resetOptions: { keepErrors: false, keepValues: false },
        reValidateMode: 'onChange',
    });
    // set up element refs
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
        priorityRef.current && (priorityRef.current.value = notSet);
        statusRef.current && (statusRef.current.value = notSet);
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
            status: inputData.status || notSet,
            deadline: formattedDeadline,
            priority: inputData.priority || notSet,
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

/**
 * activeCategoryDiv を取得し、その中にフォームを表示。
 * activeIdxが更新されるたびに、activeCategoryDivも更新し、フォームを付け替えるイメージ。
 * 初回ロード時にcategoryDivRefのセットより先にフォームを表示しようとするため、
 * useEffectでcategoryDivRefが初期化されたらactiveCategoryDivにセットする。
 * @category Custom Hook
 */
export const useActiveCategoryAttachment = () => {
    const { categoriesEntity: categories, activeIdx } = useCategoriesSelector();
    const activeCategoryId = categories[activeIdx].id;
    const categoryDivRef = useGlobalRef({ propertyName: 'categoryDiv', id: activeCategoryId });
    const [activeCategoryDiv, setActiveCategoryDiv] = useState<HTMLElement | undefined | null>(null);

    useEffect(() => {
        setActiveCategoryDiv(categoryDivRef.current);
    }, [categoryDivRef.current]);

    return { activeCategoryDiv };
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
    } = useCreateNewTodo();

    const { activeCategoryDiv } = useActiveCategoryAttachment();

    return activeCategoryDiv
        ? createPortal(
              <>
                  <SectionSeparator
                      sectionName="Add New"
                      icon={<AddBoxOutlined />}
                      marginTop="3.2rem"
                  />
                  <StyledForm onSubmit={handleSubmit(executeSubmit)}>
                      <fieldset className="parent-field">
                          <MainField
                              className="child-field"
                              register={register}
                              refs={{ title: titleRef, detail: detailRef }}
                              errors={{ title: errors.title, detail: errors.detail }}
                          />

                          <DeadlineField
                              className="child-field"
                              register={register}
                              refs={{ date: dateRef, time: timeRef }}
                              errors={{ date: errors.deadlineDate, time: errors.deadlineTime }}
                          />

                          <OthersField
                              className="child-field"
                              register={register}
                              refs={{ status: statusRef, priority: priorityRef }}
                              errors={{ status: errors.status, priority: errors.priority }}
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

// === STYLE ========================================================== //
const StyledForm = styled.form`
    ${formControlStyleContext()};
`;
// ========================================================== STYLE === //
