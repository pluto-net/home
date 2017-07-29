import * as fs from 'fs-extra';

export default function recordGitTag(NEW_TAG) {
  return new Promise((resolve, reject) => {
    fs.outputFile('tmp/version', NEW_TAG, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve();
    });
  });
}
