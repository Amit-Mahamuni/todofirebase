import React from "react";
import Todo from "./components/Todo";
import { Navbar, Container } from "react-bootstrap";

function App() {
  return (
    <div className="rootconatiner">
      <Navbar className="bg-white shadow">
        <Container>
          <Navbar.Brand><b>Todo</b></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              login
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Todo />
    </div>
  );
}

export default App;
