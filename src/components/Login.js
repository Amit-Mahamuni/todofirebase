import React, { useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

function Login(props) {

    const [loginState, setloginState] = useState(false)


    function login_frm_submit(e) {
        let login_detail = {
            mail: e.target.login_mail.value,
            passwd: e.target.login_passwd.value,
            action: !loginState ? "login" : "register"
        }

        if (loginState) {
            login_detail = { ...login_detail, name: e.target.login_name.value }
        }

        axios.post("http://localhost:3001/login", login_detail).then((response) => {
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            props.setusr(response.data);
        })

        e.preventDefault();
    }

    return (
        <Container className="p-3 my-md-3 mianContainer d-flex justify-content-center">
            <Card style={{ width: '30rem', height: "max-content" }}>
                <Card.Body>
                    <form onSubmit={login_frm_submit}>
                        {
                            loginState ?
                                <div className="mb-3">
                                    <label for="login_mail" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="login_name" id="login_name" />
                                </div>
                                : null
                        }
                        <div className="mb-3">
                            <label for="login_mail" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="login_mail" id="login_mail" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="login_passwd" className="form-label">Password</label>
                            <input type="password" className="form-control" name="login_passwd" id="login_passwd" />
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="submitbtn rounded-0 btn btn-dark">Submit</button>
                            <button type="button" className="ms-2 rounded-0 btn btn-light"
                                onClick={() => setloginState(!loginState)}>
                                {!loginState ? "Register" : "Login"} </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;