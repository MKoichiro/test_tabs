import React, { MutableRefObject, useState } from 'react';
import styled, { css } from 'styled-components';
import { DetailFormData, TitleFormData } from './FormSetting';
import { FieldValues, UseFormRegister } from 'react-hook-form';

// === TYPE =========================================================== //
interface FlexibleTextareaProps {
    className?: string;
    formData: TitleFormData | DetailFormData;
    id: string;
    placeholder: string;
    RHF_Register?: UseFormRegister<FieldValues>;
    textareaRef?: MutableRefObject<HTMLTextAreaElement | null>;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
export const useFTABase = () => {
    const [dummyTxt, setDummyTxt] = useState('');
    const PourIntoDummy = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDummyTxt(e.target.value + '\u200b');
    };
    return {
        dummyTxt,
        PourIntoDummy,
    };
};

type UseRHFAdapter = {
    formData: TitleFormData | DetailFormData;
    RHF_Register?: UseFormRegister<FieldValues>;
    textareaRef?: MutableRefObject<HTMLTextAreaElement | null>;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    PourIntoDummy: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const useRHFAdapter = ({ formData, RHF_Register, onChange, PourIntoDummy, textareaRef }: UseRHFAdapter) => {
    const options = formData.required ? { required: formData.required } : {};
    let registerEmission:
        | ReturnType<UseFormRegister<FieldValues>>
        | undefined
        | { ref: undefined; onChange: undefined };
    RHF_Register
        ? (registerEmission = RHF_Register(formData.name, options))
        : (registerEmission = { ref: undefined, onChange: undefined });
    const { ref: RHF_Ref, onChange: onChangeRHF, ...RHF_Rest } = registerEmission;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        PourIntoDummy(e);
        onChange && onChange(e);
        onChangeRHF && onChangeRHF(e);
    };

    const setRef = (e: HTMLTextAreaElement | null) => {
        textareaRef && (textareaRef.current = e);
        RHF_Ref && RHF_Ref(e);
    };
    return {
        handleChange,
        setRef,
        RHF_Rest,
    };
};

type UseFTA = Omit<UseRHFAdapter, 'PourIntoDummy'>;
export const useFTA = (args: UseFTA) => {
    const { dummyTxt, PourIntoDummy } = useFTABase();
    const { handleChange, setRef, RHF_Rest } = useRHFAdapter({ ...args, PourIntoDummy });

    return {
        dummyTxt,
        handleChange,
        setRef,
        RHF_Rest,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const FlexibleTextarea = ({ className, id, placeholder, ...rest }: FlexibleTextareaProps) => {
    const { dummyTxt, handleChange, setRef, RHF_Rest } = useFTA({ ...rest });

    return (
        <StyledFTAContainer className={className}>
            <StyledFTADummy>{dummyTxt}</StyledFTADummy>

            <StyledFTAReal
                id={id}
                placeholder={placeholder}
                ref={setRef}
                onChange={handleChange}
                {...RHF_Rest}
            />
        </StyledFTAContainer>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledFTAContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    --net-fs: 1.4;
    @media (width < 600px) {
        --net-fs: 11;
    }
    --real-fs: 1.6;
    @media (width < 600px) {
        --real-fs: 16;
    }
    --expand: calc(var(--real-fs) / var(--net-fs));
    --shrink: calc(var(--net-fs) / var(--real-fs));
`;
const commonDummyReal = () => css`
    letter-spacing: 0.05em;
    --line-height: 1.5em;
    --padding: 0.8rem;
    line-height: 1.5em;
    padding: var(--padding);
    min-height: calc(var(--line-height) + var(--padding) * 2);
    font-family: var(--ff-1);
`;
const StyledFTADummy = styled.div`
    ${commonDummyReal()}
    font-size: calc(var(--net-fs) * 1rem);
    @media (width < 600px) {
        font-size: calc(var(--net-fs) * 1px);
    }

    min-width: 100%;

    /* visibility: hidden; */

    text-shadow: 0 0 0.1rem red;
    overflow-x: hidden;
    // 半角英数字の文字列、の場合にも折り返しを行う
    overflow-wrap: break-all;
    word-wrap: break-all;
    word-break: break-word;
    // 改行を適切に反映させる
    white-space: pre-wrap;
`;
const StyledFTAReal = styled.textarea`
    ${commonDummyReal()}

    font-size: calc(var(--real-fs) * 1rem);
    @media (width < 600px) {
        font-size: calc(var(--real-fs) * 1px);
    }
    scale: var(--shrink);
    transform-origin: top left;
    width: calc(100% * var(--expand));
    height: calc(100% * var(--expand));
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-white-3);
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    box-sizing: border-box;
`;
// ========================================================= STYLE === //

// styled-componentsにpropsを渡すと
// Warning: React does not recognize the `className` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `classname` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
// のようなエラーが出る。
