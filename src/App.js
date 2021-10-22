import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Login from "./components/Login";
import { Navbar, Container, Dropdown } from "react-bootstrap";

function App() {

  const [user, setuser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setuser(JSON.parse(localStorage.getItem("user")))
    }
  }, []);

  function user_logout() {
    localStorage.clear();
    setuser(undefined);
  }

  return (
    <div className="rootconatiner">
      <Navbar className="bg-white shadow">
        <Container>
          <Navbar.Brand><b>Todo</b></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {
                user && Object.keys(user).length !== 0 ?
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light py-0 rounded-0" id="dropdown-login">
                      {user.data.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow rounded-0">
                      <Dropdown.Item eventKey="1" onClick={user_logout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  :
                  null
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        user ? <Todo token={user.accessToken}/> :
          <Login setusr={setuser} />
      }
    </div>
  );
}

export default App;
