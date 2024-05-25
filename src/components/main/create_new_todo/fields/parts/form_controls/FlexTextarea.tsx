import React, { ChangeEvent, PropsWithChildren, useState } from 'react';
import styled, { css } from 'styled-components';
import { isDebugMode } from '../../../../../../utils/adminDebugMode';
import { SFC, SFCContainer, SFCVariables } from './ShrinkableFormControl';

// === TYPE =========================================================== //
interface FlexibleTextareaProps {
    className?: string;
    FTASettings: { shadowTxt: string };
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const FTAContext = ({ className, children, FTASettings }: PropsWithChildren<FlexibleTextareaProps>) => {
    return (
        <FTAContainer className={className}>
            <FTADummy $isDev={isDebugMode}>{FTASettings.shadowTxt}</FTADummy>
            {children}
        </FTAContainer>
    );
};
// ====================================================== COMPONENT === //

// === HOOK =========================================================== //
export const useFTA = () => {
    /**
     * 高さ決定のためのダミーコンテナに流し込むシャドウテキスト
     */
    const [shadowTxt, setShadowTxt] = useState('');

    /**
     * 末尾の空行を反映させるために、ダミーにはゼロ幅スペースを追加
     * @see https://00m.in/dSQQy
     */
    const PourIntoDummy = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setShadowTxt(e.target.value + '\u200b');
    };

    return {
        settings: { shadowTxt: shadowTxt },
        handleChange: PourIntoDummy,
    };
};
// =========================================================== HOOK === //

// === STYLE ========================================================== //
// 0. SFCVariables
const commonDummyReal = () => css`
    font-family: var(--ff-1);
    letter-spacing: 0.05em;
`;

// 1. FTAContainer
interface FTAContainerProps {}
const FTAContainer = styled(SFCContainer)<FTAContainerProps>``;

// 2. FTADummy
interface FTADummyProps {
    $isDev: boolean;
}
const FTADummy = styled.div<FTADummyProps>`
    ${commonDummyReal()}
    ${SFCVariables()}
  padding: var(--input-padding);
    line-height: var(--input-line-height);
    min-height: calc(var(--input-line-height) + var(--input-padding) * 2);
    font-size: calc(var(--net-fs) * 1rem);
    @media (width < 600px) {
        font-size: calc(var(--net-fs) * 1px);
    }

    min-width: 100%;

    visibility: ${({ $isDev }) => ($isDev ? 'visible' : 'hidden')};
    text-shadow: ${({ $isDev }) => ($isDev ? '0 0 0.1rem red' : 'none')};

    // 半角英数字の文字列、の場合にも折り返しを行う
    overflow-wrap: break-all;
    word-wrap: break-all;
    word-break: break-word;
    // 改行を適切に反映させる
    white-space: pre-wrap;
`;

// 3. FTA
interface FTAProps {
    $isDev: boolean;
}
export const FTA = styled(SFC)<FTAProps>`
    ${commonDummyReal()}

    background: ${({ $isDev }) => ($isDev ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-white-3)')};
    overflow: hidden;
`;
// ========================================================= STYLE === //
