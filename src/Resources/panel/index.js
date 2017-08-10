import dva from 'dva';
import { Router, Route } from 'dva/router';
import IndexPage from './interface';
import './index.html';
const app = dva();
app.router(({history}) => {
	return (
		<Router history={history}>
			<Route path="/" component={IndexPage}/>
		</Router>
	);
});
app.start('#root');