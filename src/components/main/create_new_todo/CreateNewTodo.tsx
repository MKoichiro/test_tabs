/**
 * @summary Create New Todo のフォームを表示するコンポーネント
 * @issues
 * - TODO: title は必須項目にする
 * @copilot
 * - 未確認
 * @module
 */

/* --- react/styled-components --- */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { FormParts } from './FormParts';

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
import { defaultValues, statusOptions, priorityOptions, placeholders } from './FormSetting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const titleRef = useRef<HTMLInputElement | null>(null);
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
        resetField("title", {keepError: false}); // 3. react-hook-form の form をリセット(エラーメッセージの表示など、これをしないと「エラーで拒絶→正常な入力でsubmit」の次回以降の入力時、フォーカスしただけでエラーメッセージが表示されてしまう)
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
}

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
        resetField("title", {keepError: false});
    };


    return (
        <StyledForm onSubmit={handleSubmit(executeSubmit)}>
            <fieldset className="parent-field" onBlur={handleBlur} onFocus={handleFocus}>
                <legend className="form-legend">CREATE NEW TODO</legend>

                <fieldset className="child-field">
                    <legend className="child-legend">Main</legend>
                    <div className="parts-container title-detail">
                        <FormParts
                            className={'parts title'}
                            partsFor={'title'}
                            as={'input'}
                            feature={'required'}
                            register={register}
                            partsRef={titleRef}
                            defaultValue={defaultValues.title}
                            inputType={'text'}
                            placeholder={placeholders.title}
                            error={errors.title}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />

                        <FormParts
                            className={'parts detail'}
                            partsFor={'detail'}
                            as={'textarea'}
                            feature={'optional'}
                            register={register}
                            partsRef={detailRef}
                            defaultValue={defaultValues.detail}
                            placeholder={placeholders.detail}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />
                    </div>
                </fieldset>

                <fieldset className="child-field">
                    <legend className="child-legend">Deadline</legend>
                    <div className="parts-container date-time">
                        <FormParts
                            className={'parts date'}
                            partsFor={'date'}
                            as={'input'}
                            feature={'optional'}
                            register={register}
                            partsRef={dateRef}
                            defaultValue={defaultValues.date}
                            inputType={'date'}
                            placeholder={placeholders.date}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />
                        <span className="form-separator"></span>
                        <FormParts
                            className={'parts time'}
                            partsFor={'time'}
                            as={'input'}
                            feature={'optional'}
                            register={register}
                            partsRef={timeRef}
                            defaultValue={defaultValues.time}
                            inputType={'time'}
                            placeholder={placeholders.time}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />
                    </div>
                </fieldset>

                <fieldset className="child-field">
                    <legend className="child-legend">Others</legend>
                    <div className="parts-container status-priority">
                        <FormParts
                            className={'parts status'}
                            partsFor={'status'}
                            as={'select'}
                            feature={'optional'}
                            register={register}
                            partsRef={statusRef}
                            defaultValue={'---'}
                            selectOptions={statusOptions}
                            placeholder={placeholders.status}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />
                        <span className="form-separator"></span>
                        <FormParts
                            className={'parts priority'}
                            partsFor={'priority'}
                            as={'select'}
                            feature={'optional'}
                            register={register}
                            partsRef={priorityRef}
                            defaultValue={'---'}
                            selectOptions={priorityOptions}
                            placeholder={placeholders.priority}
                            isFieldsetBlurred={isFieldsetBlurred}
                        />
                    </div>
                </fieldset>

                <div className="btn-submit-container">
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                        ADD
                    </button>
                </div>
            </fieldset>
        </StyledForm>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledForm = styled.form`
    margin-top: 2.4rem;
    /* reset */
    fieldset {
        border: none;
        padding: 0;
        margin: 0;
    }
    input,
    textarea,
    select {
        border: none;
        border-radius: 0;
        outline: none;

    }
    input[type='date'],
    input[type='time'] {
        -webkit-appearance: none;
    }
    /* reset */

    .parent-field {
        margin: 0 .8rem;

        legend {
            font-weight: bold;
        }

        .form-legend {
            font-size: 2.4rem;
        }

        .child-field {
            margin-top: 1.6rem;
            .child-legend {
                font-size: 2rem;
                margin-bottom: .8rem;

            }

            /* common */
            .parts-container {
                display: flex;
                .parts {
                    display: flex;
                    gap: .8rem;
                    @media (width < 600px) {
                        flex-direction: column;
                        gap: 0.4rem;
                    }

                    label {
                        display: flex;
                        height: fit-content;
                        align-items: center;
                        gap: 0.4rem;
                        .feature {
                            height: 100%;
                            font-size: .9em;
                            padding: .2rem .6rem;
                        }
                        .feature.optional {
                            font-weight: bold;
                            letter-spacing: 0.1rem;
                            border: var(--border-weight) solid var(--color-black-1);
                        }
                        .feature.required {
                            background: var(--color-black-1);
                            color: var(--color-white-2);
                            font-weight: bold;
                            letter-spacing: 0.1rem;
                            border: var(--border-weight) solid var(--color-black-1);
                        }
                        .label-txt {
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            font-weight: bold;
                            font-size: 1.8rem;
                            &::after {
                                content: ':';
                            }
                            @media (width < 600px) {
                                justify-content: flex-start;
                                font-size: 16px;
                            }
                        }
                    }

                    .input-error {
                        input,
                        textarea,
                        select {
                            min-width: 100%;
                            color: var(--color-black-1);
                            background-color: #efefef;
                            padding: 0 .8rem;
                            font-size: 1.8rem;
                            @media (width < 600px) {
                                font-size: 16px;
                            }
                        }
                        input,
                        select {
                            height: 3.2rem;
                            line-height: 3.2rem;
                        }
                        textarea {
                            min-height: 6.4rem;
                            line-height: 1.6;
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
                gap: 0.8rem;
                flex-direction: column;
                /* label : input = 2 : 6 + 1 + 2 + 6 (=15) */
                .parts {
                    label {
                        flex: 2;
                    }
                    .input-error {
                        flex: 15;
                    }
                }
            }
            /* .parts-container for date-time, status-priority */
            .date-time,
            .status-priority {
                flex-direction: row;
                /* label : input : separator : label : input = 2 : 6 : 1 : 2 : 6 */
                .parts {
                    flex: 8; // 2 + 6
                    label {
                        flex: 2;
                    }
                    .input-error {
                        flex: 6;
                    }
                }
                .form-separator {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &::before {
                        content: '';
                        display: block;
                        height: 80%;
                        border-left: var(--border-1);
                    }
                }
                @media (width < 600px) {
                    flex-direction: column;
                    gap: 0.8rem;
                    .parts {
                        label {
                            flex: 2;
                        }
                        .input-error {
                            flex: 6;
                        }
                    }
                    .form-separator {
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
                padding: 0.4rem 0.8rem;
                border: var(--border-1);
                .fa-plus {
                    margin-right: 0.8rem;
                }
            }
            button:active {
                scale: .9;
                transition: scale 50ms;
            }
        }
    }

`;
// ========================================================= STYLE === //
