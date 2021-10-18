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
                        <div class="mb-3">
                            <label for="login_mail" class="form-label">Email address</label>
                            <input type="email" class="form-control" name="login_mail" id="login_mail" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="login_passwd" class="form-label">Password</label>
                            <input type="password" class="form-control" name="login_passwd" id="login_passwd" />
                        </div>
                        <button type="submit" class="submitbtn rounded-0 btn btn-dark">Submit</button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;