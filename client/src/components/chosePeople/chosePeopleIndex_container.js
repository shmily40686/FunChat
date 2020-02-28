import { connect } from 'react-redux';
import { receiveLanguage } from '../../actions/languages_action';


import ChosePeopleIndex from './chosePeopleIndex';


const mapDispatchToProps = dispatch => ({
    receiveLanguage: (language) => dispatch(receiveLanguage(language))
})

export default connect(null, mapDispatchToProps)(ChosePeopleIndex);