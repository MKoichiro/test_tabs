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
import { useCategoriesSelector, useDispatch } from '../../../providers/redux/store';

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
    const { ulRef, categories, openModal } = useTabs();

    return (
        <StyledNav>
            <ul
                ref={ulRef}
            >
                {categories.map((category, i) => {
                    return (
                        <Tab
                            key={category.id}
                            ulRef={ulRef}
                            idx={i}
                        />
                    );
                })}
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
const StyledNav = styled.nav`
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1.6rem;
    height: 5rem;
    > ul {
        width: 62vw;
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
        background: #fff;
        width: 3px;
        margin-left: 1.6rem;
    }
    > button {
        display: block;
        padding: 0 1.6rem;
    }
`;
// ========================================================= STYLE === //