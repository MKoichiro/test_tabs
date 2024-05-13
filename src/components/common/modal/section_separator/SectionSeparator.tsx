import { DirectionsWalkOutlined, Inventory2Outlined } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

interface SectionSeparatorProps {
    sectionName: string;
}

export const SectionSeparator = ({ sectionName }: SectionSeparatorProps) => {
    const sectionNameFormatted = sectionName.toUpperCase();

    return (
        <StyledH4 className="section-separator">
            {sectionName === 'Active' ? <DirectionsWalkOutlined /> : <Inventory2Outlined />}
            <span className="section-name">{sectionNameFormatted}</span>
        </StyledH4>
    );
};

const StyledH4 = styled.h4`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.4rem;
    margin: 0 1.6rem;

    &::before,
    &::after {
        content: '';
        display: block;
        flex: 1;
        height: var(--border-weight);
        background-color: var(--color-black-1);
    }
    &::before {
        margin-right: 1.6rem;
    }
    &::after {
        margin-left: 1.6rem;
    }

    svg {
        font-size: 2rem;
        color: var(--color-black-1);
    }

    .section-name {
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
        font-weight: 700;
        color: var(--color-black-1);
        margin-left: 0.8rem;
    }
`;
