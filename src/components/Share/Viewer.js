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

const Viewer = () => {
    const peerConnections = {};

    const config = {
        iceServers: [
            {
                urls: ["stun:stun.l.google.com:19302"],
            },
        ],
    };

    const socket = io.connect(window.location.origin);
    const video = document.querySelector("video");
    const constraints = {
        video: { facingMode: "user" },
        audio: true,
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            socket.emit("broadcaster");
        })
        .catch((error) => console.error(error));

    return (
        <Container>
            <Video playsInline autoPlay></Video>
        </Container>
    );
};

export default Viewer;
