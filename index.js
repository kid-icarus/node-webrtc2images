var Streamer = require('./lib/streamer');
var Recorder = require('./lib/recorder');

module.exports = function (config) {
  'use strict';
  document.createElement('canvas');
  var streamer = new Streamer(config);
  var recorder = new Recorder(config);

  var preview = document.getElementById('video-preview');

  this.startVideo = function (callback) {
    streamer.startVideo(function (err, data) {
      if (err) {
        callback(err);
      } else {
        streamer.video = data.videoElement;
        streamer.video.width = data.videoElement.width;
        streamer.video.height = data.videoElement.height;
        preview.appendChild(streamer.video);
        streamer.video.play();
        callback();
      }
    });
  };

  this.recordVideo = function (callback) {
    recorder.video = streamer.video;
    recorder.getScreenshot(function () {
      callback(null, recorder.videoFrames);
    });
  };

  this.changeCamera = function (callback) {
    preview.innerHTML = '';
    streamer.stopVideo();
    recorder.video = null;
    this.startVideo(callback);
  };
};
