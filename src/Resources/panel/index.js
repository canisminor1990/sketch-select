import dva from 'dva';
import { Router, Route } from 'dva/router';
import Panel from './panel';
import './index.html';
const app = dva();
app.router(({history}) => {
	return (
		<Router history={history}>
			<Route path="/" component={Panel}/>
		</Router>
	);
});
app.start('#root');