'use babel';

import { CompositeDisposable } from 'atom';
import request from 'request';

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stack-fetch:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log(selection)
    }
  }
};
