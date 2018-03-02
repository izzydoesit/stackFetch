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
      this.download(selection)
    }
  },

  download(url) {
    request(url, (err, response, body) => {
      if (err) { return console.log('error:', err); }

      if (!err && response.statusCode == 200) {
        console.log('url', url);
        console.log('body', body);
      }



    })
  }
};
