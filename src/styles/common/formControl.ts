import { css } from 'styled-components';

export const formControlStyleContext = () => css`
    /* form control */
    --input-padding: 0.8rem;
    --input-line-height: 2rem;
    --input-fs-num: 1.6;
    --input-fs: calc(var(--input-fs-num) * 1rem);
    @media (width < 600px) {
        --input-line-height: 15px;
        --input-fs-num: 11;
        --input-fs: calc(var(--input-fs-num) * 1px);
    }
`;
