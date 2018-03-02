'use babel';

import { CompositeDisposable } from 'atom';
import request from 'request';
import cheerio from 'cheerio';
import google from 'google';
google.resultsPerPage = 1;

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
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log(selection)
      this.download(selection).then((html) => {
        let answer = self.scrape(html);
        if (answer === '') {
          atom.notifications.addWarning('No answer found :(')
        } else {
          editor.insertText(answer);
        }
      }).catch((error) => {
        console.log(error);
        atom.notifications.addWarning(error.reason);
      })
    }
  },

  search(query, language) {
    return new Promise((resolve, reject) => {
      request('google.com', (error, response, body) => {

      })
    })
  },

  scrape(html) {
    $ = cheerio.load(html);
    return $('div.accepted-answer pre code').text();
  },

  download(url) {
    return new Promise((resolve, reject) => {
      let searchString = `${query} in ${language} site:stackoverflow.com`

      google(searchString, (error, response) => {
        if (err) {
          reject({
            reason: 'A search error has occured :('
          })
        } else if (response.links.length === 0){
          reject({
            reason: 'No results found :('
          })
        } else {
          resolve(response.links[0].href)
        }
      }
    })
  }

};
