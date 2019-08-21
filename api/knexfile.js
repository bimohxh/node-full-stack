const Config = require(`./config/config.${process.env.NODE_ENV}`)

module.exports = {
  client: 'mysql',
  connection: Config.database
}