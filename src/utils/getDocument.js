import * as path from 'path';
import * as CONF from 'config';

import {jsdom} from 'jsdom';

import openFile from  './openFile';

var index;

export default function * getDocument () {

  try {

    return document;
  }
  catch (e) {

    var index = index || (yield openFile(path.resolve(CONF.files.static), 'index.html')).content;

    return jsdom(index);
  }
}
