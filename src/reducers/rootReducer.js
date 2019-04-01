import { combineReducers } from 'redux';
import navBarReducer from './navBar-reducer';
import usersReducer from './users-reducer';
import tableReducer from './table-reducer';

export default combineReducers({
    navBarState: navBarReducer,
    usersState: usersReducer,
    tableState: tableReducer
})