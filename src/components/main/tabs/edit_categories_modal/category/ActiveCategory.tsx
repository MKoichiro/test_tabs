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
/* --- types --------------------- */
import { CategoryType } from '../../../../../types/Categories';
/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';
/* --- utils --------------------- */
import { convertVwToPx } from '../../../../../utils/converters';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
/* --- material icons ------------ */
import { DragIndicator } from '@mui/icons-material';
/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
/* --- hooks --------------------- */
/* slidable */
import { Slidable, SlidableMain, SlidableHidden } from '../../../../../functions/slidable/Components';
import { SlidableParamsType } from '../../../../../functions/slidable/Types';
/* immediateEditable */
import { useImmediateEditable } from '../../../../../functions/immediateEditable/Hooks';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../../utils/adminDebugMode';


const btnsContainerWidthVw = 10;
const btnsContainerWidthPx = convertVwToPx(btnsContainerWidthVw);
// slidable 関連
const slidableParams: SlidableParamsType = {
  SLIDABLE_LENGTH:                btnsContainerWidthPx,
  GRADIENT_THRESHOLD:                            1 / 2,
  TOGGLE_THRESHOLD:           btnsContainerWidthPx / 2,
  COMPLEMENT_ANIME_DURATION:                       300,
};


// === TYPE =========================================================== //
// - PROPS
interface ActiveCategoryType {
  activeCategory: CategoryType;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const ActiveCategory: FC<ActiveCategoryType> = (props) => {
  const { activeCategory } = props;

  const { inEditing, inputRef, handleDoubleClick, handleSubmit, handleChange, handleBlur } = useImmediateEditable('category', activeCategory);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: activeCategory.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <StyledLi
      ref={ setNodeRef }
      style={ style }
      $isDragging={ isDragging }
      $inEditing={inEditing}
      { ...attributes }
    >

      <Slidable slidableParams={slidableParams}>

        <SlidableMain className='slidable-main-contents'>
          <span className='gripper' { ...listeners } >
            <DragIndicator />
          </span>
          <div className='category-name-container'>
            <p children={ activeCategory.name } onDoubleClick={handleDoubleClick} />
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                ref={inputRef}
                value={activeCategory.name}
                onChange={handleChange}
                onBlur={handleBlur} />
            </form>
          </div>
        </SlidableMain>

        <SlidableHidden className='slidable-hidden-contents' slidableLength={slidableParams.SLIDABLE_LENGTH}>
          <button>
            <FontAwesomeIcon icon={faArchive} />
          </button>
        </SlidableHidden>

      </Slidable>
    </StyledLi>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
  touch-action: auto;

  .slidable-main-contents {
    ${ categoryCommonStyles }


    opacity: ${ props => props.$isDragging ? .5 : 1 };
    .gripper {
      touch-action: none;
      cursor: grab;
    }

    .category-name-container {
      border-bottom: ${ props => props.$inEditing ? '2px solid #000' : '2px solid transparent' };
      p {
        display: ${ props => props.$inEditing ? 'none' : 'block' };
      }
      form {
        display: ${ props => props.$inEditing ? 'block' : 'none' };
        input {
          width: 100%;
          outline: none;
          border: none;
          border-radius: 0;
          background: none;
        }
      }
    }
  }
  .slidable-hidden-contents {
    background: violet;
    display: flex;
    align-items: center;
    button {
      display: block;
      flex: 1;
    }
  }
`;
// ========================================================= STYLE === //
