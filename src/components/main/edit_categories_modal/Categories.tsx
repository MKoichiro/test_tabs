import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AllTodosAdminContext } from '../../../Providers';
import { SortableCategory } from './SortableCategory';

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
import { Category } from './Category';


export const Categories = () => {

  const { activeIndex, allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);

  const [ activeId, setActiveId ] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  };

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
  };


  return (
    <StyledUl>

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

const StyledUl = styled.ul`
  --fs-category-name: 2rem; // font-sizeはGhostとPointerFollowingで一致させる
`;