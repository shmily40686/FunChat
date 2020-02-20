import * as APIUtil from '../util/users_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";


const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})


const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})


export const fetchUser = (userId) => dispatch => (
    APIUtil.fetchAUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
);


export const fetchUsers = (languages) => dispatch => (
    APIUtil.fetchUsers(languages)
    .then(users => dispatch(receiveUsers(users)))
    .catch(err => console.log(err))
)