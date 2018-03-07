import { Switch } from 'antd';
import { connect } from 'dva';
import style from './index.scss';

const State = ({ config }) => ({ config });

const Switchbox = ({ dispatch, config, title, type }) => {
  const update = (data, type = 'config') => {
    dispatch({ type: `${type}/update`, payload: data });
  };
  const onSwitch = (checked, type) => {
    update({ [`${type}Switch`]: checked }, 'config');
  };

  return (
    <div className={style.globalSwitch}>
      <Switch checked={config[`${type}Switch`]} size="small" onChange={e => onSwitch(e, type)} />
      <span>{title}</span>
    </div>
  );
};

export default connect(State)(Switchbox);
