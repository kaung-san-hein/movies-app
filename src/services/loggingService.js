import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://1b7c2f777e3c45f88809df4b29fa4088@sentry.io/1784674"
  });
}
function log(error) {
  Sentry.captureException(error);
}
export default {
  init,
  log
};
