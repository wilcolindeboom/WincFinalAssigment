import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://9455abc5a8d240ffbe0f054ba995ae5e@o4511036974628864.ingest.de.sentry.io/4512092728459344",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
