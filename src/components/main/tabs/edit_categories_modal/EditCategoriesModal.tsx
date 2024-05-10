

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { CreateNewCategory } from './CreateNewCategory';
import { Categories } from './Categories';

/* --- providers/contexts -------- */
import { Modal } from '../../../common/modal/Modal';
import { modalNames } from '../../../common/modal/settings';
import { useModalCloser, useModalRegistrant } from '../../../../providers/context_api/ModalElmsRef';

/* --- redux --------------------- */
import { useModalsSelector } from '../../../../providers/redux/store';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
/**
 * @property className - modal (dialog 要素)に付与するクラス名
 * @category Type of Props
 */
interface EditCategoriesModalProps {
    className?: string;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useEditCategoriesModal = () => {
    
    const modalName = modalNames.editCategories;
    const isOpen = useModalsSelector().modalStates[modalName]?.isOpen;
    const { setBasicsRef, addScrollableRef } = useModalRegistrant(modalName);
    const closeModal = useModalCloser(modalName);

    return {
        modalName,
        isOpen,
        setBasicsRef,
        addScrollableRef,
        closeModal,
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
 * <EditCategoriesModal />
 * ```
 *
 * @category Component
 */
export const EditCategoriesModal = ({className}: EditCategoriesModalProps) => {
    const {
        modalName,
        isOpen,
        setBasicsRef,
        addScrollableRef,
        closeModal,
    } = useEditCategoriesModal();

    return (
        <StyledModal
            name={modalName}
            setBasicsRef={setBasicsRef}
            isOpen={isOpen}
            className={className}
            classNameMask={'edit-categories-modal-mask'}
        >
            <div className="modal-contents-container">
                <h2
                    className={'modal-heading'}
                    children={'Edit Categories'}
                />

                <button
                    className={'btn-modal-close'}
                    onClick={closeModal}
                    children={<FontAwesomeIcon icon={faXmark} />}
                />

                <section
                    className={'categories-display-container'}
                    ref={addScrollableRef}
                >
                    <Categories />
                </section>

                <section className="form-create-new-categories-container">
                    <CreateNewCategory />
                </section>
            </div>
        </StyledModal>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledModalType {
    isOpen: boolean;
}

const StyledModal = styled(Modal)<StyledModalType>`
    &[open] {
        display: flex;
    }
    color: var(--color-black-1);


    .edit-categories-modal-mask {
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

    .modal-contents-container {
        width: var(--contents-width);
        margin: auto 0;
        display: grid;
        gap: 1.6rem;
        grid-template:
            'heading   btn' auto
            'list     list' 50vh
            'form     form' auto
            / 1fr 3rem;

        > * {
            background: rgba(255 255 255 / 0.85);
            padding: 0.8rem;
            border-radius: .2rem;
        }
        .modal-heading {
            grid-area: heading;
        }
        .btn-modal-close {
            grid-area: btn;
            display: block;
            outline: none;
        }
        .categories-display-container {
            grid-area: list;
            overflow-y: auto;
            overscroll-behavior: none;
            -ms-scrollbar: none;
            scrollbar-width: none;
            ::-webkit-scrollbar {
                display: none;
            }
        }
        .form-create-new-categories-container {
            grid-area: form;
        }
    }
`;
// ========================================================= STYLE === //
