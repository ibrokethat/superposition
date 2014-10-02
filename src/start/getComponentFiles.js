import * as path from 'path';
import * as fs from 'co-fs';

import {partial} from 'super-func';
import {map} from 'super-iter';

import openFile from  './openFile';

export default function * getComponentFiles (version, d, component) {

  var dir = path.resolve('src/', version, 'components', component);
  var fileNames = yield fs.readdir(dir);
  return yield map(fileNames, partial(openFile, dir));
}
