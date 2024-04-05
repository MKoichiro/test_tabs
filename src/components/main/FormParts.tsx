import React, { FC, ForwardedRef, InputHTMLAttributes, MutableRefObject, RefObject, forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { PriorityType, StatusType } from '../../types/Categories';

// === component 定義部分 ============================================= //
interface FormPartsType {
  className: string;
  partsFor: string;
  as: 'input' | 'textarea' | 'select';
  feature: 'optional' | 'required';

  register: UseFormRegister<FieldValues>;
  partsRef: MutableRefObject<any>;

  defaultValue?: string;
  inputType?: 'text' | 'date' | 'time';
  placeholder?: string;
  selectOptions?: StatusType[] | PriorityType[];
}
export const FormParts:FC<FormPartsType> = (props) => {
  const {
    className,
    partsFor,
    as,
    feature,
    
    register,
    partsRef,
    
    defaultValue,
    inputType,
    placeholder,
    selectOptions,
  } = props;
  const { ref, ...rest } = register(partsFor); // 第二引数でrequired などを設定することもできる


  const htmlFor = partsFor;
  const id = partsFor;

  const labelTxt = partsFor.charAt(0).toUpperCase() + partsFor.slice(1); // 例: 'Title', ::after で ':' を付与



  return (
    <StyledDiv className={className}>

      <label htmlFor={htmlFor}>
        <span className="feature">{feature}</span>
        <span className="label-txt">{labelTxt}</span>
      </label>

      <div className='input-error'>

        { as === 'input'
          && (
            <input
              type={inputType}
              id={id}
              placeholder={placeholder || ''}
              {...rest}                                             // [memo] name="title" が {...rest} 内で設定される
              ref= {(e) => { ref(e); partsRef.current = e; }} />
          )
        }

        { as === 'textarea'
          && (
            <textarea
              id={id}
              placeholder={placeholder || ''}
              {...rest}
              ref= {(e) => { ref(e); partsRef.current = e; }} />
          )
        }

        { as === 'select'
          && (
            <select
              id={id}
              defaultValue={defaultValue || ''}
              {...rest}
              ref= {(e) => { ref(e); partsRef.current = e; }}
            >
              { selectOptions?.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              )) }
            </select>
          )
        }

        <p className='error-message'>error message</p>
      </div>
    </StyledDiv>
  )
};

// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledDiv = styled.div`

  
`;
// ================================================= style 定義部分 === //
