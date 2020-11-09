import React, { useState } from "react";
import mainLogo from "../../assets/logov.2.png";
import styled from "styled-components";

// TODO Fix Bug in the hamburger Icon that won't let move on
const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #aaabb8;
`;
const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
        height: 2px;
        width: 25px;
        background: #29648a;
        margin-bottom: 4px;
        border-radius: 5px;
    }

    @media (max-width 768px) {
        display: flex;
    }
`;
const MenuLink = styled.a`
    padding: 1rem 2rem;
    cursor: pointer;
    font-weight: 800;
    text-align: center;
    text-decoration: none;
    color: #29648a;
    transition: all 0.3s ease-in;

    &:hover {
        color: #2e9cca;
    }
`;
const Menu = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        width: 100%;
        max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    }
`;
const Logo = styled.a`
    display: flex;
    text-decoration: none;
    font-weight: 800;
    font-size: .8rem;
    color: pink;
    
    img {
        height: 4rem;
        width: 4rem;
        background-image: url(${mainLogo})
        display: flex;
    }
    `;
const H1 = styled.h1`
    color: #29648a;

    &:hover {
        color: #2e9cca;
    }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Nav>
            <Logo href="">
                <H1>Connect</H1>
                <img src={mainLogo} alt="Logo" />
            </Logo>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Hamburger>
            <Menu isOpen={isOpen}>
                <MenuLink href="">Home</MenuLink>
                <MenuLink href="">Connect</MenuLink>
                <MenuLink href="">Plan</MenuLink>
                <MenuLink href="">About</MenuLink>
            </Menu>
        </Nav>
    );
};

export default Navbar;
