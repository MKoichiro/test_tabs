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
import React, { useContext, useLayoutEffect, useRef, useState, forwardRef, useEffect, Ref } from 'react';
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

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @category Type of Props
 */
interface TodoDetailProps {
    todo: TodoType;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
// useUnsettledHeightAcc: 内容物の高さが可変のアコーディオンを実装するためのカスタムフック
//                        open/close 状態を保持する isOpen state は保守性のため(今後、外部でも使用することも考えられるため)、外部で定義して渡す。
//                        また、内容物の文字列が変更された時にも高さを再取得する必要があるため、
//                        state 管理されたテキストコンテンツを changeableTxtContentsState を引数で渡す必要がある。
export const useUnsettledHeightAcc = (isOpen: boolean, changeableTxtContentsState: string) => {
    const [height, setHeight] = useState<number | null>(null);

    const heightGetterRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (heightGetterRef.current) {
            const newHeight = heightGetterRef.current.getBoundingClientRect().height;
            setHeight(newHeight);
        }
    }, [isOpen, changeableTxtContentsState]);
    return { height, heightGetterRef };
};

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
export const useTodoDetail = ({ todo }: TodoDetailProps, ref: Ref<HTMLElement> ) => {
    const { inEditing, handleModalOpen } = useContext(MdeContext);

    const { detail, isOpen } = todo;
    const { height, heightGetterRef } = useUnsettledHeightAcc(isOpen, detail);

    const executeModalOpen = () => {
        handleModalOpen(todo.id);

        if (innerWidth > 600) {
            scrollToRef(ref);
        }
    };

    const [sanitizedDetail, setSanitizedDetail] = useState('');
    useEffect(() => {
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
export const TodoDetail = forwardRef<HTMLElement, TodoDetailProps>(({ todo }, ref) => {
    const {
        isOpen,
        inEditing,
        height,
        heightGetterRef,
        executeModalOpen,
        sanitizedDetail
    } = useTodoDetail({ todo }, ref);

    return (
        <StyledSection
            $isOpen={isOpen}
            $height={height}
            $inEditing={inEditing}
        >
            <div
                className="children-height-getter"
                ref={heightGetterRef}
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

                <InfoTable todo={todo} />
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
}

const StyledSection = styled.section<StyledSectionType>`
    height: ${(props) => (props.$isOpen ? `${props.$height}px` : '0')};
    transition: height 500ms;
    contain: paint;

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
                border-left: 0.15rem solid #777;
            }
        }
    }
`;
// ========================================================= STYLE === //
