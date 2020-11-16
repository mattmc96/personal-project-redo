import React, { useContext } from "react";
import Landing from "./components/Home/Landing";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/My-Profile";
import CreateRoom from "./components/Chat/CreateRoom";
import Plan from "./components/Events/Plan";
import About from "./components/About/About";
import Admin from "./components/Auth/Admin";
import Room from "./components/Chat/Room";
import Register from "./components/Auth/Register";
import Navbar from "./components/Nav/Navbar";
import PrivateRoute from "./HOCS/PrivateRoute";
import PublicRoute from "./HOCS/PublicRoute";
import { AuthContext } from "./Context/Auth-Context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    background: #25274d;
    height: 100vh;
`;

const App = () => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    return (
        <Container>
            <Router>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="register" component={Register} />
                <PrivateRoute path="/plan" roles={["user", "admin"]} component={Plan} />
                <PrivateRoute path="/join" roles={["user", "admin"]} component={CreateRoom} />
                <PrivateRoute path="/room/:roomID" roles={["user", "admin"]} component={Room} />
                <PrivateRoute path="/profile" roles={["admin"]} component={Profile} />
                <PrivateRoute path="/about" roles={[" user", " admin"]} component={About} />
                <PrivateRoute path="/admin" roles={[" user", " admin"]} component={Admin} />
            </Router>
        </Container>
    );
};

export default App;
