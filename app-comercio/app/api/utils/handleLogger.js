const {IncomingWebhook} = require("../config/webhook")
const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
    }
}
module.exports = loggerStream