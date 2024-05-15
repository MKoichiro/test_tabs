import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DragIndicator, ChevronLeftOutlined } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

interface DragProps {
    handleMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
    listeners?: SyntheticListenerMap;
}
interface SlideProps {
    slide: () => void;
    addSlidableBtn: (el: HTMLButtonElement) => void;
}
interface BulletProps {
}

type Funcs = {
    drag?: DragProps;
    slide?: SlideProps;
    bullet?: BulletProps;
}

type Attrs = keyof Funcs;
type AttrArray = Attrs[];

type ControlPanelProps = {
    attrs: AttrArray;
    isGloballyDragging: boolean;
    isOpen: boolean;
} & Funcs;


export const ControlPanel = ({
    attrs,
    isGloballyDragging,
    isOpen,
    ...restProps
}: ControlPanelProps) => {

    const { handleMouseDown, listeners } = restProps.drag || {};
    const { slide, addSlidableBtn } = restProps.slide || {};

    return (
        <StyledDiv
            $isOpen={isOpen}
            $isGlobalDragging={isGloballyDragging}
        >
            <div className="hover-listener" />
            <div className="todo-control-panel">
                {attrs.includes('drag') && (
                    <button className="btn-gripper">
                        <DragIndicator
                            {...listeners}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleMouseDown}
                        />
                    </button>
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
    $isOpen: boolean;
    $isGlobalDragging: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
    display: ${({ $isGlobalDragging }) => ($isGlobalDragging ? 'none' : 'block')};
    .hover-listener {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 3.6rem;
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
        .btn-slide,
        .btn-gripper {
            flex: 1;
            width: 3.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color-white-1);
            svg {
                font-size: 2.4rem;
            }
        }
        .btn-gripper {
            cursor: default;

            svg {
                cursor: grab;
            }
        }
    }
`;