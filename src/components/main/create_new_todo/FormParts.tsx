/**
 * @summary CreateNewTodo のフォーム部品
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { StatusLiteralsType, PriorityLiteralsType } from '../../../providers/types/categories';

/* --- react-hook-form ----------- */ /* の型 */
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
interface FormPartsProps {
    className: string;
    partsFor: string;
    as: 'input' | 'textarea' | 'select';
    feature: 'optional' | 'required';

    register: UseFormRegister<FieldValues>;
    partsRef: MutableRefObject<any>;

    defaultValue?: string;
    inputType?: 'text' | 'date' | 'time';
    placeholder?: string;
    selectOptions?: StatusLiteralsType | PriorityLiteralsType;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    isFieldsetBlurred: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
export const useFormParts = ({ partsFor, register }: Pick<FormPartsProps, 'partsFor' | 'register'>) => {
    const htmlFor = partsFor;
    const id = partsFor;
    const labelTxt = partsFor.charAt(0).toUpperCase() + partsFor.slice(1); // 例: 'Title', ::after で ':' を付与

    let options;
    switch (partsFor) {
        case 'title': {
            options = { required: 'Please enter a title' };
            break;
        }
        default: {
            break;
        }
    }
    const { ref, ...rest } = register(partsFor, options);

    return {
        id,
        htmlFor,
        labelTxt,
        ref,
        rest,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const FormParts = (props: FormPartsProps) => {
    const {
        className, // ↓ essentials
        partsFor,
        as,
        feature,
        register, // ↓ react-hook-form
        partsRef,
        defaultValue, // ↓ input/textarea/selectなどに渡すもの
        inputType,
        placeholder,
        selectOptions,
        error,
        isFieldsetBlurred,
    } = props;

    const { id, htmlFor, labelTxt, ref, rest } = useFormParts({ partsFor, register });

    const toFirstUpperCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <StyledDiv className={className}>
            <label htmlFor={htmlFor}>
                <span className={feature + ' feature'}>{toFirstUpperCase(feature)}</span>
                <span className="label-txt">{labelTxt}</span>
            </label>

            <div className="input-error">
                {as === 'input' && (
                    <input
                        type={inputType}
                        id={id}
                        placeholder={placeholder || ''}
                        {...rest} // [memo] name="title" が {...rest} 内で設定される
                        ref={(e) => {
                            ref(e);
                            partsRef.current = e;
                        }}
                    />
                )}

                {as === 'textarea' && (
                    <textarea
                        id={id}
                        placeholder={placeholder || ''}
                        {...rest}
                        ref={(e) => {
                            ref(e);
                            partsRef.current = e;
                        }}
                    />
                )}

                {as === 'select' && (
                    <select
                        id={id}
                        defaultValue={defaultValue || ''}
                        {...rest}
                        ref={(e) => {
                            ref(e);
                            partsRef.current = e;
                        }}
                    >
                        {selectOptions?.map((option, i) => (
                            <option
                                key={i}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                )}

                <p className="error-message">{error && !isFieldsetBlurred && (error.message as React.ReactNode)}</p>
            </div>
        </StyledDiv>
    );
};

// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div`
    /* Webkit（Chrome、Safari）の日付入力箇所のスタイリング */
    input[type='date']::-webkit-inner-spin-button {
        /* スピンボタンの非表示 */
        /* display: none; */
    }
    input[type='date']::-webkit-calendar-picker-indicator {
        /* カレンダーピッカーのスタイリング */
        /* background: transparent; */
    }
    .error-message {
        margin-top: 0.2rem;
        color: tomato;
        height: 1.6rem;
        line-height: 1.6rem;
    }
`;
// ========================================================= STYLE === //
