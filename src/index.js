import sketch from 'sketch/dom';
import WebUI from 'sketch-module-web-view';
import { mapLayers, selectLayers, hex2NSColor, openURL } from './utils';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export default context => {
  // const Document = sketch.getSelectedDocument()
  const document = sketch.getDocuments()[0];
  const page = document.selectedPage;
  const selection = document.selectedLayers;
  const AllLayers = mapLayers(page, { Shape: true });

  const webUI = new WebUI(context, Panel, {
    identifier: 'sketch-select.dialog',
    x: 0,
    y: 0,
    width: 340,
    height: 624,
    onlyShowCloseButton: true,
    background: hex2NSColor('32d1ff'),
    title: ' ',
    hideTitleBar: false,
    shouldKeepAround: true,
    handlers: {
      onClick: callback => {
        // handleSelection(JSON.parse(callback), context);
        console.log(1);
      },
      openWeb: url => openURL(url),
    },
  });

  // selectLayers(AllLayers.filter);
};
