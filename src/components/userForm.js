import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from 'react-bootstrap/Tab'
import { login, register } from '../actions/actions';
import { connect } from 'react-redux';

const UserForm = props => {
  const [loginName, setLoginName] = useState('');
  const [loginPWD, setLoginPWD] = useState('');
  const [regName, setRegName] = useState('');
  const [regPWD, setRegPWD] = useState('');
  const [confirmRegPWD, setConfirmRegPWD] = useState('');
  const [loginValidated, setLoginValidState] = useState(false)
  const [regValidated, setRegValidState] = useState(false)
  // const [invalidMsg, setInvalidMsg] = useState('');

  useEffect(() => {
  }, [props.usersState])

  const loginNameOnChange = (val) => {
    setLoginName(val)
  }

  const loginPWDOnChange = (val) => {
    setLoginPWD(val)
  }


  const loginFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoginValidState(true);
    if (form.checkValidity()) {
      props.login({name: loginName, pwd: loginPWD, type: 'login'});
      
      
    }
    else {
      return false;
    }
  }

  const regNameOnchange = (val) => {
    setRegName(val);
  }

  const regPWDOnchange = (val) => {
    setRegPWD(val);
  }

  const confirmRegPWDonChange = (val) => {
    setConfirmRegPWD(val);
  }

  const regFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setRegValidState(true);
    if (form.checkValidity()) {
      props.register({name: regName, pwd: regPWD, confirmPWD: confirmRegPWD});
    }
  }



  return (
    <div className="userForm">
      <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
        <Tab eventKey="login" title="Login">
          <Form validated={loginValidated} noValidate onSubmit={(e) => loginFormSubmit(e)}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter User Name" value={loginName} onChange={(e) => loginNameOnChange(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide user name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={loginPWD} onChange={(e) => loginPWDOnChange(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide password.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            {!props.usersState.isValid && props.usersState.msg.length > 0 && props.usersState.type === 'login' && <small className='invalidMsg'>{props.usersState.msg}</small>}
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          <Form validated={regValidated} noValidate onSubmit={(e) => regFormSubmit(e)}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter User Name" required value={regName} onChange={(e) => {regNameOnchange(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" required value={regPWD} onChange={(e) => {regPWDOnchange(e.target.value)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required value={confirmRegPWD} onChange={(e) => {confirmRegPWDonChange(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            {!props.usersState.isValid && props.usersState.msg.length > 0 && props.usersState.type === 'register' && <small className='invalidMsg'>{props.usersState.msg}</small>}
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { login, register })(UserForm);
