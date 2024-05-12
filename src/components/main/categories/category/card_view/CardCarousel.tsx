/**
 * @summary Card Viewのカルーセルコンテナ
 * @issues
 * - TODO: isArchived === true のものを分けて表示する
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { CardTodo } from './CardTodo';

/* --- redux --------------------- */
import { useWindowSizeSelector } from '../../../../../providers/redux/store';

/* --- providers/contexts -------- */
import { useCardCarouselRegister } from '../../../../../providers/context_api/CardView';
import { ScrollableElm } from '../../../../../providers/types/modal';

/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property category - カテゴリー の情報
 * @property addScrollableRef - modal にスクロール可能な要素を追加する関数、CardTodoで実際にバインドするので受け渡す。
 * @category Type of Props
 */
interface CardsCarouselProps {
    category: CategoryType;
    addScrollableRef: (scrollable: ScrollableElm) => void; // 今後CardTodoで実際にバインドすれば、未使用の警告は消えるはず
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param arg - hogehoge
 *
 * @category Custom Hook
 * @example
 * ```tsx
 * const { return1, return2 } = useHoge({arg1, arg2});
 * ```
 */
export const useCardCarousel = (category: CategoryType) => {
    // contexts
    const { registerContainer } = useCardCarouselRegister();

    // register carousel container
    const { adjustedPadding_vw, carouselContainerRef } = registerContainer();

    // styles
    const { cardCarouselStyleFactors } = useWindowSizeSelector();
    const { gap_vw } = cardCarouselStyleFactors;

    // format todos
    /** TODO: isArchived === true のものを分けて表示する */
    const todosFormatted = category.todos; // archiveしたものを削除または最後尾にした配列を渡すべき

    return {
        /** padding 値はカルーセルの挙動(transform 距離)に影響するため、あらかじめロジカルに計算したものを style props として styled-components に与える */
        adjustedPadding_vw,
        /** gap 値はカルーセルの挙動(transform 距離)に影響するため、あらかじめロジカルに計算したものを style props として styled-components に与える */
        gap_vw,
        /** カルーセルのコンテナ要素の ref */
        carouselContainerRef,
        /** フォーマット済みの todos */
        todosFormatted,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<ul/>`
 * @example
 * ```tsx
 * <CardCarousel category={} addScrollableRef={} />
 * ```
 *
 * @category Component
 */
export const CardCarousel = ({ category, addScrollableRef }: CardsCarouselProps) => {
    const { adjustedPadding_vw, gap_vw, carouselContainerRef, todosFormatted } =
        useCardCarousel(category);

    return (
        <StyledUl
            ref={carouselContainerRef}
            $padding={adjustedPadding_vw}
            $gap={gap_vw}
        >
            {todosFormatted.map((todo, i) => (
                <CardTodo
                    key={todo.id}
                    todo={todo}
                    idx={i}
                    addScrollableRef={addScrollableRef}
                />
            ))}
        </StyledUl>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledUlType {
    $padding: string;
    $gap: number;
}

const StyledUl = styled.ul<StyledUlType>`
    background-color: transparent;
    pointer-events: none;
    width: 100%;
    overflow-x: hidden;
    padding: ${(props) => props.$padding};
    gap: ${(props) => `${props.$gap}vw`};
    display: flex;
    align-items: center;
    height: 100%;
`;
// ========================================================= STYLE === //
