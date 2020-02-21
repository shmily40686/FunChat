import { connect } from 'react-redux';
// import { logout, login } from '../../actions/session_actions';


import Home from './home';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated || state.session.isSignedIn,
});

// const mapDispatchToProps = dispatch => ({
//     logout: () => dispatch(logout()),
//     demoLogin: (demoUser) => dispatch(login(demoUser)),

// })

export default connect(mapStateToProps, null)(Home);