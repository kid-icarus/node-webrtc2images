module.exports = function (options) {
  'use strict';
  // This is where we change the time lapse count
  var interval = options.interval || 2000;
  var pendingFrames = options.frames || 10;
  var type = options.type || 'image/jpeg';
  var quality = options.quality || 0.4;

  var canvas = document.createElement('canvas');
  var debugMsg = document.getElementById('debug-msg');
  var img = document.createElement('img');

  this.video;
  this.videoFrames = [];
  this.streamer;

  var self = this;

  var captureFrame = function (pendingFrames, callback) {
    canvas.getContext('2d').drawImage(self.video, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL('image/png', quality);

    var saveFrame = function () {
      pendingFrames--;

      if (debugMsg) {
        debugMsg.textContent = pendingFrames;
      }

      self.videoFrames.push(img.src);
      captureFrame(pendingFrames, callback)
    }

    if (pendingFrames > 0) {
      setTimeout(saveFrame, interval);
    } else {
      if (debugMsg) {
        debugMsg.textContent = '';
      }

      callback(true);
      self.videoFrames = [];
    }
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
