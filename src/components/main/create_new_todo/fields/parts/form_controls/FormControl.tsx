import styled from 'styled-components';
import { formControlStyleContext } from '../../../../../../styles/common/formControl';

/**
 * input, select, textareaなどの各種フォームパーツ要素の共通スタイル。
 * defaultはinputなので、他の要素として使いたい場合には、as属性で要素を指定して使う。
 */
export const FormControl = styled.input`
    ${formControlStyleContext()}
    color: var(--color-black-1);
    background: var(--color-white-3);
    padding: var(--input-padding);
    font-size: var(--input-fs);
    line-height: var(--input-line-height);
    width: 100%;
    height: calc(var(--input-line-height) + var(--input-padding) * 2);
`;
