import {
    RECEIVE_USER,
    RECEIVE_USERS
} from '../actions/users_actions';

const obj = {
    user: null,
    users: null
}

export default function (state = obj, action) {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_USER:
            nextState["user"] = action.user
            return nextState
        case RECEIVE_USERS:
            nextState["users"] = action.users  
            return nextState
        default:
            return state;
    }
}