import { Route, Router } from 'dva/router';
import Panel from './routes';

export default ({ app, history }) => {
  history.listen(() => window.scrollTo(0, 0));
  return (
    <Router history={history}>
      <Route exact path="/" component={Panel} />
    </Router>
  );
};
