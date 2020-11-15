import React from "react";
import io from "socket.io";
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
    socket.on("watcher", (id) => {
        const peerConnection = new RTCPeerConnection(config);
        peerConnections[id] = peerConnection;

        let stream = video.srcObject;
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("candidate", id, event.candidate);
            }
        };

        peerConnection
            .createOffer()
            .then((sdp) => peerConnection.setLocalDescription(sdp))
            .then(() => {
                socket.emit("offer", id, peerConnection.localDescription);
            });
    });

    socket.on("answer", (id, description) => {
        peerConnections[id].setRemoteDescription(description);
    });

    socket.on("candidate", (id, candidate) => {
        peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("disconnectPeer", (id) => {
        peerConnections[id].close();
        delete peerConnections[id];
    });

    window.onunload = window.onbeforeunload = () => {
        socket.close();
    };

    return (
        <Container>
            <Video playsInline autoPlay muted></Video>
        </Container>
    );
};

export default Broadcaster;
