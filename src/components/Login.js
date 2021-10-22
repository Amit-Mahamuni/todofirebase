import React from "react";
import { Container, Card } from "react-bootstrap";

function Login(props) {


    function login_frm_submit(e) {
        let login_detail = {
            mail: e.target.login_mail.value,
            passwd: e.target.login_passwd.value
        }
        props.setusr(login_detail);       
        e.preventDefault();
    }


    return (
        <Container className="p-3 my-md-3 mianContainer d-flex justify-content-center">
            <Card style={{ width: '30rem', height: "max-content" }}>
                <Card.Body>
                    <form onSubmit={login_frm_submit}>
                        <div className="mb-3">
                            <label for="login_mail" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="login_mail" id="login_mail" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="login_passwd" className="form-label">Password</label>
                            <input type="password" className="form-control" name="login_passwd" id="login_passwd" />
                        </div>
                        <button type="submit" className="submitbtn rounded-0 btn btn-dark">Submit</button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;