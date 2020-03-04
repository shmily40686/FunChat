const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    console.log(name, room);

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    // if (existingUser) return { error: 'Username is taken.' };
    if(!existingUser) {
        const user = { id, name, room };

        users.push(user);
        console.log('users ~~~~~~~~~~~');
        console.log(users);
        return { user };
    } else {
        return
    }
}

const removeUser = (id) => {
    console.log('users ~~~~~~~~~~~');
    console.log(users);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
    console.log('users: ', users);
    console.log(id);
    console.log(users.find((user) => user.id === id));
    return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };