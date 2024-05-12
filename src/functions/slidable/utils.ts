import { CSSProperties } from 'react';

// helper functions which does not depend on React states
export const applyStyles = (styles: CSSProperties) => {
    Object.assign(document.body.style, styles);
};
export const removeStyles = (keys: (keyof CSSProperties)[]) => {
    const stylesToRemove = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}); // 例: { paddingRight: '', position: '', ... }
    Object.assign(document.body.style, stylesToRemove);
};
