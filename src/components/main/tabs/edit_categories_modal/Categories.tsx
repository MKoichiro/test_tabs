/*
  [Categories Component]
    element: ul
    description:
      edit categories modal 内で、現在の category 一覧をリスト表示している
      各リストアイテムの category は dnd-kit で並び替え可能にしている
*/


/* common: essential */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
/* common: others */
// import { AllTodosContext } from '../../../../providers/AllTodosProvider';
import { CategoriesContext } from '../../../../providers/CategoriesProvider';
/* children components */
import { ActiveCategory } from './category/ActiveCategory';
import { ArchivedCategory } from './category/ArchivedCategory';
import { GhostCategory } from './category/GhostCategory';
/* dnd-kit */
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


// === component 定義部分 ============================================= //
export const Categories = () => {
  const { categories, dispatchCategoriesChange } = useContext(CategoriesContext);

  const [isDragging, setIsDragging] = useState(false);

  // dnd-kit/sortable 関連
  // sensor 登録
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  //
  const [ activeId, setActiveId ] = useState<UniqueIdentifier | null>(null);
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
    setIsDragging(true);
  };

  //
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(categories => categories.id === active.id);
      const newIndex = categories.findIndex(categories => categories.id === over?.id);
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      dispatchCategoriesChange({ type: 'update_categories', newCategories });
      dispatchCategoriesChange({ type: 'switch_tab', newActiveIdx: newIndex });
    }
    setActiveId(null);
    setIsDragging(false);
  };
  // dnd-kit/sortable 関連

  // allTodosをarchivedの真偽で二つの配列に分割
  const clone = [...categories];
  const activeCategories  = clone.filter(category => category.isArchived === false);
  const archivedCategories = clone.filter(category => category.isArchived === true);


  return (
    <StyledDiv>
      <ul >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >

          {/* ul内に収まってドロップ位置を示唆する要素 */}
          <SortableContext
            items={categories}
            strategy={verticalListSortingStrategy}
          >
            {activeCategories.map(category => <ActiveCategory key={category.id} activeCategory={category} />)}
          </SortableContext>

          {/* カーソルやタッチ位置に追従するゴースト要素 */}
          <DragOverlay>
            {activeId ? <GhostCategory category={categories.filter(category => category.id === activeId)[0]} /> : null}
          </DragOverlay>

        </DndContext>
      </ul>


      <span className='separater'>
          <FontAwesomeIcon icon={faArchive} />
      </span>
      <ul className='archived-categories-container'>
        {archivedCategories.map(category => <ArchivedCategory key={category.id} archivedCategory={category} />)}
      </ul>
    </StyledDiv>

  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
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
// ================================================= style 定義部分 === //