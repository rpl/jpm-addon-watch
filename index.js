require("jpm-addon"); // install jpm gcli helpers

const self = require('sdk/self');

const gcli = require("jpm-addon/dev/gcli");
const { env } = require("sdk/system/environment");

console.log("ENV", env);

if (env.WATCH_ADDON_PATH && env.WATCH_ADDON_ID) {
  var addon_path = env.WATCH_ADDON_PATH;

  gcli.run("addon mount "+ addon_path);

  var watchFilePath = require('./watch/index.js');
  console.log("WATCH FILE PATH", watchFilePath);
  watchFilePath(addon_path, env.WATCH_INTERVAL, _ => {
    gcli.run("addon reload "+ env.WATCH_ADDON_ID);
  });
}
