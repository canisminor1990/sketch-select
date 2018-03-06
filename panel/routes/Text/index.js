import Tab from '../tab';
import { connect } from 'dva';
import { Collapse, Checkbox } from 'antd';
import style from '../index.scss';
const Panel = Collapse.Panel;

const CheckboxGroup = Checkbox.Group;

class Page extends Tab {
  // Components

  Content = () => (
    <div>
      <this.Selection title="Content" type="content" />
      <this.Switchbox title="Use Regex" type="contentReg" />
    </div>
  );

  Prototyping = () => (
    <div>
      <this.Selection title="Content" type="content" />
      <this.Switchbox title="Use Regex" type="textReg" />
    </div>
  );

  render() {
    return (
      <div className={style.page}>
        <Collapse defaultActiveKey={['1']} className={style.container}>
          <Panel header="TextContent" key="1">
            <this.Content />
          </Panel>
          <Panel header="Prototyping" key="2">
            <this.Prototyping />
          </Panel>
        </Collapse>

        <this.FootBar />
      </div>
    );
  }

  // Func
  onLayersChange = checkedList => {
    const optLength = this.props.layers.options.length;
    const length = checkedList.length;
    const Layer = {
      checkedList,
      indeterminate: !!length && length < optLength,
      checkAll: length === optLength,
    };
    this.props.update(Layer, 'layers');
  };
  onCheckAllLayers = e => {
    const checked = e.target.checked;
    const options = this.props.layers.options;
    const Layer = {
      checkedList: checked ? options : [],
      indeterminate: false,
      checkAll: checked,
    };
    this.props.update(Layer, 'layers');
  };
}

export default connect(Tab.State, Tab.Func)(Page);
