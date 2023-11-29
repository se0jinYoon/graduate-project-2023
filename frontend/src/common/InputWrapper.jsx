import React from "react";
import styled from 'styled-components';

import Input from "../UI/Input";

const InputWrapper = (props) => {
    return <Wrapper>{props.children}</Wrapper>
}

export default InputWrapper;

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    width: 100%;
    margin-top: 1rem;
`