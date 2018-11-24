'use strict'

const app = require('./controllers/index');
const config = require('./config/config');
console.log(config.host);
console.log(`*----Server is starting-----*`);


app.listen(config.port, config.host, function (error) {
  if (error) {
    log.error(
      `Unable to start Server, please check connections`
       )
    process.exit(10);
  }
  console.log(
    `Server is listening on http://${config.host}:${config.port}`
  );
})
