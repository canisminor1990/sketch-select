import pluginCall from 'sketch-module-web-view/client';
import _ from 'lodash';
import { connect } from 'dva';
import { Component } from 'react';
import { Tabs, Button, message } from 'antd';
import { Copyright, Switchbox } from '../components';
import MapSelection from './mapSelection';
import Tab from './Tab';
import Any from './Any';
import Text from './Text';
import Shape from './Shape';
import Symbol from './Symbol';
import style from './index.scss';

const TabPane = Tabs.TabPane;

class WebView extends Component {
  FootBar = () => (
    <div className={style.footbar}>
      <Switchbox title="Select in all artboards" type="global" />
      <div className={style.btnGroup}>
        <Button onClick={this.onGetBtnClick} className={style.getBtn}>
          Get Seleciton
        </Button>
        <Button onClick={this.onSelectBtnClick} type="primary" className={style.submitBtn}>
          Select
        </Button>
      </div>
      <Copyright src="https://github.com/canisminor1990/sketch-select" />
    </div>
  );

  ResetBtn = () => (
    <Button onClick={this.onReset} className={style.resetBtn} size="small" ghost>
      Reset
    </Button>
  );

  render() {
    return (
      <div className={style.view}>
        <div className={style.banner} style={{ backgroundImage: `url(banner.png)` }}>
          <this.ResetBtn />
        </div>
        <Tabs defaultActiveKey="Any" className={style.tabs} onChange={this.onTabsChange}>
          <TabPane tab="Any" key="Any">
            <Any />
          </TabPane>
          <TabPane tab="Text" key="Text">
            <Text />
          </TabPane>
          <TabPane tab="Shape" key="Shape">
            <Shape />
          </TabPane>
          <TabPane tab="Symbol" key="Symbol">
            <Symbol />
          </TabPane>
        </Tabs>
        <this.FootBar />
      </div>
    );
  }

  onReset = () => {
    this.props.reset();
    message.success(`Reset Success`);
  };

  onTabsChange = activeKey => this.props.update({ page: activeKey });

  onGetBtnClick = () => {
    pluginCall('getSelection');
    const json = localStorage.getItem('selection');
    const data = MapSelection(JSON.parse(json));
    this.props.update(data);
    this.props.update({ checkAll: false, checkedList: [data.type] }, 'layers');
    if (data.name) {
      message.success(`Select: ${data.name}`);
    } else {
      message.error(`Select a target first`);
    }
  };

  onSelectBtnClick = () => {
    const page = this.props.config.page;
    const Props = {
      Name: ['name', 'id'],
      Rect: ['x', 'y', 'width', 'height'],
      Prototyping: ['text', 'alignment', 'lineSpacing', 'fixedWidth'],
      Style: ['fillColor', 'fillType', 'borderColor', 'borderThickness'],
      Symbol: ['symbolId'],
    };
    const Page = {
      Any: {
        types: this.props.layers.checkedList,
        props: ['Name', 'Rect'],
      },
      Text: {
        types: ['Text'],
        props: ['Name', 'Rect', 'Prototyping'],
      },
      Shape: {
        types: ['Shape'],
        props: ['Name', 'Rect', 'Style'],
      },
      Symbol: {
        types: ['SymbolInstance', 'SymbolInstance'],
        props: ['Name', 'Rect', 'Symbol'],
      },
    };

    // Map props
    const propsType = Page[page].props;
    const typesArray = _.compact(Page[this.props.config.page].types);
    let pagePropsType = {};
    let pageProps = {};
    let types = {};
    let err = false;

    _.forEach(propsType, props => {
      pagePropsType[props] = Props[props];
    });

    _.forEach(pagePropsType, (props, key) => {
      _.forEach(props, type => {
        if (this.props.config[`${type}Checked`]) {
          if (this.props.config[type] !== '') {
            if (!pageProps[key]) pageProps[key] = {};
            pageProps[key][type] = this.props.config[type];
            if (type === 'text') pageProps.Prototyping.textReg = this.props.config.textRegSwitch;
          } else {
            err = type;
          }
        }
      });
    });

    if (err) return message.error(`${err} need to set`);

    _.forEach(typesArray, type => (types[type] = true));

    const data = {
      types,
      page,
      global: this.props.config.globalSwitch,
      config: pageProps,
    };

    console.log(data);

    if (
      Object.keys(data.types).length === 0 ||
      (page !== 'Any' && Object.keys(data.config).length === 0)
    ) {
      return message.error('Config is empty');
    }

    pluginCall('select', JSON.stringify(data));
  };
}

export default connect(Tab.State, Tab.Func)(WebView);
