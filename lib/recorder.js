var debug = require('./debug');
var defaults = require('lodash.defaults');

module.exports = function (options) {
  'use strict';
  this.videoFrames = [];

  defaults(options, {
    type: 'image/jpeg',
    frames: 10,
    interval: 200,
    quality: 0.4,
  });

  // This is where we change the time lapse count
  var interval = options.interval;
  var pendingFrames = options.frames;
  var type = options.type;
  var quality = options.quality;

  var canvas = document.createElement('canvas');
  var img = document.createElement('img');
  var self = this;

  var captureFrame = function (pendingFrames, callback) {
    canvas.getContext('2d')
    .drawImage(self.video, 0, 0, canvas.width, canvas.height);

    img.src = canvas.toDataURL(type, quality);

    var saveFrame = function () {
      pendingFrames--;
      debug(pendingFrames);
      self.videoFrames.push(img.src);
      captureFrame(pendingFrames, callback);
    };

    if (pendingFrames > 0) {
      setTimeout(saveFrame, interval);
      return;
    }

    debug('');
    callback(true);
    self.videoFrames = [];
  };

  this.getScreenshot = function (callback) {
    this.videoFrames = [];
    if (this.video) {
      canvas.width = this.video.width;
      canvas.height = this.video.height;
      captureFrame(pendingFrames, callback);
    }
  };
};
