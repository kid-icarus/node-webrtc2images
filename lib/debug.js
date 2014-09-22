module.exports = function(msg) {
  var debugMsg = document.getElementById('debug-msg');
  if (debugMsg) {
    debugMsg.textContent = msg;
  }
};
