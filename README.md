#node-webrtc2pngs

WIP

A small library that uses getUserMedia to convert some video into an array of
PNGs, and a button to post the array

##Requirements:
[browserify](http://browserify.org/)

##Installation:
`npm install node-webrtc2pngs`

##Usage
```javascript
var webrtc2pngs = require('node-webrtc2pngs');
webrtc2pngs({
  frames: 10,
  interval: 200,
  imgQuality: 0.4,
  postUrl: 'http://localhost:3000'
});
```

Then run browserify.

Here's some markup that the lib needs, at some point I can refine this...

```html
<div class="video-actions" id="record">
  <span class="recorder"></span>
  <span class="text">Record</span>
</div>
<div id="video-preview"></div>
<div class="debugger"></div>
<div class="video-actions uploader">
<span id="upload" class="text">Upload</span>
</div>
```
