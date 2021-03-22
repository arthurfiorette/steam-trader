import React from 'react';
import './Header.css';

import { Nav, NavBrand } from './bootstrap';

export default function Header() {
  return (
    <header id="header" className="shadow">
      <Nav>
        <NavBrand>Steam Trader</NavBrand>
      </Nav>
    </header>
  );
}
