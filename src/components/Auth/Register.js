import React, { useEffect, useRef, useState } from "react";
import AuthService from "../../Services/AuthService";
import Message from ".././Auth/Message";
import styled from "styled-components";

const Container = styled.div`
    box-sizing: border-box
    border: 1px solid black;
    z-index:  -3;
    display: flex;
    width: 15rem;
    height: 15rem;
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
    top: -29rem;
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
const Register = (props) => {
    const [user, setUser] = useState({ firstName: "", lastName: "", username: "", password: "", role: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // TODO password confirmation
    const resetForm = () => {
        setUser({ firstName: "", lastName: "", username: "", password: "", role: "" });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.register(user).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 2000);
            }
        });
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <H3>Please Register</H3>
                <InputBox>
                    <Label htmlFor="role" className="sr-only">
                        First Name{" "}
                    </Label>
                    <Input
                        type="text"
                        name="role"
                        value={user.firstName}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter role admin or user"
                    />
                    <Label htmlFor="role" className="sr-only">
                        Last Name{" "}
                    </Label>
                    <Input
                        type="text"
                        name="role"
                        value={user.lastName}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter role admin or user"
                    />
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={onChange}
                        placeholder="Enter Username"
                    />
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Enter Password"
                    />
                    <Label htmlFor="password">Confirm Password: </Label>
                    <Input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Enter Password"
                    />
                    <Label htmlFor="role" className="sr-only">
                        Manager or Team Member:{" "}
                    </Label>
                    <Input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter role admin or user"
                    />
                </InputBox>
                <Button type="submit">Register</Button>
            </Form>

            {message ? <Message message={message} /> : null}
        </Container>
    );
};

export default Register;
