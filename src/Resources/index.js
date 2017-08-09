import React from 'react';
import ReactDOM from'react-dom';
import pluginCall from 'sketch-module-web-view/client';
import { Button, Checkbox, Radio, Switch } from 'antd';
import Select from '../Sketch/select';
const CheckboxGroup = Checkbox.Group;
const RadioGroup    = Radio.Group;
const Options       = {
	Layers    : Object.keys(Select.Layers),
	TextLayers: Object.keys(Select.TextLayers),
	LayerTypes: Object.keys(Select.LayerTypes)
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state                      = {
			Layers            : [],
			TextLayers        : [],
			LayerType         : ['AllTypes'],
			SelectAllAtrboards: false,
		};
		this.onChangeLayers             = this.onChangeLayers.bind(this);
		this.onChangeTextLayers         = this.onChangeTextLayers.bind(this);
		this.onChangeLayerTypes         = this.onChangeLayerTypes.bind(this);
		this.onChangeSelectAllAtrboards = this.onChangeSelectAllAtrboards.bind(this);
		this.onClick                    = this.onClick.bind(this);
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

	render() {
		return (
			<div>
				<div className="banner"/>
				<div>
					<h3>Layers</h3>
					<CheckboxGroup
						options={Options.Layers}
						onChange={this.onChangeLayers}
					/>
					<h3>Text Layers</h3>
					<CheckboxGroup
						options={Options.TextLayers}
						onChange={this.onChangeTextLayers}
					/>
					<h3>Layer Types</h3>
					<RadioGroup
						options={Options.LayerTypes}
						onChange={this.onChangeLayerTypes}
						defaultValue={'AllTypes'}/>
				</div>
				<h3>Option</h3>
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
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
