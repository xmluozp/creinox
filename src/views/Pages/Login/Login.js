import React, { useState } from "react";
import { connect } from "react-redux";
import Toastr from "components/toastr";
import { handleOnChange } from "_helper";
import { Inputs } from "components";
import { userActions } from "_actions";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

const initialValues = {
  userName: "",
  password: "",
};

const Login = ({ onLogin }) => {
  const [userid, setuserid] = useState(0);
  const [userName, setUserName] = useState(initialValues.userName);
  const [password, setPassword] = useState(initialValues.password);

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
                    <h1>登录Creinox管理系统</h1>
                    <p className="text-muted">
                      选择你的用户（如果下拉列表是空的请刷新一下页面）                      
                    </p>
                    <InputGroup className="mb-3">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon> */}
                      <Grid item xs={12}>
                        <Inputs.MyComboboxFK
                          label="选择要登录的用户"
                          optionLabel="name"
                          tableName="user"
                          actionName="get_loginUserList"
                          value={userid}
                          onChange={(a, b, c, item) => {
                            if (item) {
                              setuserid(item.id);
                              setUserName(item.userName);
                            }
                          }}
                        />
                      </Grid>
                      {/* <Input type="text" placeholder="Username" autoComplete="username" 
        name="userName" value={userName} onChange={e => { handleOnChange(e, setUserName) }} /> */}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="请输入密码"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          handleOnChange(e, setPassword);
                        }}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            onLogin({ userName, password });
                          }}
                        >
                          登录系统
                        </Button>
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
};

// 从reducer来的
const actionCreators = {
  onLogin: userActions.login,
};

export default connect(null, actionCreators)(Login);
