import React from 'react';
import ReactDOM from'react-dom';
import pluginCall from 'sketch-module-web-view/client';
import { Button, Checkbox } from 'antd';
import { keys } from 'lodash';
import Select from '../Sketch/select';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
	console.log('checked = ', checkedValues);
}

function onClick() {
	pluginCall('onClick', 'Called from the webview');
	console.log('onClick');
}

const Options = {
	Layers     : keys(Select.Layers),
	TextLayers : keys(Select.TextLayers),
	LayerStates: keys(Select.LayerStates)
};

class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<CheckboxGroup options={Options.Layers} onChange={onChange}/>
					<br />
					<CheckboxGroup options={Options.TextLayers} onChange={onChange}/>
					<br />
					<CheckboxGroup options={Options.LayerStates} onChange={onChange}/>
				</div>

				<Button type="primary" onClick={onClick}>
					Select
				</Button>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));