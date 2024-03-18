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
import { AllTodosContext } from "../../../providers/AllTodosProvider";
/* utils */
import { convertVwToPx, getCurrentContentsVw } from "../../../utils/converters";
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


const contentWidth = convertVwToPx(getCurrentContentsVw());
const deleteBtnWidth = contentWidth * .5;


// === component 定義部分 ============================================= //
export interface TouchStartArgType {
  e: React.TouchEvent<HTMLLIElement>;
  setStartX: (x: number | undefined) => void;
  setStartY: (y: number | undefined) => void;
}
export interface TouchMoveArgType {
  displacementX: number;
  setTranslateX: (x: number) => void;
  isSlided: boolean
}
export interface TouchEndArgType {
  e: React.TouchEvent<HTMLLIElement>;
  startX: number | undefined;
  setStartX: (x: number | undefined) => void;
  setStartY: (y: number | undefined) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setTranslateX: (x: number) => void;
  setIsSlided: (isSlided: boolean) => void;
}

interface PropsType {
  todosData: TodosType;
  index: number;
}

export const EachTodos: FC<PropsType> = (props) => {
  const { todosData, index } = props;
  const todos = todosData.todos;
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosContext);

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


  // --- swipe して delete btn 関連 --------------------------------- //
  // 子の SortableLi の中で定義しても良いが、li の数が無限に増えうるので親で定義しておく。

  // --- TouchStart ---------
  const handleTouchStart = (args: TouchStartArgType) => {
    const { e, setStartX, setStartY } = args;
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  // --- TouchMove ---------
  const handleTouchMove = (args: TouchMoveArgType) => {
    const {  displacementX, setTranslateX, isSlided } = args;
    // allowed = true の場合の2回目以降
    switch (true) {
      case (!isSlided): // sliding to "Left" to "Open"
        setTranslateX(displacementX);
        break;
      case (isSlided):  // sliding to "Right" to "Close"
        setTranslateX(displacementX - deleteBtnWidth);
        break;
    }
  };

  // --- TouchEnd ---------
  const handleTouchEnd = (args: TouchEndArgType) => {
    const DURATION = 300;
    const { e, startX, setStartX, setStartY, containerRef, setTranslateX, setIsSlided } = args;
    if (!(startX && containerRef.current)) { return }

    const toggleThresholdX = - deleteBtnWidth / 2;
    const displacementX    = e.changedTouches[0].clientX - startX;

    containerRef.current.style.transition = `transform ${ DURATION }ms`;
    setTimeout(() => {
      if (containerRef.current) { containerRef.current.style.transition = 'none' }
    }, DURATION);

    if (displacementX < toggleThresholdX) {
      setTranslateX(-deleteBtnWidth);
      setIsSlided(true);
    } else {
      setTranslateX(0);
      setIsSlided(false);
    }

    // initialize
    setStartX(undefined);
    setStartY(undefined);
  };
  // --------------------------------- swipe して delete btn 関連 --- //


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
          { todos.map(todo => !todo.archived && <SortableTodo key={ todo.id } todo={ todo } todosId={ todosData.id } handleTouchStart={handleTouchStart} handleTouchMove={handleTouchMove} handleTouchEnd={handleTouchEnd}/> ) }
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