import React, { useContext, useState } from "react";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/Auth-Context";
import Message from "./Message";
import styled from "styled-components";

const Container = styled.div`
    box-sizing: border-box
    border: 1px solid black;
    z-index: -2;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;
const Form = styled.form`
    box-sizing: border-box;
    background-color: white;
    position: relative;
    top: 30rem;
    left: 10rem;
`;

const Login = (props) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.login(user).then((data) => {
            console.log(data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push("/");
            } else setMessage(message);
        });
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">
                    Username:{" "}
                </label>
                <input
                    type="text"
                    name="username"
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter Username"
                />
                <label htmlFor="password" className="sr-only">
                    Password:{" "}
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter Password"
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Log in
                </button>
            </Form>
            {message ? <Message message={message} /> : null}
        </Container>
    );
};

export default Login;
