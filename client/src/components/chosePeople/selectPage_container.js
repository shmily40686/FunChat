import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from '../../actions/users_actions';


import SelectPage from './selectPage';

const mapStateToProps = state => ({
    userId: state.session.user.id,
    user: state.users.user,
    users: state.users.users
});

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUsers: (lag) => dispatch(fetchUsers(lag))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage);