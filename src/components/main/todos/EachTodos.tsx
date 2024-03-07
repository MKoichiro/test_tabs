/*
  EachTodos Component:
    element: ul
    description:
      category 毎の todos を表示している
*/


/* common: essential */
import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
/* common: others */
import { TodosType } from "../../../types/Todos";
import { AllTodosAdminContext } from "../../../Providers";
/* children components */
import { Todo } from "./Todo";
/* dnd-kit */
import { createPortal } from "react-dom";
import { SortableTodo } from "./SortableTodo";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy } from "@dnd-kit/sortable";


// === component 定義部分 ============================================= //
interface PropsType {
  todosData: TodosType;
  index: number;
}

export const EachTodos: FC<PropsType> = (props) => {
  const { todosData, index } = props;
  const todos = todosData.todos;
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);

  // --- dnd-kit/sortable 関連 -------------------------------------- //
  // sensor 登録
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // DragOverlay で使用
  const [ activeId, setActiveId ] = useState<UniqueIdentifier | null>(null);
  // DragOverlay で使用する dragStart event の handler
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  };

  // dnd-kit/sortable で必須の dragEnd event の handler
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over?.id);
      const newTodo = arrayMove(todos, oldIndex, newIndex);
      const newAllTodos = [...allTodos];
      newAllTodos[index].todos = newTodo;
      dispatchAllTodosChange({ type: 'update_all_todos', newAllTodos });
    }
    setActiveId(null);
  };
  // -------------------------------------- dnd-kit/sortable 関連 --- //


  return (
    <StyledUl>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ todos }
          strategy={verticalListSortingStrategy}
        >
          { todos.map(todo => !todo.archived && <SortableTodo key={ todo.id } todo={ todo } todosId={ todosData.id } /> ) }
        </SortableContext>

        {/* dnd-kit/sortable: createPortalでラップして、
            第二引数に body を指定すればこれを基準に要素が配置されるようになる。
            transform が body 基準になるのでカーソルからずれなくなる。 */}
        {createPortal(
          <DragOverlay>
            { activeId ? <Todo todo={ todos.filter(todo => todo.id === activeId )[0] } todosId={ todosData.id } /> : null }
          </DragOverlay>,
          document.body,
        )}

      </DndContext>
    </StyledUl>
  );
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledUl = styled.ul`
  background: green;
`;
// ================================================= style 定義部分 === //