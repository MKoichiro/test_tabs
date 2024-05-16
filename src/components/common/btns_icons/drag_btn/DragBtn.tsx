import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DragIndicator } from '@mui/icons-material';
import React, { MouseEvent, TouchEvent } from 'react';
import styled from 'styled-components';

interface DragBtnProps {
    className?: string;
    listeners?: SyntheticListenerMap;
    handleMouseDown?: (e: MouseEvent | TouchEvent) => void;
}

export const DragBtn = ({ className, listeners, handleMouseDown }: DragBtnProps) => {
    return (
        <StyledBtn className={className}>
            <DragIndicator
                {...listeners}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            />
        </StyledBtn>
    );
};

const StyledBtn = styled.button`
    touch-action: none;
    min-width: var(--icon-size-1);
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: default;
    svg {
        cursor: grab;
        font-size: 2rem;
        @media (width < 600px) {
            font-size: 2rem;
        }
    }
`;