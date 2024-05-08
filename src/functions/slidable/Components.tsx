/* --- react/styled-components --- */
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
/* --- hooks --------------------- */
import { useSlidable } from './Hooks';
/* --- types --------------------- */
import { SlidableProps } from './types';
import { SlidableMainProps, SlidableHiddenProps } from './types';

// === COMPONENT ====================================================== //
// 1. Slidable
export const Slidable = (props: PropsWithChildren<SlidableProps>) => {

    const { children, className, slidableParams } = props;

    const { handleTouchStart, handleTouchMove, handleTouchEnd, containerRef, translateX } =
        useSlidable(slidableParams);

    return (
        <StyledSlidable
            className="slidable-master"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <StyledSlidableContainer
                className={`slidable-container ${className ? className : ''}`}
                ref={containerRef}
                $translateX={translateX}
            >
                {children}
            </StyledSlidableContainer>
        </StyledSlidable>
    );
};

// 2. SlidableMain
export const SlidableMain = (props: PropsWithChildren<SlidableMainProps>) => {
    const { children, className } = props;

    return (
        <StyledSlidableMain
            className={className}
            children={children}
        />
    );
};

// 3. SlidableHidden
export const SlidableHidden = (props: PropsWithChildren<SlidableHiddenProps>) => {
    const { children, className, slidableLength } = props;

    return (
        <StyledSlidableHidden
            className={className}
            $slidableLength={slidableLength}
            children={children}
        />
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
// for "Slidable"
const StyledSlidable = styled.div`
    overflow-x: hidden;
`;
const StyledSlidableContainer = styled.div<{ $translateX: number }>`
    display: flex;
    transform: translateX(${(props) => props.$translateX}px);
`;

// for "SlidableMain"
const StyledSlidableMain = styled.div`
    min-width: 100%;
`;

// for "SlidableHidden"
const StyledSlidableHidden = styled.div<{ $slidableLength: number }>`
    min-width: ${(props) => props.$slidableLength}px;
`;
// ========================================================= STYLE === //
