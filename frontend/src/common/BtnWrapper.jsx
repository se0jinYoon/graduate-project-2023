import React from "react";
import styled from 'styled-components';

const BtnWrapper = (props) => {
    return(
        <Wrapper>{props.children}</Wrapper>
    )
}

export default BtnWrapper;

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem 0;

    margin-top: 1rem;

    width: 100%;
`
