//  imports from cjs modules
import * as path from 'path';
import * as fs from 'co-fs';

export default function * openFile (dir, fileName) {

  var filePath = path.join(dir, fileName);

  return {
    fileName: fileName,
    content: yield fs.readFile(filePath, 'utf8')
  };
}
