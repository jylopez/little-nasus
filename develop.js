'use strict';

/**
 * Starts `nodemon` and `browser-sync`
 */

const path = require('path');
const fs = require('fs');
const nodemon = require('nodemon');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const sass = require('node-sass');
const watch = require('node-watch');

const SRCDIR = path.normalize(`${__dirname}/src`);
const BUILDDIR = path.normalize(`${__dirname}/public`);

let browserSyncInitialized = true;

nodemon({
  script: `${__dirname}/server.js`,
  watch: `${SRCDIR}/controllers`,
  ext: 'js,jsx,jade'
});

let b = browserify({
  cache: {},
  packageCache: {},
  plugin: [watchify],
  entries: [
    `${SRCDIR}/js/bundles/NasBundle.js`
  ]
})
  .transform('babelify', {
    presets: ['es2015', 'react']
  });

let bundle = function () {
  b.bundle()
    .on('error', function (err) {
      console.error(`BROWSERIFY ERROR: ${err.message}`);
      console.error(err.stack);
      this.emit('end');
    })
    .pipe(fs.createWriteStream(`${BUILDDIR}/js/NasBundle.js`))
};

b.on('update', bundle);
b.on('log', console.log);
bundle();

watch(`${SRCDIR}/css`, function () {
  const OUTFILE = `${BUILDDIR}/css/root-nas.css`;
  sass.render({
    file: `${SRCDIR}/css/root-nas.scss`,
    outFile: OUTFILE
  }, function (err, result) {
    if (err) {
      console.error(`SASS ERROR: [Line ${err.line}] ${err.message}`);
      return;
    }
    console.log('SASS RENDERED: ', result.stats);
    fs.writeFile(OUTFILE, result.css, 'utf8', function (err) {
      if (err) console.error('SASS ERROR: Failed to write file');
      console.log(`SASS Wrote to ${OUTFILE}`);
    });
  });
});

nodemon
  .on('start', function () {
    console.log('Nodemon started');
    if (!browserSyncInitialized) {
      browserSync.init({
        proxy: 'http://localhost:8000',
        port: '3000',
        notify: true,
        files: [
          `${BUILDDIR}/**/*`
        ]
      });
      browserSyncInitialized = true;
    } else {
      setTimeout(browserSync.reload, 500);
    }
  })
  .on('quit', function () {
    console.log('Nodemon stopped');
    process.exit(0);
  })
  .on('restart', function (files) {
    console.log('Nodemon restarted');
  });