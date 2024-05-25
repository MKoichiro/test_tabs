import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { titleData, detailData } from '../FormSetting';
import { AddNewLabel } from './parts/AddNewLabel';
import { FTAContext, useFTA, FTA } from './parts/form_controls/FlexTextarea';
import { StyledLegend } from './StyledLegend';
import { isDebugMode } from '../../../../utils/adminDebugMode';
import { FormLayoutContainer, FormLayoutItem } from './parts/FormLayout';
import { FormPartsWithError } from './parts/FormPartsWithError';

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
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
const useMainField = ({ register, refs }: Pick<MainFieldProps, 'register' | 'refs'>) => {
    const titleFTA = useFTA();
    const detailFTA = useFTA();

    const { ref: RHF_titleRef, onChange: RHF_titleOnChange, ...RHF_titleRest } = register('title');
    const { ref: RHF_detailRef, onChange: RHF_detailOnChange, ...RHF_detailRest } = register('detail');

    const setTitleRef = (e: HTMLTextAreaElement | null) => {
        refs.title.current = e;
        RHF_titleRef(e);
    };
    const setDetailRef = (e: HTMLTextAreaElement | null) => {
        refs.detail.current = e;
        RHF_detailRef(e);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        RHF_titleOnChange(e);
        titleFTA.handleChange(e);
    };
    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        RHF_detailOnChange(e);
        detailFTA.handleChange(e);
    };

    return {
        setRefs: { title: setTitleRef, detail: setDetailRef },
        handleChanges: { title: handleTitleChange, detail: handleDetailChange },
        RHFRest: { title: RHF_titleRest, detail: RHF_detailRest },
        settings: { title: titleFTA.settings, detail: detailFTA.settings },
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const MainField = ({ className, register, refs, errors }: MainFieldProps) => {
    const { setRefs, handleChanges, RHFRest, settings } = useMainField({ register, refs });
    return (
        <StyledFieldSet className={className}>
            <StyledLegend>Main</StyledLegend>

            <FormLayoutContainer $twoCols={false}>
                {/* title */}
                <FormLayoutItem
                    className={titleData.name}
                    idx={0}
                >
                    <AddNewLabel formData={titleData} />
                    <FormPartsWithError error={errors?.title}>
                        <FTAContext FTASettings={settings.title}>
                            <FTA
                                as="textarea"
                                id={titleData.name}
                                placeholder={titleData.placeholder}
                                ref={setRefs.title}
                                onChange={handleChanges.title}
                                {...RHFRest.title}
                                $isDev={isDebugMode}
                            />
                        </FTAContext>
                    </FormPartsWithError>
                </FormLayoutItem>

                {/* detail */}
                <FormLayoutItem
                    className={detailData.name}
                    idx={1}
                >
                    <AddNewLabel formData={detailData} />
                    <FormPartsWithError error={errors?.detail}>
                        <FTAContext FTASettings={settings.detail}>
                            <FTA
                                as="textarea"
                                id={detailData.name}
                                placeholder={detailData.placeholder}
                                ref={setRefs.detail}
                                onChange={handleChanges.detail}
                                {...RHFRest.detail}
                                $isDev={isDebugMode}
                            />
                        </FTAContext>
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
