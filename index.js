var Streamer = require('./lib/streamer');
var Recorder = require('./lib/recorder');

module.exports = function(config) {
  'use strict';
  var canvas = document.createElement('canvas');
  var streamer = new Streamer();
  var recorder = new Recorder(config.frames, config.interval, config.imgQuality);

  var preview = document.getElementById('video-preview');
  var previewEl = document.querySelectorAll('.previews');
  var record = document.getElementById('record');
  var upload = document.getElementById('upload');
  var uploadXHR = new XMLHttpRequest();
  var debugMsg = document.getElementById('debug-msg');

  streamer.startVideo(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      streamer.video = data.videoElement;
      streamer.video.width = data.videoElement.width;
      streamer.video.height = data.videoElement.height;
      preview.appendChild(streamer.video);
      streamer.video.play();
    }
  });

  record.addEventListener('click', function (ev) {
    ev.preventDefault();
    var self = this;

    previewEl.innerHTML = '';
    self.classList.add('on');
    recorder.video = streamer.video;
    recorder.getScreenshot(function () {
      self.classList.remove('on');
    });
  });

  var uploadDone = function() {
    if (uploadXHR.readyState === 4) {
      if (uploadXHR.status === 200) {
        debugMsg.textContent = 'Upload successful!';
      } else {
        debugMsg.textContent = uploadXHR.responseText;
      }
    }
  };

  upload.addEventListener('click', function(ev) {
    if (recorder.videoFrames.length < 1) {
      return;
    }
    uploadXHR.onreadystatechange = uploadDone;
    uploadXHR.open('POST', config.postUrl);
    uploadXHR.setRequestHeader('Content-Type', 'application/json');
    uploadXHR.send(JSON.stringify(recorder.videoFrames));
  });

}
