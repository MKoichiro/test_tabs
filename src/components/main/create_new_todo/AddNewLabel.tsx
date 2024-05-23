import React from 'react';
import styled from 'styled-components';
import { DetailFormData, TitleFormData } from './FormSetting';

// === TYPE =========================================================== //
interface AddNewLabelProps {
    className?: string;
    formData: TitleFormData | DetailFormData;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const AddNewLabel = ({ className, formData }: AddNewLabelProps) => {
    const classNameLabel = className ? className : '';
    const featureClassList = [
        formData.getFeature(), // 'required' or 'optional'
        'feature',
    ];
    const classNameFeature = featureClassList.join(' ');

    return (
        <StyledLabel
            className={classNameLabel}
            htmlFor={formData.name}
        >
            <span className={classNameFeature}>{formData.getUpperFeature()}</span>
            <span className="label-txt">{formData.getUpperName()}</span>
        </StyledLabel>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledLabel = styled.label`
    display: flex;
    height: fit-content;
    min-width: 15%;
    align-items: center;
    gap: 0.4rem;
    font-weight: bold;
    .feature {
        height: 100%;
        font-size: 0.9em;
        padding: 0.2rem 0.6rem;
        letter-spacing: 0.1em;
    }
    .feature.optional {
        border: var(--border-weight) solid var(--color-black-1);
    }
    .feature.required {
        background: var(--color-black-1);
        color: var(--color-white-2);
        border: var(--border-weight) solid var(--color-black-1);
    }
    .label-txt {
        flex: 1;
        display: flex;
        justify-content: space-between;
        font-size: 1.8rem;
        @media (width < 600px) {
            justify-content: flex-start;
            font-size: 12px;
        }
        letter-spacing: 0.05em;
        &::after {
            content: ':';
        }
    }
`;
// ========================================================= STYLE === //
