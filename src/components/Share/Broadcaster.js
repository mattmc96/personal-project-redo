import React from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color: black;
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;
const Video = styled.video`
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    object-fit: cover;
`;

const Broadcaster = () => {
    return (
        <Container>
            <Video playsInline autoPlay muted></Video>
        </Container>
    );
};

export default Broadcaster;
