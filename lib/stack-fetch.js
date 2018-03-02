'use babel';

import StackFetchView from './stack-fetch-view';
import { CompositeDisposable } from 'atom';

export default {

  stackFetchView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.stackFetchView = new StackFetchView(state.stackFetchViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.stackFetchView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stack-fetch:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.stackFetchView.destroy();
  },

  serialize() {
    return {
      stackFetchViewState: this.stackFetchView.serialize()
    };
  },

  toggle() {
    console.log('StackFetch was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
