import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/users_actions';


import chatPageIndex from './chatPageIndex';

const mapStateToProps = state => ({
    userId: state.session.user.id,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUsers: (languages) => dispatch(fetchUsers(languages))
})

export default connect(mapStateToProps, mapDispatchToProps)(chatPageIndex);