import React, { MutableRefObject, ReactNode } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { titleData, detailData } from './FormSetting';
import { AddNewLabel } from './AddNewLabel';
import { FlexibleTextarea } from './FlexibleTextarea';

interface MainFieldProps {
    className: string;
    register: UseFormRegister<FieldValues>;
    refs: {
        title: MutableRefObject<HTMLTextAreaElement | null>;
        detail: MutableRefObject<HTMLTextAreaElement | null>;
    };
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    isFieldsetBlurred: boolean;
}

export const MainField = ({ className, register, refs, error, isFieldsetBlurred }: MainFieldProps) => {
    return (
        <StyledFieldSet className={className}>
            <legend className="child-legend">Main</legend>

            <div className="title-detail">
                {/* title */}
                <div className={' ' + titleData.name}>
                    <AddNewLabel formData={titleData} />
                    <div className="input-error">
                        <FlexibleTextarea
                            id={titleData.name}
                            RHF_Register={register}
                            textareaRef={refs.title}
                            formData={titleData}
                            placeholder={titleData.placeholder}
                        />
                        <p className="error-message">{error && !isFieldsetBlurred && (error.message as ReactNode)}</p>
                    </div>
                </div>

                {/* detail */}
                <div className={' ' + detailData.name}>
                    <AddNewLabel formData={detailData} />
                    <div className="input-error">
                        <FlexibleTextarea
                            id={detailData.name}
                            RHF_Register={register}
                            textareaRef={refs.detail}
                            formData={detailData}
                            placeholder={detailData.placeholder}
                        />
                        <p className="error-message">{error && !isFieldsetBlurred && (error.message as ReactNode)}</p>
                    </div>
                </div>
            </div>
        </StyledFieldSet>
    );
};

interface StyledFieldSetProps {}
const StyledFieldSet = styled.fieldset<StyledFieldSetProps>`
    .child-legend {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 0.8rem;
    }
    .title-detail {
        .title,
        .detail {
            display: flex;

            .input-error {
                flex: 1;
                .error-message {
                    margin-top: 0.2rem;
                    color: tomato;
                    height: 1.6rem;
                    line-height: 1.6rem;
                }
            }
        }
    }
`;
