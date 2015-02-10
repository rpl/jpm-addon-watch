importScripts("resource://gre/modules/osfile.jsm");

self.onmessage = function(evt) {
  let { type } = evt.data;

  if (typeof self[type] === "function") {
    self[type].apply(self, evt.data.args);
  }
};

var mtimeXPI = null;

function watchFilePath(xpiPath, interval) {
  setInterval(mtimeCheckSync.bind(self, xpiPath), interval || 5000);
}

function mtimeCheckSync(xpiPath) {
  let fstat = OS.File.stat(xpiPath);
  if (!mtimeXPI) {
    mtimeXPI = fstat.lastModificationDate;
  } else {
    if (mtimeXPI < fstat.lastModificationDate) {
      mtimeXPI = fstat.lastModificationDate;
      self.postMessage({type: "updatedFilePath"});
    }
  }
}

//self.onerror = function() {};
