import * as path from 'path';
import * as fs from 'co-fs';

import {partial} from 'super-func';
import {map} from 'super-iter';

import openFile from  '../utils/openFile';

export default function * getComponentFiles (component_path, d, component) {

  var dir = path.resolve(component_path ,component);
  var file_names = yield fs.readdir(dir);
  return yield map(file_names, partial(openFile, dir));
}
