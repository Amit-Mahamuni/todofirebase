import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Login from "./components/Login";
import { Navbar, Container, Dropdown } from "react-bootstrap";

function App() {

  const [user, setuser] = useState();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user]);

  function user_logout(){
    setuser({});
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
                      {user.mail.split("@")[0]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow rounded-0">
                      <Dropdown.Item eventKey="1" onClick={user_logout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  :
                  "Login"
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        user && Object.keys(user).length !== 0 ? <Todo /> :
          <Login setusr={setuser} />
      }
    </div>
  );
}

export default App;
