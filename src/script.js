import Dialog from './dialog';
//import Select from './select';
var selectMethod = [
	{
		name: 'All',
		fn  : (layer, configLayer) => {
			layer.addToSelection();
		}
	}
];

export default function (context) {
	let sketch    = context.api();
	let document  = sketch.selectedDocument;
	let selection = document.selectedLayers;
	//let page = document.selectedPage;
	let count     = 0;

	selection.iterate(layer => {
		if (count > 0) return;
		selection.clear();
		let dialog = Dialog.create(selectMethod);
		if (dialog.button === 1000) {
			let i              = dialog.selection;
			let selectConfig   = {
				name                : selectMethod[i].name,
				fn                  : selectMethod[i].fn,
				selectInAllArtboards: dialog.artboard
			};
			let parentArtboard = (!selectConfig.selectInAllArtboards)
				? selectParentArtboard(layer)
				: selectAllArtboard(layer);

			selectSubElement(parentArtboard, layer, selectConfig.fn);
		}
		count++;
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