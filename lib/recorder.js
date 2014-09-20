module.exports = function (pendingFrames, interval, imgQuality) {
  'use strict';
  // This is where we change the time lapse count
  interval = interval || 2000;
  imgQuality = imgQuality || 0.4;
  pendingFrames = pendingFrames || 10;
  var canvas = document.createElement('canvas');
  var previews = document.querySelectorAll('.previews');
  var text = document.querySelector('#record .text');

  var debug = document.querySelector('.debugger');
  debug.innerHTML = '<p id="debug-msg"></p>';
  var debugMsg = document.getElementById('debug-msg');
  var img = document.createElement('img');

  this.video;
  this.videoFrames = [];
  this.streamer;

  var self = this;

  var captureFrame = function (pendingFrames, callback) {
    canvas.getContext('2d').drawImage(self.video, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL('image/png', imgQuality);

    var saveFrame = function() {
      pendingFrames--;
      debugMsg.textContent = pendingFrames + 'frames remaining';
      self.videoFrames.push(img.src);
      captureFrame(pendingFrames, callback)
    }

    if (pendingFrames > 0) {
      setTimeout(saveFrame, interval);
    } else {
      text.textContent = 'Record';
      callback(true);
    }
  };

  this.getScreenshot = function (callback) {
    this.videoFrames = [];
    debugMsg.textContent = 'start recording';
    if (this.video) {
      canvas.width = this.video.width;
      canvas.height = this.video.height;
      text.textContent = 'Recording...';
      captureFrame(pendingFrames, callback);
    }
  };
};
