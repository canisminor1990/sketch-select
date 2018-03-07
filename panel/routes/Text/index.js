import Tab from '../Tab';
import { connect } from 'dva';
import { Collapse } from 'antd';
import { Selection, Switchbox } from '../../components';
import style from '../index.scss';
const Panel = Collapse.Panel;

class Page extends Tab {
  // Components

  Content = () => (
    <div>
      <Selection title="Text" type="text" />
      <Switchbox title="Use Regex" type="textReg" />
    </div>
  );

  Prototyping = () => (
    <div>
      <Selection title="Alignment" type="alignment" />
      <Selection title="Line Spacing" type="lineSpacing" />
      <Selection title="Fixed Width" type="fixedWidth" />
    </div>
  );

  render() {
    return (
      <Collapse defaultActiveKey={['1', '2', '3', '4']} className={style.container}>
        <Panel header="TextContent" key="1">
          <this.Content />
        </Panel>
        <Panel header="Prototyping" key="2">
          <this.Prototyping />
        </Panel>
        <Panel header="Name" key="3">
          <this.Name />
        </Panel>
        <Panel header="Rectangle" key="4">
          <this.Rectangle />
        </Panel>
      </Collapse>
    );
  }
}

export default connect(Tab.State, Tab.Func)(Page);
