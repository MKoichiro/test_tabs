import React from 'react';
import styled from 'styled-components';
import { HorizontalRule } from '@mui/icons-material';

export const BulletIcon = () => {
    return (
        <StyledSpan>
            <HorizontalRule />
        </StyledSpan>
    );
};

const StyledSpan = styled.span`
    min-height: 100%;
    min-width: var(--icon-size-1);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 2rem;
        @media (width < 600px) {
            font-size: 14px;
        }
    }
`;
