/**
 * @summary
 * カテゴリー名のタブメニューの中の、各タブを表示するコンポーネント。
 *
 * @issues
 * - TODO: ulRef({@link TabsContainer}への参照) をグローバルに管理することで、{@link useTabSwitcher} を他コンポーネントからも利用できるようにする。
 * - TODO: {@link useTabSwitcher} 内で定義している handleContainerScroll で、グローバルに参照しうる magic number が含まれているため、これを別 module に切り出す。
 * - IF_POSSIBLE: {@link useTabSwitcher} の引数を、第一引数に移動距離を算出する関数、第二引数に container の ref を返す関数に修正することで、より汎用的に利用できるようにする。
 *
 * @copilot
 * > 全体として、このコードは非常によく書かれており、特に問題点は見つかりませんでした。ただし、可能であれば、スタイルの値（特に色）をハードコードするのではなく、テーマまたは定数から取得することを検討してみてください。これにより、将来的にデザインを変更する際の作業が容易になります。
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { RefObject } from 'react';
import styled from 'styled-components';

/* --- redux --------------------- */
import { useDispatch, useCategoriesSelector, useWindowSizeSelector } from '../../../providers/redux/store';
import { switchCategory } from '../../../providers/redux/slices/categoriesSlice';

/* --- utils --------------------- */
import { vw2px } from '../../../utils/converters';
import { TabCarouselMagic } from '../../../data/styleMagics';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @summary {@link Tab} の Props の型定義。
 * @property idx - Tabのli要素としてのインデックス番号。
 * @property ulRef - TabsContainer(ul要素)への参照。
 * @category Type of Props
 */
interface TabProps {
    idx: number;
    ulRef: RefObject<HTMLUListElement>;
}
// =========================================================== TYPE === //



// === FUNCTION ======================================================= //
// 1. useTabSwitcher
/**
 * @param arg - {@link Tab} コンポーネントが受け取る {@link TabProps} 型の props をそのまま引数として受け取る。
 *
 * @summary タブを切り替えの toggleActive 関数を提供するカスタムフック。このカスタムフックは、{@link useTab} のヘルパーフックとして利用される。
 * @remarks
 * 返り値の toggleActive は、以下の処理を行う。
 * 1. active になるタブがコンテナの左端に来るようにスクロールする。
 * 2. categories の store に対して、activeIdx の更新を dispatch する。
 *
 * @example
 * ```tsx
 * const { toggleActive } = useTabSwitcher({ idx, ulRef });
 * ```
 *
 * @category Custom Hook
 */
export const useTabSwitcher = ({ idx, ulRef, styleFactors }: TabProps & { styleFactors: TabCarouselMagic }) => {
    const dispatch = useDispatch();

    const { contentsWidth } = useWindowSizeSelector();
    /**
     * toggleActiveで使うヘルパー関数。
     * TODO: magic number (currentContentWidth, 0.15) は別 module に切り出す。
     * IF_POSSIBLE: 移動距離を算出する関数を第一引数に、第二引数に container の ref を返すように修正することで、より汎用的に利用できるようにしても良い。
     */
    const handleContainerScroll = () => {
        const container = ulRef.current;

        if (!container) {
            console.error('tab ul が見つかりません。');
            return;
        }

        /** tab の idx と 非アクティブ時の tab の幅を元に、スクロール位置を計算してスムーズスクロール */
        const currentContentWidth = vw2px(contentsWidth);
        const inactiveTabWidth = currentContentWidth * (1 - styleFactors.modalBtnWidth / 100) * (styleFactors.tabMinWidth / 100);
        const targetCoordinate = inactiveTabWidth * idx;
        container.scrollTo({ left: targetCoordinate, behavior: 'smooth' });
    };

    return {
        /** useTabを通じてコンポーネントに提供、button 要素の onClick にバインドするハンドラ */
        toggleActive: () => {
            handleContainerScroll();
            dispatch(switchCategory(idx));
        },
    };
};

// 2. useTab
/**
 * @param arg - {@link Tab} コンポーネントが受け取る {@link TabProps} 型の props をそのまま引数として受け取る。
 * 
 * @category Custom Hook
 * @example
 * ```tsx
 * const { isActive, isLastItem, categoryId, categoryName, toggleActive } = useTab({ idx, ulRef });
 * ```
 */
export const useTab = ({ idx, ulRef }: TabProps) => {
    const { activeIdx, categoriesEntity: categories } = useCategoriesSelector();
    const { tabCarouselStyleFactors: styleFactors } = useWindowSizeSelector();
    // console.log(idx);
    // console.log(idx === categories.length - 1);

    return {
        isActive: activeIdx === idx,
        /** 末尾のタブ間セパレーターはレンダリングしたくないので必要 */
        isLastItem: idx === categories.length - 1,
        /** タブに紐づくカテゴリーID */
        categoryId: categories[idx].id,
        /** タブに表示するカテゴリー名 */
        categoryName: categories[idx].name,
        /** button 要素の onClick にバインドするハンドラ */
        toggleActive: useTabSwitcher({ idx, ulRef, styleFactors }).toggleActive,
        styleFactors,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <Tab idx={0} ulRef={ulRef} />
 * ```
 *
 * @category Component
 */
export const Tab = (props: TabProps) => {
    const { isActive, isLastItem, categoryId, categoryName, toggleActive, styleFactors } = useTab(props);
    // console.log(isLastItem);

    const tabMinWidth = `${styleFactors.tabMinWidth}%`;

    return (
        <StyledLi
            key={categoryId}
            $isActive={isActive}
            $tabMinWidth={tabMinWidth}
        >
            <button
                children={categoryName}
                onClick={toggleActive}
            />

            {/* {!isLastItem && <span className="separator" />} */}
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StylePropsType {
    $isActive: boolean;
    $tabMinWidth: string;
}

const StyledLi = styled.li<StylePropsType>`
    & {
        display: flex;
        gap: inherit;
        align-items: center;
        flex-grow: 1;
        flex-shrink: 0;

        transition: max-width 750ms;
        max-width: ${({ $isActive }) => ($isActive ? `100%` : '15%')};

        height: 100%;
        min-width: ${({ $tabMinWidth }) => $tabMinWidth};
    }

    button {
        display: block;
        width: 100%;
        height: 66.7%;
        padding: 0 0.8rem;
        letter-spacing: 0.15rem;

        background: ${({ $isActive }) => ($isActive ? '#444' : '')};
        color: ${({ $isActive }) => ($isActive ? '#f9f9f9' : '')};
        margin-left: 0.4rem;

        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: scale 50ms;
        border: var(--border-weight) solid #444;
    }
    button:active {
        scale: 0.95;
    }

    .separator {
        height: 100%;
        min-width: var(--border-weight);
        margin-left: 0.4rem;

        background: #fff;
    }
`;
// ========================================================= STYLE === //
