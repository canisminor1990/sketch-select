@import 'callback.cocoascript';
// 初始化
var selectInAllArtboards = null;
var message = null;
var fc = null;
var items = [];
// 制作选项
for (var i = 0; i < callback.length; i++){
	items[i] = callback[i].name;
};
// 弹窗
var AltDialog = function() {};
AltDialog.prototype = {
		setup: function() {
			var dialog = this.createDialog();
			if (dialog.button == 1000) {
				var i = dialog.selection;
				fc = callback[i].fc[0];
				message = callback[i].name;
				selectInAllArtboards = dialog.artboard;
			}
		},
		createDialog: function() {
			var altWin = COSAlertWindow.new();
			var selectBox = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
			var artboardBox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,250,14));
			// 选框
			selectBox.addItemsWithTitles(items);

			// selectBox.selectItemAtIndex(0);
			// 是否全局
			artboardBox.setTitle("Select in all artboards");
   			artboardBox.setButtonType(NSSwitchButton);
    		artboardBox.setState(false);
    		// 初始化窗体
			altWin.setMessageText("Sketch Select");
			altWin.setInformativeText("Select all layers with same:");
			altWin.addAccessoryView(selectBox);
    		altWin.addAccessoryView(artboardBox);
			// 按钮
			altWin.addButtonWithTitle('Select');
			altWin.addButtonWithTitle('Cancel');

			return {
				button: altWin.runModal(),
				selection: selectBox.indexOfSelectedItem(),
				artboard: artboardBox.state(),
			}
		}
	}
// onRun
var onRun = function(context) {
	var sketch = context.api()
	let { selectedLayers } = sketch.selectedDocument;
	selectedLayers.iterate(function(layer) {
		layer.remove()
		sketch.alert(layer,"log")

	})


	new AltDialog().setup();

	var selectedLayer = selection[0];
	var fill = firstVisibleFill(selectedLayer);
	var border = firstVisibleBorder(selectedLayer);
	iterateThroughLayers(context, selectedLayer, fc);
}