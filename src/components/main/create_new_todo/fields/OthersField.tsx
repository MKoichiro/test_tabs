import React, { ChangeEvent, MutableRefObject } from 'react';
import styled from 'styled-components';
import { statusData, priorityData } from '../FormSetting';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { AddNewLabel } from './parts/AddNewLabel';
import { ChildLegend, FormLayoutContainer, FormLayoutItem, FormPartsWithError } from './commonStyles';
import { FormColSeparator } from './parts/FormColSeparator';

// === TYPE =========================================================== //
interface OthersFieldProps {
    className: string;
    register: UseFormRegister<FieldValues>;
    refs: {
        status: MutableRefObject<HTMLSelectElement | null>;
        priority: MutableRefObject<HTMLSelectElement | null>;
    };
    errors?: {
        status: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
        priority: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    };
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
type PropsPickerForUseOthersField = 'register' | 'refs';
const useOthersField = ({ register, refs }: Pick<OthersFieldProps, PropsPickerForUseOthersField>) => {
    const { ref: RHF_statusRef, onChange: RHF_statusOnChange, ...RHF_statusRest } = register('status');
    const { ref: RHF_priorityRef, onChange: RHF_priorityOnChange, ...RHF_priorityRest } = register('priority');

    const setDateRef = (e: HTMLSelectElement | null) => {
        refs.status.current = e;
        RHF_statusRef(e);
    };
    const setTimeRef = (e: HTMLSelectElement | null) => {
        refs.priority.current = e;
        RHF_priorityRef(e);
    };

    const handleDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        RHF_statusOnChange(e);
    };
    const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        RHF_priorityOnChange(e);
    };

    return {
        setRefs: { status: setDateRef, priority: setTimeRef },
        handleChanges: { status: handleDateChange, priority: handleTimeChange },
        RHFRest: { status: RHF_statusRest, priority: RHF_priorityRest },
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
export const OthersField = ({ className, errors, ...rest }: OthersFieldProps) => {
    const { setRefs, handleChanges, RHFRest } = useOthersField({ ...rest });

    return (
        <StyledFieldSet className={className}>
            <ChildLegend>Others</ChildLegend>

            <FormLayoutContainer $twoCols={true}>
                {/* status */}
                <FormLayoutItem
                    className={statusData.name}
                    idx={0}
                >
                    <AddNewLabel
                        htmlFor={statusData.name}
                        formData={statusData}
                    />
                    <FormPartsWithError error={errors?.status}>
                        <select
                            id={statusData.name}
                            defaultValue={statusData.defaultValue}
                            ref={setRefs.status}
                            onChange={handleChanges.status}
                            {...RHFRest.status}
                        >
                            {statusData.optionValues.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    </FormPartsWithError>
                </FormLayoutItem>

                <FormColSeparator className="form-col-separator" />

                {/* priority */}
                <FormLayoutItem
                    className={priorityData.name}
                    idx={1}
                >
                    <AddNewLabel
                        htmlFor={priorityData.name}
                        formData={priorityData}
                    />
                    <FormPartsWithError error={errors?.priority}>
                        <select
                            id={priorityData.name}
                            defaultValue={priorityData.defaultValue}
                            ref={setRefs.priority}
                            onChange={handleChanges.priority}
                            {...RHFRest.priority}
                        >
                            {priorityData.optionValues.map((priority) => (
                                <option
                                    key={priority}
                                    value={priority}
                                >
                                    {priority}
                                </option>
                            ))}
                        </select>
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
