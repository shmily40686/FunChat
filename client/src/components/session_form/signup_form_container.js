import { connect } from 'react-redux';
import { signup, clearErrors} from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => {
   console.log(state.session.isSignedIn)
   return {
      signedIn: state.session.isSignedIn,
      errors: state.errors,
      formType: 'SIGNUP',
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      signup: user => dispatch(signup(user)),
      clearErrors: () => dispatch(clearErrors()),
      demoLogin: (demoUser) => dispatch(signup(demoUser)).then(dispatch(closeModal())),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SignupForm);