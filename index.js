var Streamer = require('./lib/streamer');
var Recorder = require('./lib/recorder');

module.exports = function(config, callback) {
  'use strict';
  var canvas = document.createElement('canvas');
  var streamer = new Streamer();
  var recorder = new Recorder(config);

  var preview = document.getElementById('video-preview');
  var previewEl = document.querySelectorAll('.previews');
  var record = document.getElementById('record');

  this.startVideo = function() {
    streamer.startVideo(function (err, data) {
      if (err) {
        callback(err);
      } else {
        streamer.video = data.videoElement;
        streamer.video.width = data.videoElement.width;
        streamer.video.height = data.videoElement.height;
        preview.appendChild(streamer.video);
        streamer.video.play();
      }
    });
  };

  this.recordVideo = function() {
    previewEl.innerHTML = '';
    recorder.video = streamer.video;
    recorder.getScreenshot(function () {
      callback(null, recorder.videoFrames);
      record.classList.remove('on');
    });
  }
}
