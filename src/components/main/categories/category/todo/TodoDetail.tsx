/**
 * @summary ボタンで開閉するアコーディオン内のtodoの詳細部分を表示するコンポーネント。
 *
 * @issues
 * - useUnsettledHeightAcc の再利用性を確認。
 * @copilot
 * -未確認
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useContext, useLayoutEffect, useState, forwardRef, Ref, RefObject } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { InfoTable } from './InfoTable';

/* --- providers/contexts -------- */
import { MdeContext } from '../../../../../providers/context_api/Mde';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';

/* --- utils --------------------- */
import { scrollToRef } from '../../../../../utils/smoothScrollToRef';
import { getSanitizedDetail } from '../../../../../utils/todoPropsHandler';
import { useHeightGetter } from '../../../../../functions/height_getter/heightGetter';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @category Type of Props
 */
interface TodoDetailProps {
    todo: TodoType;
    isGloballyDragging: boolean;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @param arg
 * 
 * @category Custom Hook
 * @example
 * ```tsx
 * const {
 *     isOpen,
 *     inEditing,
 *     height,
 *     heightGetterRef,
 *     executeModalOpen,
 *     sanitizedDetail
 * } = useTodoDetail({ todo }, ref);
 * ```
 */
export const useTodoDetail = ({ todo }: Omit<TodoDetailProps, 'isGloballyDragging'>, ref: Ref<HTMLElement> ) => {
    const { inEditing, handleModalOpen } = useContext(MdeContext);

    const { isOpen } = todo;
    const { height, heightGetterRef } = useHeightGetter();

    const executeModalOpen = () => {
        handleModalOpen(todo.id);

        if (innerWidth > 600) {
            scrollToRef(ref);
        }
    };

    const [sanitizedDetail, setSanitizedDetail] = useState('');
    useLayoutEffect(() => {
        const fetchSanitizedDetail = async () => {
            const detail = await getSanitizedDetail(todo);
            setSanitizedDetail(detail);
        };
        fetchSanitizedDetail();
    }, [todo]);

    return {
        /** アコーディオンの開閉状態 */
        isOpen,
        /** detail が編集中かどうか */
        inEditing,
        /** アコーディオンの高さ */
        height,
        /** アコーディオンの高さを取得するための ref */
        heightGetterRef,
        /** mde modal を開く */
        executeModalOpen,
        /** sanitized された detail */
        sanitizedDetail,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<section/>`
 * @example
 * ```tsx
 * <TodoDetail todo={} />
 * ```
 *
 * @category Component
 */
export const TodoDetail = forwardRef<HTMLElement, TodoDetailProps>(({ todo, isGloballyDragging }, ref) => {
    const {
        isOpen,
        inEditing,
        height,
        heightGetterRef,
        executeModalOpen,
        sanitizedDetail,
    } = useTodoDetail({ todo }, ref);

    return (
        <StyledSection
            $isOpen={isOpen}
            $height={height}
            $inEditing={inEditing}
            $isGloballyDragging={isGloballyDragging}
        >
            <div
                className="children-height-getter"
                ref={heightGetterRef as RefObject<HTMLDivElement>}
            >
                <section
                    className="detail-container"
                    onDoubleClick={executeModalOpen}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: sanitizedDetail,
                        }}
                    />
                </section>

                <div className='table-container'>
                    <InfoTable todo={todo} />
                </div>
            </div>
        </StyledSection>
    );
});
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
interface StyledSectionType {
    $isOpen: boolean;
    $height: number | null;
    $inEditing: boolean;
    $isGloballyDragging: boolean;
}

const StyledSection = styled.section<StyledSectionType>`
    height: ${({$isOpen, $isGloballyDragging, $height}) => {
        if ($isGloballyDragging) {
            return '0';
        } else if ($isOpen) {
            return `${$height}px`;
        } else {
            return '0';
        }
    }};
    transition: height 500ms;
    contain: paint;

    .table-container {
        height: 8.0rem;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 75%;
        margin-left: auto;
        @media (width < 600px) {
            height: 4.8rem;
            max-width: 100%;
        }
    }

    .detail-container {
        h1 {
            font-size: 2.2rem;
            @media (width < 600px) {
                font-size: 18px;
            }
        }
        h2 {
            font-size: 2rem;
            @media (width < 600px) {
                font-size: 16px;
            }
        }
        h3 {
            font-size: 1.8rem;
            @media (width < 600px) {
                font-size: 14px;
            }
        }
        h4 {
            font-size: 1.6rem;
            @media (width < 600px) {
                font-size: 12px;
            }
        }
        h5 {
            font-size: 1.4rem;
            @media (width < 600px) {
                font-size: 10px;
            }
        }
        h6 {
            font-size: 1.2rem;
            @media (width < 600px) {
                font-size: 8px;
            }
        }

        ol {
            list-style-type: decimal;
            padding-left: 16px;
            margin-left: 16px;
        }
        ul {
            list-style-type: circle;
            padding-left: 16px;
            margin-left: 16px;
        }
        li {
        }
    }

    .children-height-getter {
        /* ! do not change vertical margin */
        margin-top: 0;
        margin-bottom: 0;

        .detail-container {
            padding: 0.8rem 1.6rem;
            > div {
                padding-left: 1.6rem;
                border-left: var(--border-weight) solid var(--color-black-1);
            }
        }
    }
`;
// ========================================================= STYLE === //
