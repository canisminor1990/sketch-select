import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import router from './router';

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Router
app.router(router);

// 4. Start
app.start('#root');
