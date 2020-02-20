import React from 'react';
import { Provider } from 'react-redux';
import {
	AuthRoute,
	ProtectedRoute,
} from '../util/route_util';
import { Switch, Route, HashRouter } from 'react-router-dom';
import LogInFormContainer from './session_form/login_form_container'
import SignUpFormContainer from './session_form/signup_form_container'
import Home from './home/home'
import NavBarContainer from "./nav/navbar_container";
import ChosePeopleIndex from "./chosePeople/chosePeopleIndex"
import chatPageIndexContainer from './chat/chatPageIndex_container'
import Footer from './footer/footer';

const App = ({store}) => (
	<Provider store={store}>
		<HashRouter>
			<div>
				<header>
					<NavBarContainer />
				</header>
				<Switch>
					<AuthRoute exact path="/login" component={LogInFormContainer} />
					<AuthRoute exact path="/signup" component={SignUpFormContainer} />
					<ProtectedRoute path="/chosePeople" component={ChosePeopleIndex} />
					<ProtectedRoute path="/chatPage" component={chatPageIndexContainer} />
					<Route exact path="/" component={Home} />
				</Switch>
				<Footer />
			</div>
		</HashRouter>
	</Provider>
);

export default App;