import { Component } from 'react';
import { Switchbox, Selection } from '../../components';

class Tab extends Component {
  // Components

  Name = () => {
    return (
      <div>
        <Selection title="Name" type="name" />
        <Selection title="ID" type="id" />
      </div>
    );
  };

  Rectangle = () => {
    return (
      <div>
        <Selection title="X" type="x" />
        <Selection title="Y" type="y" />
        <Selection title="Width" type="width" />
        <Selection title="Height" type="height" />
      </div>
    );
  };

  Style = () => {
    return (
      <div>
        <Selection title="FillColor" type="fillColor" />
        <Selection title="FillType" type="fillType" />
        <Selection title="BorderColor" type="borderColor" />
        <Selection title="Thickness" type="borderThickness" />
      </div>
    );
  };

  Other = () => {
    return (
      <div>
        <Switchbox title="Exportable Layer" type="exportable" />
        <Switchbox title="Hidden Layer" type="hide" />
        <Switchbox title="Locked Layder" type="lock" />
      </div>
    );
  };
}

Tab.State = state => ({
  ...state,
});

Tab.Func = dispatch => ({
  update(data, type = 'config') {
    dispatch({ type: `${type}/update`, payload: data });
  },
  reset() {
    dispatch({ type: `config/reset` });
    dispatch({ type: `layers/reset` });
  },
});

export default Tab;
