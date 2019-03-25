// Copied from https://github.com/leecade/react-native-swiper/blob/3f688747264a09f8fd9893037912d4c838cceeb2/examples/scripts/watch-and-copy-src.js

const fs = require('fs-extra');
const watch = require('node-watch');
const rimraf = require('rimraf');

function copyAndWatch(source, destination) {
  console.log(`Cleaning "${destination}"`);
  rimraf(`${destination}/../node_modules`, () => {
    rimraf(`${destination}/../example`, () => {
      rimraf(destination, () => {
        console.log(`Copying "${source}" to "${destination}"`);
        fs.copy(source, destination, (err) => {
          if (err) console.error(err);
        });

        console.log(`Watching "${source}"`);
        watch(source, { recursive: true }, (event, filename) => {
          const localPath = filename.split(source).pop();
          const destinationPath = `${destination}${localPath}`;
          console.log(`Copying "${filename}" to "${destinationPath}"`);
          fs.copy(filename, destinationPath, (err) => {
            if (err) console.error(err);
          });
        });
      });
    });
  });
}

copyAndWatch(
  '../src',
  'node_modules/@okgrow/react-native-copilot/src',
);
