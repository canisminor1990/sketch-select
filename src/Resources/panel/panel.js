import React from 'react';
import pluginCall from 'sketch-module-web-view/client';
import { Button, Checkbox, Radio, Switch, Icon } from 'antd';
import Select from '../../Sketch/select';
import './index.less';
const CheckboxGroup = Checkbox.Group;
const RadioGroup    = Radio.Group;
const Options       = {
	Layers    : Object.keys(Select.Layers),
	TextLayers: Object.keys(Select.TextLayers),
	LayerTypes: Object.keys(Select.LayerTypes)
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state                      = {
			Layers            : [],
			TextLayers        : [],
			LayerType         : ['AllTypes'],
			SelectAllAtrboards: false
		};
		this.onChangeLayers             = this.onChangeLayers.bind(this);
		this.onChangeTextLayers         = this.onChangeTextLayers.bind(this);
		this.onChangeLayerTypes         = this.onChangeLayerTypes.bind(this);
		this.onChangeSelectAllAtrboards = this.onChangeSelectAllAtrboards.bind(this);
		this.onClick                    = this.onClick.bind(this);
		this.openWeb                    = this.openWeb.bind(this);
	}

	onChangeLayers(e) {
		this.setState({Layers: e});
		console.log('Layers = ', e);
	};

	onChangeTextLayers(e) {
		this.setState({TextLayers: e});
		console.log('TextLayers = ', e);
	};

	onChangeLayerTypes(e) {
		this.setState({LayerType: [e.target.value]});
		console.log('LayerType = ', [e.target.value]);
	};

	onChangeSelectAllAtrboards(e) {
		this.setState({SelectAllAtrboards: e});
		console.log('SelectAllAtrboards = ', e);
	}

	onClick() {
		let callback = {
			SelectAllAtrboards: this.state.SelectAllAtrboards,
			SelectOption      : [].concat(this.state.LayerType, this.state.Layers, this.state.TextLayers)
		};
		pluginCall('onClick', JSON.stringify(callback));
		console.log('onClick = ', callback);
	};

	openWeb() {
		let web = 'https://github.com/canisminor1990/sketch-select'
		pluginCall('openWeb', web);
		console.log('openWeb = ', web);
	}

	render() {
		return (
			<div>
				<div className="ui-banner" style={{backgroundImage: `url(../assets/banner.png)`}}/>
				<div className="ui-body">
					<div className="ui-title">Layers</div>
					<CheckboxGroup
						options={Options.Layers}
						onChange={this.onChangeLayers}
					/>
					<div className="ui-title">Text Layers</div>
					<CheckboxGroup
						options={Options.TextLayers}
						onChange={this.onChangeTextLayers}
					/>
					<div className="ui-title">Layer Types</div>
					<RadioGroup
						options={Options.LayerTypes}
						onChange={this.onChangeLayerTypes}
						defaultValue={'AllTypes'}/>
					<div className="ui-title">Option</div>
					<div className="switch-block">
						<Switch
							size="small"
							defaultChecked={false}
							onChange={this.onChangeSelectAllAtrboards}
						/>
						<span>Select in all artboards</span>
					</div>
					<br />
					<Button type="primary" size="large" onClick={this.onClick}>
						Select
					</Button>
					<div
						className="ui-footer"
						onClick={this.openWeb}
					>
						<Icon type="github"/><span>canisminor1990</span>
					</div>
				</div>
			</div>
		);
	}
}


