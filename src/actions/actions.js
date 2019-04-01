import { CHECK_VALID_LOGIN, NAR_BAR_STATE, NEW_TODO, GET_ALL_TODOS, DELETE_ROW, EDIT_ROW } from "./types";
import axios from "axios";
import uuid from 'uuid';
import history from '../history';

export const login = (data) => dispatch => {
  axios.get("http://localhost:3001/users").then(res => {
    let users = res.data;
    let msg = '';
    let count = 0;
    let userId = '';
    let name = '';
    if (users.length > 0) {
      users.forEach((user) => {
        if (user.name === data.name) {
          userId = user.id;
          name = user.name;
          if (user.password !== data.pwd) {
            msg = 'User name or password is invalid.'
          }
        }
        else {
          count++;
        }
      })
    }
    if (count === users.length) {
      msg = 'This user name is not exist.'
    }
    if (msg.length > 0) {
      dispatch({
        type: CHECK_VALID_LOGIN,
        payload: {isValid: msg.length === 0 ? true : false, msg: msg, type: 'login'}
      })
    }
    else {
      dispatch({
        type: NAR_BAR_STATE,
        payload: {
          isLogin: true,
          userName: name,
          id: userId
        }
      })
      history.push(`/user/${userId}`)
    }
    
  });
};

export const register = (data) => dispatch => {
  let msg = '';
  if (data.pwd !== data.confirmPWD) {
    msg = 'Please confirm your password again.'
    dispatch({
      type: CHECK_VALID_LOGIN,
      payload: {isValid: false, msg: msg, type: 'register'}
    })
    return false;
  }

  axios.get("http://localhost:3001/users").then((res) => {
    let users = res.data;
    users.forEach((user) => {
      if (user.name === data.name) {
        msg = "This user name already exist. Please choose another one."
        dispatch({
          type: CHECK_VALID_LOGIN,
          payload: {isValid: false, msg: msg, type: 'register'}
        })
        return false;
      }
    })
  })

  let id = uuid.v1();
  let obj = { name: data.name, password: data.pwd, id: id };
  axios.post("http://localhost:3001/users", obj).then((res) => {
    dispatch({
      type: NAR_BAR_STATE,
      payload: {
        isLogin: true,
        userName: res.data.name,
        id: res.data.id
      }
    })
    history.push(`/user/${res.data.id}`)
  })
}

export const navbarFetch = (id=null) => dispatch => {
  if (id) {
    axios.get(`http://localhost:3001/users/${id}`).then((res) => {
      if (res) {
        dispatch({
          type: NAR_BAR_STATE,
          payload: {
            isLogin: true,
            userName: res.data.name,
            id: id
          }
        })
      }
    })
  }
  else {
    dispatch({
      type: NAR_BAR_STATE,
      payload: {
        isLogin: false,
        userName: '',
        id: ''
      }
    })
  }
}

export const createTodo = (obj) => dispatch => {
  axios.post("http://localhost:3001/todos", obj).then((res) => {
    dispatch({
      type: NEW_TODO,
      payload: res.data
    })
  })
}

export const getAllTodosByOneUser = (userId) => dispatch => {
  axios.get(`http://localhost:3001/users/${userId}/todos`).then((res) => {
    dispatch({
      type: GET_ALL_TODOS,
      payload: res.data
    })
  })
}

export const deleteTodo = (todoId) => dispatch => {
  axios.delete(`http://localhost:3001/todos/${todoId}`).then((res) => {
    dispatch({
      type: DELETE_ROW,
      payload: todoId
    })
  })
}

export const editTodo = (id, obj) => dispatch => {
  axios.patch(`http://localhost:3001/todos/${id}`, obj).then((res) => {
    dispatch({
      type: EDIT_ROW,
      payload: res.data
    })
  })
}
