require("jpm-addon"); // install jpm gcli helpers

const system = require('sdk/system');
const self = require('sdk/self');

const gcli = require("jpm-addon/dev/gcli");
const { env } = require("sdk/system/environment");

if (env.JPM_WATCH_ADDON_PATH && env.JPM_WATCH_ADDON_ID && env.JPM_WATCH_FILE) {
  var addon_path = env.JPM_WATCH_ADDON_PATH;
  var watched_path = env.JPM_WATCH_FILE;

  gcli.run("addon mount "+ addon_path);

  var watchFilePath = require('./watch/index.js');

  console.log("WATCH PATH", watched_path);

  watchFilePath(watched_path, env.JPM_WATCH_INTERVAL, _ => {
    gcli.run("addon reload "+ env.JPM_WATCH_ADDON_ID);
  });
} else {
  console.error("JPM WATCH is not watching to anything or is not properly configured!");
  system.exit();
}
