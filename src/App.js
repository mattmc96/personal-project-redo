import React, { useContext } from "react";
import { AuthContext } from "./Context/Auth-Context";
import Navbar from "./components/Nav/Navbar";
import styled from "styled-components";

const Container = styled.div`
    background: #25274d;
    height: 100vh;
`;

const App = () => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    console.log(user);

    console.log(isAuthenticated);
    return (
        <Container>
            <Navbar />
        </Container>
    );
};

export default App;
