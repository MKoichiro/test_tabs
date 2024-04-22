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
import React, { FC, useState } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { ActiveCategory } from './category/ActiveCategory';
import { ArchivedCategory } from './category/ArchivedCategory';
import { GhostCategory } from './category/GhostCategory';
/* --- redux --------------------- */
import { useDispatch, useCategoriesSelector } from '../../../../providers/redux/store';
import { switchCategory, updateCategories } from '../../../../providers/redux/slices/categoriesSlice';
/* --- dnd-kit ------------------- */
import {
  DndContext,
  closestCenter,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface CategoriesType {}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Categories: FC<CategoriesType> = (props) => {
  const {} = props;

  const { categoriesEntity: categories } = useCategoriesSelector();
  const dispatch = useDispatch();

  
  // --- dnd-kit ------------------------------------------------ //
  // sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // states
  const [isDragging, setIsDragging] = useState(false);
  const [activeId,     setActiveId] = useState<UniqueIdentifier | null>(null);

  // handlers
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
    setIsDragging(true);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(categories => categories.id === active.id);
      const newIndex = categories.findIndex(categories => categories.id === over?.id);
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      dispatch(updateCategories(newCategories));
      dispatch(switchCategory(newIndex));
    }
    setActiveId(null);
    setIsDragging(false);
  };
  // ------------------------------------------------ dnd-kit --- //

  // categories を isArchivedの真偽で二つの配列に分割
  const clone = [...categories];
  const activeCategories   = clone.filter(category => category.isArchived === false);
  const archivedCategories = clone.filter(category => category.isArchived === true);


  return (
    <StyledDiv>
      <ul >
        <DndContext
          sensors             = { sensors         }
          collisionDetection  = { closestCenter   }
          onDragStart         = { handleDragStart }
          onDragEnd           = { handleDragEnd   }
        >

          {/* ActiveCategory: 常時表示、ul内に収まってドロップ位置を示唆する要素 */}
          <SortableContext
            items    = { categories                  }
            strategy = { verticalListSortingStrategy }
          >
            { activeCategories.map(category => <ActiveCategory key={category.id} activeCategory={category} />) }
          </SortableContext>

          {/* GhosetCategory: drag中のみ表示、カーソルやタッチ位置に追従するゴースト要素 */}
          <DragOverlay>
            { activeId ? <GhostCategory category={categories.filter(category => category.id === activeId)[0]} /> : null }
          </DragOverlay>

        </DndContext>
      </ul>


      <span className='separater'>
          <FontAwesomeIcon icon={faArchive} />
      </span>
      <ul className='archived-categories-container'>
        {/* ArchivedCategory:  */}
        { archivedCategories.map(category => <ArchivedCategory key={category.id} archivedCategory={category} />) }
      </ul>
    </StyledDiv>

  );
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledDiv = styled.div`
  --fs-category-name: 2rem;
  font-size: var(--fs-category-name);

  .separater {
    opacity: .5;
    display: flex;
    align-items: center;
    &::before, &::after {
      content: '';
      display: block;
      flex: 1;
      background: #000;
      height: .15rem;
      margin: 1.6rem;
    }
  }
`;
// ========================================================= STYLE === //