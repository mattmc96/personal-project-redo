import React, { useContext, useState } from "react";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/Auth-Context";
import Message from "./Message";
import styled from "styled-components";
import Checkout from "../../Stripe/Checkout";

const Container = styled.div`
    box-sizing: border-box
    border: 1px solid black;
    z-index: -2;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const H3 = styled.h3`
    font-size: 25px;
`;
const Form = styled.form`
    box-sizing: border-box;
    background-color: white;
    height: 40rem;
    width: 25rem;
    position: relative;
    top: 30rem;
    left: 10rem;
`;
const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 10rem;
`;
const Button = styled.button`
    padding: 7px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    background-color: #3a3a3a;
    cursor: pointer;
    outline: none;
`;
const Input = styled.input`
    border-radius: 7%;
    height: 2rem;
    width: 20rem;
    margin: 20px 0px;
`;
const Label = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    left: -10rem;
`;
const StripeBox = styled.div`
    display: flex;
    position: relative;
    top: 5rem;
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
                <H3>Please sign in</H3>
                <InputBox>
                    <Label htmlFor="username">Username: </Label>
                    <Input type="text" name="username" onChange={onChange} placeholder="Enter Username" />
                    <Label htmlFor="password">Password: </Label>
                    <Input type="password" name="password" onChange={onChange} placeholder="Enter Password" />
                    <Button type="submit">Log in</Button>
                    <StripeBox>
                        <header>
                            <p>Stripe Checkout - ReactJS</p>
                            <Checkout />
                        </header>
                    </StripeBox>
                </InputBox>
            </Form>
            {message ? <Message message={message} /> : null}
        </Container>
    );
};

export default Login;
