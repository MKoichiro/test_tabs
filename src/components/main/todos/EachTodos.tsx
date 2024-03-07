import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { TodosType } from "../../../types/Todos";
import { SortableTodo } from "./SortableTodo";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AllTodosAdminContext } from "../../../Providers";
import { Todo } from "./Todo";
import { createPortal } from "react-dom";


interface PropsType {
  todosData: TodosType;
  index: number;
}

export const EachTodos: FC<PropsType> = (props) => {
  const { todosData, index } = props;
  const todos = todosData.todos;

  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);

  const [ activeId, setActiveId ] = useState<UniqueIdentifier | null>(null);




  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  };

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

        {/* bodyを基準に要素が配置されるようになる。transformがbody基準になるのでずれない。 */}
        {createPortal(
          <DragOverlay>
            { activeId ? <Todo todo={ todos.filter(todo => todo.id === activeId )[0] } todosId={ todosData.id } /> : null }
          </DragOverlay>, document.body,
        )}


      </DndContext>
    </StyledUl>
  );

};


const StyledUl = styled.ul`
  background: green;


`;