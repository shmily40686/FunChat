import { connect } from 'react-redux';
import { receiveLanguage } from '../../actions/languages_action';
import { fetchUser } from '../../actions/users_actions';


import GroupSelect from './groupSelectRoom';

const mapStateToProps = state => ({
    userId: state.session.user.id,
    user: state.users.user
})

const mapDispatchToProps = dispatch => ({
    receiveLanguage: (language) => dispatch(receiveLanguage(language)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelect);