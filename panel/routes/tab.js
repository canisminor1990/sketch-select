import { Component } from 'react';
import { Switch, Button, Checkbox, Input } from 'antd';
import { Copyright } from '../components';
import style from './index.scss';

class Tab extends Component {
  // Components

  Selection = ({ title, type }) => {
    return (
      <Checkbox
        className={style.selection}
        checked={this.props.config[`${type}Checked`]}
        onChange={e => this.onCheck(e, type)}
      >
        <Input
          addonBefore={title}
          value={this.props.config[type]}
          onChange={e => this.onInputChange(e, type)}
        />
      </Checkbox>
    );
  };

  Switchbox = ({ title, type }) => (
    <div className={style.globalSwitch}>
      <Switch
        checked={this.props.config[`${type}Switch`]}
        size="small"
        onChange={e => this.onSwitch(e, type)}
      />
      <span>{title}</span>
    </div>
  );

  // Global Switch
  SelectBtn = () => (
    <Button onClick={this.onSelectBtnClick} type="primary" className={style.submitBtn}>
      Select
    </Button>
  );
  onSelectBtnClick = () => {
    console.log('SelectBtn');
  };

  // FootBar
  FootBar = () => (
    <div className={style.footbar}>
      <this.Switchbox title="Select in all artboards" type="global" />
      <this.SelectBtn />
      <Copyright src="https://github.com/canisminor1990/sketch-select" />
    </div>
  );

  // Func
  onCheck = (e, type) => {
    const checked = e.target.checked;
    this.props.update({ [`${type}Checked`]: checked }, 'config');
  };
  onSwitch = (checked, type) => {
    this.props.update({ [`${type}Switch`]: checked }, 'config');
  };
  onInputChange = (e, type) => {
    const value = e.target.value;
    this.props.update({ [type]: value }, 'config');
  };
}

Tab.State = state => ({
  ...state,
});

Tab.Func = dispatch => ({
  update(data, type = 'config') {
    dispatch({ type: `${type}/update`, payload: data });
  },
});

export default Tab;
