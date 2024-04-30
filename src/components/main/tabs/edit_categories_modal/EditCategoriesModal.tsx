/**
# "AAA.tsx"

## RENDER AS:
- ``` <example/> ```

## DEPENDENCIES:
| type     | name                                            | role       |
| ---------| ----------------------------------------------- | ---------- |
| PARENT 1 | BBB.tsx                                         | 機能や役割 |
| CHILD  1 | CCC.tsx                                         | 機能や役割 |
| CHILD  2 | DDD.tsx                                         | 機能や役割 |
| PACKAGE  | importしているpackage名                         | 機能や役割 |
| PROVIDER | importしているprovider名                        | 機能や役割 |
| SETTING  | importしているsetting file名                    | 機能や役割 |
| UTILS    | ultils ディレクトリからimportしているファイル名 | 機能や役割 |
| TYPES    | 外部からimportしている型名                      | 機能や役割 |

## FEATURES:
- conponent

## DESCRIPTION:
- コンポーネントが提供する機能や役割を箇条書きで記述する。

## PROPS:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| propsの名前 | 型   | 役割などの一言程度の説明 |

## STATES:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| stateの名前 | 型   | 役割などの一言程度の説明 |

## FUTURE TASKS:
- 今後の展望や修正点を箇条書きで記述する。

## COPILOT
- copilotからの提案をここに箇条書きで記述する。
*/

/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { CreateNewCategory } from './CreateNewCategory';
import { Categories } from './Categories';
/* --- providers/contexts -------- */
import { Modal } from '../../../common/modal/Modal';
import { modalNames } from '../../../common/modal/settings';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../utils/adminDebugMode';
import { useModalsSelector } from '../../../../providers/redux/store';
import { useModalCloser, useModalRegistrant } from '../../../../providers/context_api/ModalElmsRef';

// === TYPE =========================================================== //
// - PROPS
interface EditCategoriesModalProps {
    className?: string;
}
// - STYLE
interface StyledModalType {
    isOpen: boolean;
}
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
export const EditCategoriesModal: FC<EditCategoriesModalProps> = (props) => {
    const { className } = props;

    const modalName = modalNames.editCategories;

    const isOpen = useModalsSelector().modalStates[modalName]?.isOpen;
    const { setBasicsRef, addScrollableRef } = useModalRegistrant(modalName);
    const closeModal = useModalCloser(modalName);

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
const StyledModal = styled(Modal)<StyledModalType>`
    &[open] {
        display: flex;
    }

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
            border-radius: 0.4rem;
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
