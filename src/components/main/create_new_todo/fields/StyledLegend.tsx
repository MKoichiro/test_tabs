import styled from 'styled-components';

// === TYPE =========================================================== //
interface ChildLegendProps {
    className?: string;
}
// =========================================================== TYPE === //

// === STYLED COMPONENT =============================================== //
export const StyledLegend = styled.legend<ChildLegendProps>`
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.8rem;
`;
// =============================================== STYLED COMPONENT === //
