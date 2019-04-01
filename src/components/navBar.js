import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import history from '../history';
import { navbarFetch } from '../actions/actions';

const NavBar = (props) => {
  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = () => {
    const userId = history.location.pathname.slice(6, history.location.pathname.length);
    if (userId) {
      props.navbarFetch(userId)
    }
  }

  const logout = () => {
    props.navbarFetch(undefined);
    history.push('/');
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home" className='mr-auto'>Todo</Navbar.Brand>
        
        <Form inline className="mr-sm-2">
          {!props.isLogin && <span>Welcome</span>}
          {props.isLogin &&
            <><span>Welcome, {props.userName}</span>
              <Button variant="outline-primary" size="sm" className='ml-1' onClick={(() => logout())}>Logout</Button>
            </>
          }

        </Form>
      </Navbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state.navBarState;
}

export default connect(mapStateToProps, { navbarFetch })(NavBar);