import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './session_errors_reducer';
import users  from './users_reducer'
import language from './languages_reducer'


const RootReducer = combineReducers({
    errors,
    session,
    users,
    language
});

export default RootReducer;