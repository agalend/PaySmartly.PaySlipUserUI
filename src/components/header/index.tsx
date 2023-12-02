import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from "./navbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/calculator" >
                        Calculator
                    </NavLink>
                    <NavLink to="/history">
                        History
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;