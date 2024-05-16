import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DragIndicator, ChevronLeftOutlined } from '@mui/icons-material';
import React, { MouseEvent, TouchEvent } from 'react';
import styled from 'styled-components';
import { DragBtn } from '../btns_icons/drag_btn/DragBtn';

interface DragProps {
    handleMouseDown: (e: MouseEvent | TouchEvent) => void;
    listeners?: SyntheticListenerMap;
}
interface SlideProps {
    isSlided: boolean;
    slide: () => void;
    addSlidableBtn: (el: HTMLButtonElement) => void;
}

type Funcs = {
    drag?: DragProps;
    slide?: SlideProps;
};

type Attrs = keyof Funcs;
type AttrArray = Attrs[];

type ControlPanelProps = {
    attrs: AttrArray;
    isGloballyDragging?: boolean;
    isOpen?: boolean;
} & Funcs;

export const ControlPanel = ({
    attrs,
    isGloballyDragging,
    isOpen,
    ...restProps
}: ControlPanelProps) => {
    const { handleMouseDown, listeners } = restProps.drag || {};
    const { isSlided, slide, addSlidableBtn } = restProps.slide || {};

    return (
        <StyledDiv
            $isOpen={isOpen}
            $isGlobalDragging={isGloballyDragging}
            $isSlided={isSlided}
        >
            <div className="hover-listener" />
            <div className="todo-control-panel">
                {attrs.includes('drag') && (
                    <DragBtn
                        className="btn-gripper"
                        listeners={listeners}
                        handleMouseDown={handleMouseDown}
                    />
                )}
                {attrs.includes('slide') && (
                    <button
                        className="btn-slide"
                        ref={addSlidableBtn}
                        onClick={slide}
                    >
                        <ChevronLeftOutlined />
                    </button>
                )}
            </div>
        </StyledDiv>
    );
};

interface StyledDivProps {
    $isOpen?: boolean;
    $isGlobalDragging?: boolean;
    $isSlided?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
    display: ${({ $isGlobalDragging, $isSlided }) =>
        $isGlobalDragging || $isSlided ? 'none' : 'block'};
    height: 100%;
    .hover-listener {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: var(--icon-size-1);
        height: 100%;
        pointer-events: ${({ $isGlobalDragging }) => ($isGlobalDragging ? 'none' : 'auto')};
    }

    .hover-listener:hover + .todo-control-panel,
    .todo-control-panel:hover {
        width: 6.4rem;
    }

    .todo-control-panel {
        height: 100%;
        position: relative;
        z-index: 10;
        width: 0;
        transition: width 150ms;
        overflow: hidden;

        display: flex;
        flex-direction: ${({ $isOpen }) => ($isOpen ? 'column' : 'row')};
        justify-content: center;
        align-items: center;
        background: var(--color-black-1);
        border-radius: .2rem 0 0 .2rem;
        
        .btn-slide {
            flex: 1;
            width: var(--icon-size-1);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color-white-1);
            svg {
                font-size: 2.4rem;
            }
        }
        
        .btn-gripper {
            touch-action: none;
            flex: 1;
            color: var(--color-white-1);
            cursor: default;
            svg {
                cursor: grab;
            }
        }
    }
`;
