export default {
	create        : (callback) => {
		var items = [];
		for (var i = 0; i < callback.length; i++) {
			items[i] = callback[i].name;
		}
		;
		var dialog      = COSAlertWindow.new();
		var selectBox   = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
		var artboardBox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 250, 14));
		// 选框
		selectBox.addItemsWithTitles(items);
		// selectBox.selectItemAtIndex(0);
		// 是否全局
		artboardBox.setTitle('Select in all artboards');
		artboardBox.setButtonType(NSSwitchButton);
		artboardBox.setState(false);
		// 初始化窗体
		dialog.setMessageText('Sketch Select');
		dialog.setInformativeText('Select all layers with same:');
		dialog.addAccessoryView(selectBox);
		dialog.addAccessoryView(artboardBox);
		// 按钮
		dialog.addButtonWithTitle('Select');
		dialog.addButtonWithTitle('Cancel');

		return {
			button   : dialog.runModal(),
			selection: selectBox.indexOfSelectedItem(),
			artboard : artboardBox.state()
		};
	},
	handleResponse: (dialog, responseCode, callback) => {
		if (responseCode == '1000') {
			var i = dialog.selection;
			return {
				fc                  : callback[i].fc[0],
				message             : callback[i].name,
				selectInAllArtboards: dialog.artboard
			};
		}
		return null;
	}
};