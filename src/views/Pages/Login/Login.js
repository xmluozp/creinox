import React, { useState } from 'react';
import { connect } from 'react-redux';
import Toastr from "../../../components/toastr";
import { handleOnChange } from '../../../_helper'
import { userActions } from '../../../_actions';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const initialValues = {
  userName: "",
  password: ""
}

const Login = ({ onLogin }) => {

  const [userName, setUserName] = useState(initialValues.userName)
  const [password, setPassword] = useState(initialValues.password)

  return (
    <div className="app flex-row align-items-center">
    <Toastr />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" name="userName" value={userName} onChange={e => { handleOnChange(e, setUserName) }} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={e => { handleOnChange(e, setPassword) }} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => { onLogin({userName, password }) }} >Login</Button>
                      </Col>
                      {/* <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// 从reducer来的
const actionCreators = {
  onLogin: userActions.login,
};

export default connect(null, actionCreators)(Login);