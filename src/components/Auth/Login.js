import React, { useContext, useState } from "react";
// import AuthService from "../Services/AuthService"
import { AuthContext } from "../../Context/Auth-Context";
// import styled from "styled-components";

// const Container = styled.div`
//     height: 100vh;
//     width: 100vw;
//     border: 1px solid black;
// `;
// const Form = styled.form``;

const Login = (props) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };

    return (
        <div>
            <form>
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
            </form>
            {/*{ message ? <Message message={ message }/> : null }*/}
        </div>
    );
};

export default Login;
