import React, { useContext, useState } from "react";
import mainLogo from "../../Assets/logov.2.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth-Context";
import styled from "styled-components";
import AuthService from "../../Services/AuthService";

const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

const StyledLink = styled.a`
    padding: 1rem 2rem;
    cursor: pointer;
    font-weight: 900;
    text-align: center;
    text-decoration: none;
    color: #29648a;
    transition: all 0.3s ease-in;
    font-size: 1.4rem;
    &:hover {
        color: #2e9cca;
    }
`;

const Logo = styled.div`
    padding: 1rem 0;
    display: flex;
    color: #29648a;
    text-decoration: none;
    font-weight: 800;
    font-size: 1.2rem;
    img {
        height: 4.5rem;
        width: 4.5rem;
        font-weight: 300;
        font-size: 1.3rem;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
        transition: max-height 0.3s ease-in;
        width: 100%;
    }
`;

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;
    span {
        height: 2px;
        width: 25px;
        background: #29640a;
        margin-bottom: 4px;
        border-radius: 5px;
    }
    @media (max-width: 768px) {
        display: flex;
    }
`;
const H1 = styled.h1`
    font-size: 3rem;
    font-weight: 900;
    color: #29648a;
`;

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    const unauthenticatedNavbar = () => {
        return (
            <Nav>
                <Logo>
                    <H1>Connect</H1>
                    <img src={mainLogo} alt="logo" />
                </Logo>
                <Hamburger onClick={() => setIsOpen(!isOpen)}>
                    <span />
                    <span />
                    <span />
                </Hamburger>
                <Menu isOpen={isOpen}>
                    <StyledLink href="/">Home</StyledLink>
                    <StyledLink href="/login">Login</StyledLink>
                    <StyledLink href="/register">Register</StyledLink>
                </Menu>
            </Nav>
        );
    };

    const authenticatedNavbar = () => {
        return (
            <Nav>
                <Logo>
                    <H1>Connect</H1>
                    <img src={mainLogo} alt={"nothing"} />
                </Logo>
                <Hamburger onClick={() => setIsOpen(!isOpen)}>
                    <span />
                    <span />
                    <span />
                </Hamburger>
                <Menu isOpen={isOpen}>
                    <StyledLink href="/">Home</StyledLink>
                    <StyledLink href="/join">Connect</StyledLink>
                    <StyledLink href="/plan">Plan</StyledLink>
                    {user.role === "admin" ? <StyledLink href="/admin">Manage Team</StyledLink> : null}
                    <StyledLink href="/profile">My Profile</StyledLink>
                    <StyledLink href="/about">About</StyledLink>
                    <button type="button" onClick={onClickLogoutHandler}>
                        Logout
                    </button>
                </Menu>
            </Nav>
        );
    };

    return (
        <>
            <li>
                <Link to="/login">Test</Link>
            </li>
            <div>
                <ul>{!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}</ul>
            </div>
        </>
    );
};

export default Navbar;
