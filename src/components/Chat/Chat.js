import React from "react";
import Viewer from ".././Share/Viewer";
import Broadcaster from ".././Share/Broadcaster";

const Chat = () => {
    return (
        <div>
            <div>
                <Viewer />
            </div>
            <Broadcaster />
        </div>
    );
};

export default Chat;
