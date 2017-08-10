import WebUI from 'sketch-module-web-view';
import handleSelection from './handleSelection';
export default function (context) {
	const webUI = new WebUI(context, 'panel/index.html', {
		identifier         : 'sketch-select.dialog',
		x                  : 0,
		y                  : 0,
		width              : 340,
		height             : 624,
		onlyShowCloseButton: true,
		background         : hexToNSColor('32d1ff'),
		title              : ' ',
		hideTitleBar       : false,
		shouldKeepAround   : true,
		handlers           : {
			onClick   : (callback) => {
				handleSelection(JSON.parse(callback), context);
			},
			openWeb: (url) => {
				NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
			}
		}
	});
}

function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}