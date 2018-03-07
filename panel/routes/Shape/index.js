import Tab from '../Tab';
import { connect } from 'dva';
import { Collapse } from 'antd';
import style from '../index.scss';
const Panel = Collapse.Panel;

class Page extends Tab {
  // Components

  render() {
    return (
      <Collapse defaultActiveKey={['1', '2', '3']} className={style.container}>
        <Panel header="Style" key="1">
          <this.Style />
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
