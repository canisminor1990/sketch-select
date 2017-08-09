import WebUI from 'sketch-module-web-view';

export default function (context) {
	const webUI = new WebUI(context, 'index.html', {
		identifier         : 'sketch-select.dialog',
		x                  : 0,
		y                  : 0,
		width              : 340,
		height             : 574,
		onlyShowCloseButton: true,
		background         : hexToNSColor('32d1ff'),
		title              : ' ',
		hideTitleBar       : false,
		shouldKeepAround   : true,
		handlers           : {
			onClick: (s) => {
				context.document.showMessage(s);

				let sketch    = context.api();
				let document  = sketch.selectedDocument;
				let selection = document.selectedLayers;
				let count     = 0;

				selection.iterate(layer => {
					if (count > 0) return;
					selection.clear();
					let i              = dialog.selection;
					let selectConfig   = {
						fn                  : selectMethod[i].fn,
						selectInAllArtboards: dialog.artboard
					};
					let parentArtboard = (!selectConfig.selectInAllArtboards)
						? selectParentArtboard(layer)
						: selectAllArtboard(layer);
					selectSubElement(parentArtboard, layer, selectConfig.fn);
					count++;
				});
			}
		}
	});
}

function selectParentArtboard(layer) {
	let artboard = layer.container;
	if (artboard.isArtboard === false) {
		return selectParentArtboard(artboard);
	}
	return artboard;
}

function selectAllArtboard(layer) {
	let artboard = layer.container;
	if (artboard.isPage === false) {
		return selectAllArtboard(artboard);
	}
	return artboard;
}

function selectSubElement(group, configLayer, fn) {
	if (group.isGroup || group.isArtboard) {
		group.iterate(layer => {
			selectSubElement(layer, configLayer, fn);
		});
	} else {
		fn(group, configLayer);
	}
}

function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}