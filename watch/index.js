const {Cu, Cc, Ci} = require("chrome");
const {ChromeWorker} = Cu.import("resource://gre/modules/Services.jsm", null);

let watchFilePathWorker;

function watchFilePath(file_path, interval, cb) {
  var baseURI = module.uri.replace("/index.js", "");

  console.debug("CREATE NEW CHROME WORKER: ", baseURI + '/watchFilePathWorker.js');
  watchFilePathWorker = new ChromeWorker(baseURI + '/watchFilePathWorker.js');
  watchFilePathWorker.onerror = function(event){
    console.error("WatchFilePathWorker ERROR", event);
  };
  watchFilePathWorker.addEventListener("message", (evt) => {
    console.debug("WATCH XPI WORKER", evt);
    let { type } = evt.data;
    if (type === "updatedFilePath") {
      cb.call(null);
    }
  });

  watchFilePathWorker.postMessage({
    type: "watchFilePath",
    args: [file_path, interval]
  });
}

module.exports = watchFilePath;
