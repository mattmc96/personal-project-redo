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
    // let peerConnection;
    //
    // const config = {
    //     iceServers: [
    //         {
    //             urls: ["stun:stun.l.google.com:19302"],
    //         },
    //     ],
    // };
    //
    // const socket = io.connect(window.location.origin);
    // const video = document.querySelector("video");
    //
    // socket.on("offer", (id, description) => {
    //     peerConnection = new RTCPeerConnection(config);
    //     peerConnection
    //         .setRemoteDescription(description)
    //         .then(() => peerConnection.createAnswer())
    //         .then((sdp) => peerConnection.setLocalDescription(sdp))
    //         .then(() => {
    //             socket.emit("answer", id, peerConnection.localDescription);
    //         });
    //     peerConnection.ontrack = (event) => {
    //         video.srcObject = event.streams[0];
    //     };
    //     peerConnection.onicecandidate = (event) => {
    //         if (event.candidate) {
    //             socket.emit("candidate", id, event.candidate);
    //         }
    //     };
    // });
    //
    // socket.on("candidate", (id, candidate) => {
    //     peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.error(e));
    // });
    //
    // socket.on("connect", () => {
    //     socket.emit("watcher");
    // });
    //
    // socket.on("broadcaster", () => {
    //     socket.emit("watcher");
    // });
    //
    // socket.on("disconnectPeer", () => {
    //     peerConnection.close();
    // });
    //
    // window.onunload = window.onbeforeunload = () => {
    //     socket.close();
    // };

    return (
        <Container>
            <Video playsInline autoPlay></Video>
        </Container>
    );
};

export default Viewer;
