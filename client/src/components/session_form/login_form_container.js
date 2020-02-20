import { connect } from 'react-redux';
import { login, clearErrors} from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
   return {
      signedIn: state.session.isAuthenticated,
      errors: state.errors,
      formType: 'LOGIN',
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      login: user => dispatch(login(user)),
      clearErrors: () => dispatch(clearErrors()),
      demoLogin: (demoUser) => dispatch(login(demoUser)).then(dispatch(closeModal())),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(LoginForm);