import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from '../elements/ThemeSwitch';

export const NavLogo = () => {
    return (
    <svg viewBox="0 0 148 48.7" enable-background="new 0 0 148 48.7" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path class="st0" d="m43.8 23.8c-0.5-0.3-1-0.5-1.5-0.7s-1-0.3-1.5-0.3c-0.6 0-1 0.1-1.3 0.3s-0.5 0.6-0.5 1c0 0.3 0.1 0.6 0.4 0.8s0.6 0.5 1 0.6c0.4 0.2 0.8 0.4 1.2 0.5s0.8 0.3 1.1 0.5c0.4 0.2 0.7 0.4 1 0.7s0.5 0.7 0.7 1.1 0.3 1 0.3 1.6c0 0.7-0.2 1.3-0.5 1.9s-0.9 1-1.5 1.4c-0.7 0.3-1.5 0.5-2.5 0.5-0.5 0-1 0-1.5-0.1s-1-0.3-1.5-0.5-1-0.5-1.5-0.8l1.2-2c0.3 0.2 0.6 0.4 1 0.6s0.7 0.3 1.1 0.4 0.7 0.1 1 0.1 0.6 0 0.9-0.1 0.6-0.3 0.8-0.5 0.3-0.5 0.3-0.9c0-0.3-0.1-0.5-0.3-0.7s-0.4-0.4-0.7-0.6-0.6-0.3-1-0.5-0.8-0.3-1.3-0.5-0.8-0.5-1.2-0.7c-0.4-0.3-0.7-0.7-0.9-1.1s-0.3-1-0.3-1.6c0-0.8 0.2-1.4 0.5-2s0.8-1 1.5-1.3c0.6-0.3 1.3-0.5 2.2-0.6 1.1 0 1.9 0.1 2.6 0.4s1.3 0.6 1.8 0.9l-1.1 2.2z"/>
        <path class="st0" d="m49.5 29c0 0.4 0.1 0.8 0.4 1.2s0.6 0.7 1 0.9 0.9 0.4 1.4 0.4 1-0.1 1.4-0.4c0.4-0.2 0.8-0.6 1-0.9 0.3-0.4 0.4-0.8 0.4-1.2v-8.4h2.6v8.4c0 1-0.2 1.8-0.7 2.6-0.5 0.7-1.1 1.3-1.9 1.8-0.8 0.4-1.7 0.6-2.7 0.6s-1.9-0.2-2.7-0.6-1.4-1-1.9-1.8-0.7-1.6-0.7-2.6v-8.4h2.6v8.4z"/>
        <path class="st0" d="M60.8,20.6h2.6v10.7h6.2v2.5h-8.8V20.6z"/>
        <path class="st0" d="M72.3,20.6H75v10.7h6.2v2.5h-8.8V20.6z"/>
        <path class="st0" d="M83.9,20.6h2.6v13.2h-2.6V20.6z"/>
        <path class="st0" d="m91.9 20.6 3.9 9.5-1.5-0.3 3.5-9.2h3.1l-6 13.9-6-13.9h3z"/>
        <path class="st0" d="m99.9 33.8 6-13.8h0.1l6 13.8h-3l-3.8-9.7 1.9-1.3-4.6 11h-2.6zm4-4.7h4l0.9 2.2h-5.7l0.8-2.2z"/>
        <path class="st0" d="m125.7 34.4-10-9.1 0.8 0.4 0.1 8.1h-2.6v-13.7h0.1l9.8 9-0.6-0.3-0.1-8.3h2.6l-0.1 13.9z"/>


        <path class="st0" d="M25.7,17.6h1.1v19.7h-1.1V17.6z"/>
        <path class="st0" d="m28.3 17.6v0.8h-4.2v-0.8h4.2z"/>
        <path class="st0" d="m28.3 36.4v0.8h-4.2v-0.8h4.2z"/>
    </svg>
    )
}

export default function NavBar(){
    const location = useLocation();
    const path = location.pathname;
    return (
        <Navbar>
            <NavbarBrand justify="start">
                <NavLogo alt="Ilya Sullivan Logo" />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem isActive={path==="/"}>
                    <Link to="/" className="capitalize">Home</Link>
                </NavbarItem>
                <NavbarItem isActive={path==="/about"}>
                    <Link to="/about" className="capitalize">About</Link>
                </NavbarItem>
                <NavbarItem isActive={path==="/projects"}>
                    <Link to="/projects" className="capitalize">Projects</Link>
                </NavbarItem>
                <NavbarItem isActive={path==="/tools"}>
                    <Link to="/tools" className="capitalize">Tools</Link>
                </NavbarItem>
                <NavbarItem isActive={path==="/contact"}>
                    <Link to="/contact" className="capitalize">Contact</Link>
                </NavbarItem>
                <ThemeSwitch />
            </NavbarContent>
        </Navbar>
    )
}