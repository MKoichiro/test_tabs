import React, { ChangeEvent, MutableRefObject } from 'react';
import styled from 'styled-components';
import { d_DateData, d_TimeData } from '../FormSetting';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { AddNewLabel } from './parts/AddNewLabel';
import { ChildLegend, FormLayoutContainer, FormLayoutItem, FormPartsWithError } from './commonStyles';
import { FormColSeparator } from './parts/FormColSeparator';

// === TYPE =========================================================== //
interface DeadlineFieldProps {
    className: string;
    register: UseFormRegister<FieldValues>;
    refs: {
        date: MutableRefObject<HTMLInputElement | null>;
        time: MutableRefObject<HTMLInputElement | null>;
    };
    errors?: {
        date: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
        time: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    };
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
type PropsPickerForUseDeadlineField = 'register' | 'refs';
const useDeadlineField = ({ register, refs }: Pick<DeadlineFieldProps, PropsPickerForUseDeadlineField>) => {
    const { ref: RHF_dateRef, onChange: RHF_dateOnChange, ...RHF_dateRest } = register('date');
    const { ref: RHF_timeRef, onChange: RHF_timeOnChange, ...RHF_timeRest } = register('time');

    const setDateRef = (e: HTMLInputElement | null) => {
        refs.date.current = e;
        RHF_dateRef(e);
    };
    const setTimeRef = (e: HTMLInputElement | null) => {
        refs.time.current = e;
        RHF_timeRef(e);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        RHF_dateOnChange(e);
    };
    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        RHF_timeOnChange(e);
    };

    return {
        setRefs: { date: setDateRef, time: setTimeRef },
        handleChanges: { date: handleDateChange, time: handleTimeChange },
        RHFRest: { date: RHF_dateRest, time: RHF_timeRest },
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const DeadlineField = ({ className, errors, ...rest }: DeadlineFieldProps) => {
    const { setRefs, handleChanges, RHFRest } = useDeadlineField({ ...rest });

    return (
        <StyledFieldSet className={className}>
            <ChildLegend>Deadline</ChildLegend>

            <FormLayoutContainer $twoCols={true}>
                {/* date */}
                <FormLayoutItem
                    className={d_DateData.name}
                    idx={0}
                >
                    <AddNewLabel
                        htmlFor={d_DateData.name}
                        formData={d_DateData}
                    />
                    <FormPartsWithError error={errors?.date}>
                        <input
                            type={d_DateData.type}
                            id={d_DateData.name}
                            ref={setRefs.date}
                            onChange={handleChanges.date}
                            placeholder={d_DateData.placeholder}
                            {...RHFRest.date}
                        />
                    </FormPartsWithError>
                </FormLayoutItem>

                <FormColSeparator className="form-col-separator" />

                {/* time */}
                <FormLayoutItem
                    className={d_TimeData.name}
                    idx={1}
                >
                    <AddNewLabel
                        htmlFor={d_TimeData.name}
                        formData={d_TimeData}
                    />
                    <FormPartsWithError error={errors?.time}>
                        <input
                            type={d_TimeData.type}
                            id={d_TimeData.name}
                            ref={setRefs.time}
                            onChange={handleChanges.time}
                            placeholder={d_TimeData.placeholder}
                            {...RHFRest.time}
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
