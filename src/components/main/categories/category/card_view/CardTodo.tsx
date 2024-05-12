/**
 * @summary Card View で 各 Todo を表示するコンポーネント
 * @issues
 * - TODO: スタイリングを調整する
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';

/* --- redux --------------------- */
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { setActiveIdx } from '../../../../../providers/redux/slices/cardSlice';

/* --- providers/contexts -------- */
import { ScrollableElm } from '../../../../../providers/types/modal';
import { useCardScroll } from '../../../../../providers/context_api/CardView';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @property idx - インデックス
 * @category Type of Props
 */
interface CardTodoProps {
    todo: TodoType;
    idx: number;
    addScrollableRef: (scrollable: ScrollableElm) => void;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 * @example
 * ```tsx
 * const {
 *      todoTitle,
 *      todoDetail,
 *      isActive,
 *      handleClick,
 *      activeWidth_vw,
 *      inactiveMagnification
 * } = useCardTodo({ todo, idx });
 * ```
 */
export const useCardTodo = ({ todo, idx }: Omit<CardTodoProps, 'addScrollableRef'>) => {
    // contexts
    const { isActive, handleScroll } = useCardScroll(idx);
    const dispatch = useDispatch();

    // styles
    const { cardCarouselStyleFactors } = useWindowSizeSelector();
    const { activeWidth_vw, inactiveMagnification } = cardCarouselStyleFactors;

    // handlers
    const handleClick = () => {
        handleScroll(idx, 'smooth', cardCarouselStyleFactors);
        dispatch(setActiveIdx(idx));
    };

    return {
        todoTitle: todo.title,
        todoDetail: todo.detail,
        isActive,
        handleClick,
        activeWidth_vw,
        inactiveMagnification,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <CardTodo todo={} idx={} addScrollableRef={} />
 * ```
 *
 * @category Component
 */
export const CardTodo = ({ todo, idx, addScrollableRef }: CardTodoProps) => {
    const { todoTitle, todoDetail, isActive, handleClick, activeWidth_vw, inactiveMagnification } =
        useCardTodo({ todo, idx });

    return (
        <StyledLi
            onClick={handleClick}
            $isActive={isActive}
            $activeWidth={activeWidth_vw}
            $shrinkRatio={inactiveMagnification}
        >
            <section className="contents-wrapper">
                <header>
                    <h3>{todoTitle}</h3>
                </header>

                <div className="color-container">color-container</div>

                <div className="info-container">information</div>

                <div className="detail-container">
                    <p>{todoDetail}</p>
                </div>

                <div className="category-container">
                    Category-0 // todoからcategoryを参照できるようにする
                </div>
            </section>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledLiType {
    $isActive: boolean;
    $activeWidth: number;
    $shrinkRatio: number;
}

const StyledLi = styled.li<StyledLiType>`
    --active-width: ${(props) => `${props.$activeWidth}vw`};
    --active-height: ${(props) => `${props.$activeWidth}vh`};
    --shrink-ratio: ${(props) => props.$shrinkRatio};
    pointer-events: auto;
    background-color: inherit;
    min-width: ${(props) =>
        props.$isActive
            ? 'var(--active-width)'
            : 'calc(var(--active-width) * var(--shrink-ratio))'};
    height: ${(props) =>
        props.$isActive
            ? 'var(--active-height)'
            : 'calc(var(--active-height) * var(--shrink-ratio))'};
    overflow-y: hidden;
    transition:
        min-width 300ms,
        height 300ms;

    .contents-wrapper {
        height: 100%;
        display: grid;
        grid-template:
            'heading    heading' auto
            'color       detail' 1fr
            'info        detail' 2fr
            'category  category' auto
            / 1fr 1fr;
        gap: 1.2rem;
        header {
            grid-area: heading;
            background: #eee;
        }
        .color-container {
            margin: 10%;
            grid-area: color;
            background: #eee;
        }
        .info-container {
            grid-area: info;
            background: #eee;
        }
        .detail-container {
            > * {
                transform: ${(props) => (props.$isActive ? 'scale(1)' : 'scale(.5)')};
                transform-origin: top left;
                transition: transform 300ms;
            }
            grid-area: detail;
            background: #eee;
        }
        .category-container {
            grid-area: category;
            background: #eee;
        }
    }
`;
// ========================================================= STYLE === //
