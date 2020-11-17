import React from "react";
import { v1 as uuid } from "uuid";
import styled from "styled-components";

const Button = styled.button`
    box-sizing: border-box;
    background-color: white;
    height: 40rem;
    width: 25rem;
    position: relative;
    top: 30rem;
    left: 10rem;
`;

const Join = (props) => {
    const create = () => {
        const id = uuid();
        props.history.push(`/room/${id}`);
    };
    return <Button onClick={create}>Create Room</Button>;
};

export default Join;
