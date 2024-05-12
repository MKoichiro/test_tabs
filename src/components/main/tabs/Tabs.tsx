/**
 * @summary カテゴリーのタブメニューを表示するコンポーネント。
 *
 * @issues
 *
 * @copilot
 * > ulを別コンポーネントに切り出す。
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

/* --- redux --------------------- */
import { register } from '../../../providers/redux/slices/modalSlice';
import {
    useCategoriesSelector,
    useDispatch,
    useWindowSizeSelector,
} from '../../../providers/redux/store';

/* --- providers/contexts -------- */
import { useModalOpener } from '../../../providers/context_api/ModalElmsRef';
import { modalNames } from '../../common/modal/settings';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

/* --- child components ---------- */
import { Tab } from './Tab';
import { EditCategoriesModal } from './edit_categories_modal/EditCategoriesModal';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @summary {@link TabsContainer} の Props の型定義。
 * @remarks 今のところ、propsは不要なので未使用。
 * @category Type of Props
 */
// interface TabsProps {}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param arg - {@link Tabs} コンポーネントが受け取る props をそのまま引数として受け取る。
 *
 * @category Custom Hook
 * @example
 * ```tsx
 * const { ulRef, categories, openModal } = useTabs();
 * ```
 */
export const useTabs = () => {
    const modalName = modalNames.editCategories;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(register(modalName));
    }, []);

    const { tabCarouselStyleFactors } = useWindowSizeSelector();

    // contexts
    const { categoriesEntity: categories } = useCategoriesSelector();
    const openModal = useModalOpener(modalName);

    // register refs
    const ulRef = useRef<HTMLUListElement | null>(null);

    return {
        /** {@link Tab} に渡す。タブ切り替え時のタブメニューのオートスクロールに使用。 */
        ulRef,
        categories,
        openModal,
        tabCarouselStyleFactors,
    };
};

// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<nav/>`
 * @example
 * ```tsx
 * <Tabs />
 * ```
 *
 * @category Component
 */
export const Tabs = () => {
    const { ulRef, categories, openModal, tabCarouselStyleFactors } = useTabs();

    const modalBtnWidth = `${tabCarouselStyleFactors.modalBtnWidth}%`;

    return (
        <StyledNav $modalBtnWidth={modalBtnWidth}>
            <ul ref={ulRef}>
                {categories
                    .filter((category) => !category.isArchived)
                    .map((category, i) => (
                        <Tab
                            key={category.id}
                            ulRef={ulRef}
                            idx={i}
                            category={category}
                        />
                    ))}
            </ul>

            <span className={'separator-tabs'} />

            <button onClick={openModal}>
                <FontAwesomeIcon icon={faPen} />
            </button>

            <EditCategoriesModal />
        </StyledNav>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledNav = styled.nav<{ $modalBtnWidth: string }>`
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    @media (width < 600px) {
        height: 4rem;
    }
    > ul {
        width: 100%;
        display: flex;
        height: 100%;
        overflow-x: auto;

        -ms-overflow-style: none;
        scrollbar-width: none;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .separator-tabs {
        display: block;
        height: 100%;
        background: var(--color-black-1);
        width: var(--border-weight);
        margin-left: 1.6rem;
    }
    > button {
        width: ${({ $modalBtnWidth }) => $modalBtnWidth};
        display: block;
    }
`;
// ========================================================= STYLE === //
