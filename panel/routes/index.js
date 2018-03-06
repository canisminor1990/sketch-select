import pluginCall from 'sketch-module-web-view/client';
import { Component } from 'react';
import { Tabs } from 'antd';
import Any from './Any';
import Text from './Text';
import Shape from './Shape';
import Img from './Img';
import Symbol from './Symbol';
import style from './index.scss';

const TabPane = Tabs.TabPane;

export default class extends Component {
  render() {
    return (
      <div>
        <div className={style.banner} />
        <Tabs defaultActiveKey="1" className={style.tabs}>
          <TabPane tab="Any" key="1">
            <Any />
          </TabPane>
          <TabPane tab="Text" key="2">
            <Text />
          </TabPane>
          <TabPane tab="Shape" key="3">
            <Shape />
          </TabPane>
          <TabPane tab="Img" key="4">
            <Img />
          </TabPane>
          <TabPane tab="Symbol" key="5">
            <Symbol />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
