import React from 'react';
import { Nav, Button, Form, Navbar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import './Header.css';

export default function () {
  return (
    <header id="header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Steam Trader</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Form inline>
          <Button variant="outline-success">
            <a href="https://github.com/ArthurFiorette/steam-trader" target="_blank">
              <Icon.Github size="25px" className="success"/>
            </a>
          </Button>
        </Form>
      </Navbar>
    </header>
  );
}
