import axios from 'axios';

export const fetchAUser = (userId) => {
    return axios.get(`/api/users/${userId}`);
};

export const fetchUsers = (languages) => {
    return axios.get(`/api/users/languages/${languages}`)
}

export const addFriend = (data) => {
    return axios.post('/api/users/add',data)
}