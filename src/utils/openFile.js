//  imports from cjs modules
import * as path from 'path';
import * as fs from 'co-fs';

export default function * openFile (dir, file_name) {

  var file_path = path.join(dir, file_name);

  return {
    fileName: file_name,
    content: yield fs.readFile(file_path, 'utf8')
  };
}
