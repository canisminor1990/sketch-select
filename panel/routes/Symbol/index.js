import Tab from '../Tab';
import { connect } from 'dva';
import { Collapse } from 'antd';
import { Selection } from '../../components';
import style from '../index.scss';
const Panel = Collapse.Panel;

class Page extends Tab {
  // Components
  Symbol = () => (
    <div>
      <Selection title="Symbol ID" type="symbolId" />
    </div>
  );

  render() {
    return (
      <Collapse defaultActiveKey={['1', '2', '3']} className={style.container}>
        <Panel header="Symbol" key="1">
          <this.Symbol />
        </Panel>
        <Panel header="Name" key="2">
          <this.Name />
        </Panel>
        <Panel header="Rectangle" key="3">
          <this.Rectangle />
        </Panel>
      </Collapse>
    );
  }
}

export default connect(Tab.State, Tab.Func)(Page);
