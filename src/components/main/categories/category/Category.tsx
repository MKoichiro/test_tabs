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
import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
/* --- child components ---------- */
import { Todo } from "./todo/GhostTodo";
/* --- providers/contexts -------- */
// import { CategoriesContext } from "../../../../providers/CategoriesProvider";
/* --- types --------------------- */
import { CategoryType } from "../../../../types/Categories";
/* --- utils --------------------- */
import { vw2px, getCurrentContentsVw } from "../../../../utils/converters";
/* --- dnd-kit ------------------- */
import { createPortal } from "react-dom";
import { ActiveTodo } from "./todo/ActiveTodo";
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
/* --- dev ----------------------- */
import { isDebugMode } from "../../../../utils/adminDebugMode";
import { useDispatch } from "react-redux";
import { replaceTodos } from "../../../../providers/slices/categoriesSlice";


const contentWidth = vw2px(getCurrentContentsVw());
const deleteBtnWidth = contentWidth * .5;


// === TYPE =========================================================== //
// - PROPS
interface PropsType {
  category: CategoryType;
  idx: number;
}
// - STYLE
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
export const Category: FC<PropsType> = (props) => {
  const { category, idx } = props;
  const todos = category.todos;
  // const { categories, dispatchCategoriesChange } = useContext(CategoriesContext);
  // const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();

  // --- dnd-kit ------------------------------------------------ //
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
      const oldIdx = todos.findIndex(todo => todo.id === active.id);
      const newIdx = todos.findIndex(todo => todo.id === over?.id);
      // const newTodos = arrayMove(todos, oldIndex, newIndex);
      // const newCategories = [...categories];
      // newCategories[index].todos = newTodos;
      // dispatchCategoriesChange({ type: 'update_categories', newCategories });
      dispatch(replaceTodos({ oldIdx, newIdx }));
    }
    setActiveId(null);
  };
  // ------------------------------------------------ dnd-kit --- //


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
          { todos.map((todo, i) => !todo.isArchived &&
            <ActiveTodo
              key={ todo.id }
              liIdx={ i }
              todo={ todo } />
          ) }
        </SortableContext>

        {/* dnd-kit/sortable: createPortalでラップして、
            第二引数に body を指定すればこれを基準に要素が配置されるようになる。
            transform が body 基準になるのでカーソルからずれなくなる。 */}
        {createPortal(
          <DragOverlay>
            { activeId ? <Todo todo={ todos.filter(todo => todo.id === activeId )[0] } categoryId={ category.id } /> : null }
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </StyledUl>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //
const StyledUl = styled.ul`
`;
// ========================================================= STYLE === //