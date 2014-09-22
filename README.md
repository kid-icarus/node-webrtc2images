#node-webrtc2images
[![view on
requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=19dd242b84bf978c870e)

WIP

A small library that uses getUserMedia to convert some video into an array of base64 encoded images

##Requirements:
[browserify](http://browserify.org/)

##Installation:
`npm install webrtc2images`

###options
Type: `Object`

Options to pass webrtc2images

####options.frames:
Type: `Number`
Default: `10`

The number of frames to capture.

####options.type:
Type: `String`
Default: `image/jpeg`

The mime type of the image you'd like.

####options.quality:
Type `Number`
Default: `0.4`

A number between 0 and 1 representing the quality of the image. Note, this only
works for the `image/jpeg` and `image/webp` filetypes.

####options.interval:
Type: `Number`
Default: `200`

The time between still captures (in milliseconds).

###function (err, frames) { .. }

Callback to be called after after images have been captured

##API

###Webrtc2images.startVideo

Initiates video streaming

###Webrtc2images.recordVideo

Captures video into an array

##Example
```javascript
var Webrtc2images = require('webrtc2images');
var rtc2images = new Webrtc2images({
  frames: 10,
  type: 'image/jpeg',
  quality: 0.4,
  interval: 200
}, function(err, frames) {
  if (err) {
    console.log(err)
  } else {
    console.log(frames)
  }
});

rtc2images.startVideo();

var recordBtn = document.getElementById('record');
recordBtn.addEventListener('click', function (ev) {
  ev.preventDefault();
  rtc2images.recordVideo(function (err, frames) {
    if (err) {
      console.log(err);
    } else {
      console.log(frames);
    }
  });
});
```

Here's some markup that the lib needs, at some point I can refine this...

```html
<div class="video-actions" id="record">
  <span class="recorder"></span> <span class="text">Record</span>
</div>
<div id="video-preview"></div>
<div class="debugger">
  <p id="debug-msg">
</div>
```
