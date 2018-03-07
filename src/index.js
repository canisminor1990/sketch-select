import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import WebUI from 'sketch-module-web-view';
import { mapLayers, selectLayers, hex2NSColor, openURL } from './utils';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export default context => {
  const document = sketch.getSelectedDocument();
  const panelID = 'sketch-select.panel';

  const panelUI = new WebUI(context, Panel, {
    identifier: panelID,
    x: 0,
    y: 0,
    width: 340,
    height: 624,
    title: 'Sketch Select',
    onlyShowCloseButton: true,
    background: hex2NSColor('32d1ff'),
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    handlers: {
      select: callback => {
        const config = JSON.parse(callback);
        let Target;
        console.log(config);
        if (config.global) {
          Target = document.selectedPage;
        } else {
          Target = document.selectedLayers.layers[0];
          Target = searchArtboard(Target);
          if (!Target) return UI.alert('🖱 Select', `Select target-artboard first ~`);
        }
        const AllLayers = mapLayers(Target, config);
        if (AllLayers.length > 0) {
          document.selectedLayers.clear();
          selectLayers(AllLayers);
          UI.message(`🖱 Selected ${AllLayers.length} Layers!`);
        } else {
          UI.alert('🖱 Select', `Nothing to select ...`);
        }
      },
      getSelection() {
        const selection = document.selectedLayers.layers[0];
        const data = JSON.stringify(selection);
        UI.message(`🖱 Select: ${selection.name} (${selection.type})`);
        console.log(data);
        panelUI.eval(`getSelection(${data})`);
      },
      openWeb: url => openURL(url),
    },
  });
};
function searchArtboard(target) {
  if (!target) return false;
  if (target.type === 'Artboard') return target;
  if (target.parent) return searchArtboard(target.parent);
  return false;
}
