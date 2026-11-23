import styled from "styled-components";

// Romboíde con los logos. 

export const RhomboidContent = styled.div`
    transform: skewX(6.5deg);
`

export const RhomboidWithUasLogos = styled.div`
    display: flex;
    flex-direction: row;
    width: auto;
    height: auto;
    background: var(--color-blanco);
    justify-content: center;
    align-content: center;
    gap: 20px;
    transform: skewX(-6.5deg);
    margin: 20px;

    &.${RhomboidContent} {

    }
`;

export const UasLogos = styled.img`
    width: 50px;
    height: 50px;
    padding: 7px;
    object-fit: contain;
`