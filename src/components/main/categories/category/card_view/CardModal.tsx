/**
 * @summary Card View を表示する Modal
 * @issues
 * - なし
 * @copilot
 * - 未確認
 * @module
 */

/* --- react/styled-components --- */
import React, { useEffect } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { CardCarousel } from './CardCarousel';

/* --- providers/contexts -------- */
import { Modal } from '../../../../common/modal/Modal';
import { modalNames } from '../../../../common/modal/settings';
import { CategoryType } from '../../../../../providers/types/categories';
import { useDispatch, useModalsSelector } from '../../../../../providers/redux/store';
import { register } from '../../../../../providers/redux/slices/modalSlice';
import { useModalRegistrant } from '../../../../../providers/context_api/ModalElmsRef';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property category - カテゴリー の情報
 * @category Type of Props
 */
interface CardModalProps {
    category: CategoryType;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 * @example
 * ```tsx
 * const { modalName, isOpen, setBasicsRef, addScrollableRef } = useCardModal();
 * ```
 */
export const useCardModal = () => {
    // modalProvider
    const modalName = modalNames.cardCarousel;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(register(modalName));
    }, []);
    const isOpen = useModalsSelector().modalStates[modalName]?.isOpen;
    const { setBasicsRef, addScrollableRef } = useModalRegistrant(modalName);

    return {
        /** src/common/setting であらかじめ設定しているmodalNameを取得 */
        modalName,
        /** modalが開いているかどうか */
        isOpen,
        /** modal の基本要素(modal dialog, mask div)の ref を取得 */
        setBasicsRef,
        /** modal にスクロール可能な要素を追加する ref callback */
        addScrollableRef,
    };
};

// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<dialog/>`
 * @example
 * ```tsx
 * <CardModal category={} />
 * ```
 *
 * @category Component
 */
export const CardsContainer = ({ category }: CardModalProps) => {
    const { modalName, isOpen, setBasicsRef, addScrollableRef } = useCardModal();

    return (
        <StyledModal
            name={modalName}
            isOpen={isOpen}
            setBasicsRef={setBasicsRef}
        >
            <CardCarousel
                addScrollableRef={addScrollableRef}
                category={category}
            />
        </StyledModal>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledModalType {
    isOpen: boolean;
}

const StyledModal = styled(Modal)<StyledModalType>`
    width: 100vw;
    .card-carousel-modal-mask {
        --bdf: ${(props) => (props.isOpen ? 'blur(2px)' : 'blur(0)')};
        --bgc: ${(props) => (props.isOpen ? 'rgba(69 78 112 / .5)' : 'rgba(69 78 112 / 0)')};
        backdrop-filter: var(--bdf);
        -webkit-backdrop-filter: var(--bdf);
        background-color: var(--bgc);

        transition:
            background-color 750ms,
            -webkit-backdrop-filter 750ms,
            backdrop-filter 750ms;
    }
`;
// ========================================================= STYLE === //
