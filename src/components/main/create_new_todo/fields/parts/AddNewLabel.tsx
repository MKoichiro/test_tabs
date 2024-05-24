import React from 'react';
import styled from 'styled-components';
import {
    DetailFormData,
    TitleFormData,
    D_DateFormData,
    D_TimeFormData,
    StatusFormData,
    PriorityFormData,
} from '../../FormSetting';

// === TYPE =========================================================== //
interface AddNewLabelProps {
    className?: string;
    htmlFor?: string;
    formData: TitleFormData | DetailFormData | D_DateFormData | D_TimeFormData | StatusFormData | PriorityFormData;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const AddNewLabel = ({ className, htmlFor, formData }: AddNewLabelProps) => {
    const classNameFormatted = `${className} label-as-layout-item`;
    const featureClassList = [
        formData.getFeature(), // 'required' or 'optional'
        'feature',
    ];
    const classNameFeature = featureClassList.join(' ');

    return (
        <StyledLabel
            className={classNameFormatted}
            htmlFor={htmlFor || formData.name}
        >
            <span className={classNameFeature}>{formData.getUpperFeature()}</span>
            <span className="label-txt">{formData.getUpperName()}</span>
        </StyledLabel>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
interface StyledLabelProps {}
const StyledLabel = styled.label<StyledLabelProps>`
    display: flex;
    height: fit-content;
    align-items: center;
    gap: 0.4rem;
    font-weight: bold;
    .feature {
        height: 100%;
        font-size: 0.8em;
        padding: 0.1em 0.5em;
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
        font-size: 1.6rem;
        @media (width < 600px) {
            justify-content: flex-start;
            font-size: 11px;
        }
        letter-spacing: 0.08em;
        &::after {
            content: ':';
        }
    }
`;
// ========================================================= STYLE === //
