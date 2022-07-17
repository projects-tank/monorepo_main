import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      Header
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/contact/privacy">privacy</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};
export default Header;
