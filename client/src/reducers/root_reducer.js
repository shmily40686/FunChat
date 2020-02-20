import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './session_errors_reducer';
import users  from './users_reducer'


const RootReducer = combineReducers({
    errors,
    session,
    users
});

export default RootReducer;