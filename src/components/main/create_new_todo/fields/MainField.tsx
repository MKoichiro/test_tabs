import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { titleData, detailData } from '../FormSetting';
import { AddNewLabel } from './parts/AddNewLabel';
import { FlexibleTextarea } from './parts/FlexibleTextarea';
import { ChildLegend, FormLayoutContainer, FormLayoutItem, FormPartsWithError } from './commonStyles';

// === TYPE =========================================================== //
interface MainFieldProps {
    className: string;
    register: UseFormRegister<FieldValues>;
    refs: {
        title: MutableRefObject<HTMLTextAreaElement | null>;
        detail: MutableRefObject<HTMLTextAreaElement | null>;
    };
    errors?: {
        title: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
        detail: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    };
    // isFieldsetBlurred: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const MainField = ({ className, register, refs, errors }: MainFieldProps) => {
    return (
        <StyledFieldSet className={className}>
            <ChildLegend>Main</ChildLegend>

            <FormLayoutContainer $twoCols={false}>
                {/* title */}
                <FormLayoutItem
                    className={titleData.name}
                    idx={0}
                >
                    <AddNewLabel formData={titleData} />
                    <FormPartsWithError error={errors?.title}>
                        <FlexibleTextarea
                            id={titleData.name}
                            RHF_Register={register}
                            textareaRef={refs.title}
                            formData={titleData}
                            placeholder={titleData.placeholder}
                        />
                    </FormPartsWithError>
                </FormLayoutItem>

                {/* detail */}
                <FormLayoutItem
                    className={detailData.name}
                    idx={1}
                >
                    <AddNewLabel formData={detailData} />
                    <FormPartsWithError error={errors?.detail}>
                        <FlexibleTextarea
                            id={detailData.name}
                            RHF_Register={register}
                            textareaRef={refs.detail}
                            formData={detailData}
                            placeholder={detailData.placeholder}
                        />
                    </FormPartsWithError>
                </FormLayoutItem>
            </FormLayoutContainer>
        </StyledFieldSet>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledFieldSetProps {}
const StyledFieldSet = styled.fieldset<StyledFieldSetProps>``;
// ========================================================== STYLE === //