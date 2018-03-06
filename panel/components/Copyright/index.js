import { Component } from 'react';
import { Icon } from 'antd';
import pluginCall from 'sketch-module-web-view/client';
import style from './index.scss';

export default class extends Component {
  openWeb = () => {
    console.log(this.props);
    const { src } = this.props;
    pluginCall('openWeb', src);
    console.log('openWeb = ', src);
  };

  render() {
    return (
      <div className={style.footer} onClick={this.openWeb}>
        <Icon type="github" />
        <span>canisminor1990</span>
      </div>
    );
  }
}
