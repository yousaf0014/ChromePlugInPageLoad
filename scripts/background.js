'use strict';
//https://stackoverflow.com/questions/29560319/full-screen-on-multiple-monitors-with-chrome-apps

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;

  chrome.app.window.create('chrome.html', {
    //frame: 'chrome',
    frame: 'none',
    id: 'infoscreen',
    state: 'fullscreen',
    //resizable: false,
    minWidth: screenWidth,
    minHeight: screenHeight
  });

});