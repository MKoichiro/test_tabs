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
import { AllTodosContext } from '../../../../providers/AllTodosProvider';
/* children components */
import { SortableCategory } from './SortableCategory';
import { Category } from './Category';
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


// === component 定義部分 ============================================= //
export const Categories = () => {
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);

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
      const oldIndex = allTodos.findIndex(todos => todos.id === active.id);
      const newIndex = allTodos.findIndex(todos => todos.id === over?.id);
      const newAllTodos = arrayMove(allTodos, oldIndex, newIndex);
      dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
      dispatchAllTodosChange({ type: 'switch_tab', newActiveIndex: newIndex });
    }
    setActiveId(null);
    setIsDragging(false);
  };
  // dnd-kit/sortable 関連


  return (
    <StyledUl $isDragging={isDragging}>

      <DndContext
        sensors={ sensors }
        collisionDetection={ closestCenter }
        onDragStart={ handleDragStart }
        onDragEnd={ handleDragEnd }
      >

        <SortableContext
          items={ allTodos }
          strategy={ verticalListSortingStrategy }
        >

          {/* ul内に収まってドロップ位置を示唆するゴースト要素 */}
          { allTodos.map(todos => <SortableCategory key={ todos.id } todos={ todos } />) }

        </SortableContext>

        <DragOverlay>

          {/* カーソルやタッチ位置に追従する要素 */}
          { activeId ? <Category todos={ allTodos.filter(todos => todos.id === activeId)[0] } /> : null }

        </DragOverlay>

      </DndContext>

    </StyledUl>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledUl = styled.ul<{$isDragging: boolean;}>`
  --fs-category-name: 2rem; // font-sizeはGhostとPointerFollowingで一致させる
  font-size: var(--fs-category-name);
  /* touch-action: none; */
`;
// ================================================= style 定義部分 === //