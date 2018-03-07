import Tab from '../Tab';
import { connect } from 'dva';
import { Collapse, Checkbox } from 'antd';
import style from '../index.scss';
const Panel = Collapse.Panel;

const CheckboxGroup = Checkbox.Group;

class Page extends Tab {
  // Components
  LayerTypes = () => {
    const layers = this.props.layers;
    return (
      <div>
        <div className={style.split}>
          <Checkbox
            indeterminate={layers.indeterminate}
            onChange={this.onCheckAllLayers}
            checked={layers.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <CheckboxGroup
          options={layers.options}
          value={layers.checkedList}
          onChange={this.onLayersChange}
        />
      </div>
    );
  };

  render() {
    return (
      <Collapse defaultActiveKey={['1', '2', '3']} className={style.container}>
        <Panel header="LayerTypes" key="1">
          <this.LayerTypes />
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

  // Func
  onLayersChange = list => {
    const optLength = this.props.layers.options.length;
    const length = list.length;
    const Layer = {
      checkedList: list,
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
