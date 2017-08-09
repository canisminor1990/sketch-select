import React from 'react';
import ReactDOM from'react-dom';
import pluginCall from 'sketch-module-web-view/client';
import { Button, Checkbox, Radio } from 'antd';
import { keys,indexOf } from 'lodash';
import Select from '../Sketch/select';
const CheckboxGroup = Checkbox.Group;
const RadioGroup    = Radio.Group;

let callback = {
	select   : ["All"],
	layerType: 'All'
};

function onChangeCheckbox(e) {
	callback.select = e;
	console.log('Checkbox = ', callback.select);
	if (e.indexOf('All')) {

	}
}

function onChangeRadio(e) {
	callback.layerType = e.target.value;
	console.log('Radio = ', callback.layerType);
}

function onClick() {
	pluginCall('onClick', JSON.stringify(callback));
	console.log('onClick = ', callback);
}

const Options = {
	All       : keys(Select.All),
	Layers    : keys(Select.Layers),
	TextLayers: keys(Select.TextLayers),
	LayerTypes: keys(Select.LayerTypes)
};

class App extends React.Component {
	state = {
		disabled: false,
	};
	render() {
		return (
			<div>
				<div className="banner"/>
				<div>
					<CheckboxGroup options={Options.All} onChange={onChangeCheckbox}/>
					<h3>Layers</h3>
					<CheckboxGroup options={Options.Layers} onChange={onChangeCheckbox} disabled={this.state.disabled}/>
					<h3>Text Layers</h3>
					<CheckboxGroup options={Options.TextLayers} onChange={onChangeCheckbox} disabled={this.state.disabled}/>
					<h3>Layer Types</h3>
					<RadioGroup options={Options.LayerTypes} onChange={onChangeRadio} defaultValue={'All'}/>
				</div>
				<br />
				<Button type="primary" size="large" onClick={onClick}>
					Select
				</Button>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));