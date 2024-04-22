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
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { CardsCarousel } from './CardCarousel';
/* --- providers/contexts -------- */
// import { Modal, useModalDeclarer, useModalState } from '../../../../../providers/ModalProvider';
import { Modal } from '../../../../../providers/ModalProvider_ver2';
import { modalNames } from '../../../../../providers/modalNames';
/* --- types --------------------- */
import { CategoryType } from '../../../../../types/Categories';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';
import { useDispatch, useModalsSelector } from '../../../../../providers/store';
import { register } from '../../../../../providers/slices/modalSlice';
import { useModalRegistrant } from '../../../../../providers/ModalProvider_ver2';


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  category: CategoryType;
}
// - STYLE
interface StyledModalType {
  isOpen: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const CardsContainer: FC<PropsType> = (props) => {

  // modalProvider
  const modalName = modalNames.cardCarousel;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(register(modalName));
  }, []);
  const isOpen = useModalsSelector().modalStates[modalName]?.isOpen;
  const { setBasicsRef, addScrollableRef } = useModalRegistrant(modalName);
  // const { isOpen } = useModalState(modalName);
  // const { closeModal, basicRefs, addScrollableElm } = useModalDeclarer(modalName);

  return (
    <StyledModal
      name       = { modalName  }
      isOpen     = { isOpen     }
      setBasicsRef  = { setBasicsRef  }
    >
      <CardsCarousel
        addScrollableRef = { addScrollableRef }
        { ...props } />
    </StyledModal>
  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledModal = styled(Modal)<StyledModalType>`

  width: 100vw;
  .card-carousel-modal-mask {
    --bdf: ${ props => props.isOpen ? 'blur(4px)' : 'blur(0)' };
    --bgc: ${ props => props.isOpen ? 'rgba(255 0 255 / .5)' : 'rgba(255 0 255 / 0)' };
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