'use babel';

import { CompositeDisposable } from 'atom';

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

  serialize() {
    return {
      stackFetchViewState: this.stackFetchView.serialize()
    };
  },

  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
