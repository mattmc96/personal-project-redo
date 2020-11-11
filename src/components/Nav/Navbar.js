import React, { useState } from "react";
import mainLogo from "../../assets/logov.2.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Nav>
            <li>
                <Link to="/login">Home</Link>
            </li>
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
                {/*<Link to="/login">Home</Link>*/}
                <StyledLink href="/login">Connect</StyledLink>
                <StyledLink href="/plan">Plan</StyledLink>
                <StyledLink href="/profile">My Profile</StyledLink>
                <StyledLink href="/about">About</StyledLink>
            </Menu>
        </Nav>
    );
};

export default Navbar;
