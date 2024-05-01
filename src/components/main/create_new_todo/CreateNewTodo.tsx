/**
 * @summary Create New Todo のフォームを表示するコンポーネント
 * @issues
 * - TODO: title は必須項目にする
 * @copilot
 * - 未確認
 * @module
 */

/* --- react/styled-components --- */
import React, { useRef } from 'react';
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

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CreateNewTodoType {}

interface InputDataType {
    title?: string;
    detail?: string;
    deadlineDate?: Date;
    deadlineTime?: Date;
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
        const newTodo: TodoType = {
            id: generateUUID(),
            createdDate: new Date(),
            updatedDate: new Date(),
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
        executeSubmit
    } = useCreateNewTodo();


    return (
        <StyledForm onSubmit={handleSubmit(executeSubmit)}>
            <fieldset>
                <legend className="form-legend">CREATE NEW TODO</legend>

                <fieldset className="child-field">
                    <legend className="child-legend">Main</legend>
                    <div className="parts-container title-detail">
                        <FormParts
                            className={'parts title'}
                            partsFor={'title'}
                            as={'input'}
                            feature={'optional'}
                            register={register}
                            partsRef={titleRef}
                            defaultValue={defaultValues.title}
                            inputType={'text'}
                            placeholder={placeholders.title}
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
                        />
                    </div>
                </fieldset>

                <div className="btn-submit-container">
                    <button>+ ADD</button>
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
        padding: 0.4rem 0.8rem;
        font-size: 1.8rem;
        @media (width < 600px) {
            font-size: 16px;
        }
    }
    /* reset */

    fieldset {
        margin: 0 0.8rem;

        legend {
            font-weight: bold;
        }

        .form-legend {
            font-size: 2rem;
        }

        .child-field {
            margin-top: 1.6rem;
            .child-legend {
                font-size: 1.8rem;
                margin-bottom: 0.8rem;
                /* font-weight: bold; */
                &::after {
                    /* content: ':'; */
                }
            }

            /* common */
            .parts-container {
                display: flex;
                .parts {
                    display: flex;
                    gap: 0.8rem;
                    /* align-items: center; */

                    label {
                        display: flex;
                        height: fit-content;
                        gap: 0.4rem;
                        .feature {
                            font-size: 0.8em;
                            padding: 0 0.6rem;
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
                        input,
                        textarea,
                        select {
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
                        border-left: 0.2rem solid black;
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
                border: 0.15rem solid black;
            }
        }
    }
`;
// ========================================================= STYLE === //
