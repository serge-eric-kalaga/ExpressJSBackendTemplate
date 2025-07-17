const logger = require("pino");
// const dayjs = require("dayjs");

const transport = logger.transport({
    target: 'pino-pretty',
    options: { colorize: true }
  })

const log = logger({ level: process.env.LOG_LEVEL ,}, transport)

module.exports = log;