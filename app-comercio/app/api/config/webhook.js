const {Webhook} = require('discord-webhook-node')
const errors = new Webhook("https://discord.com/api/webhooks/1240815314447372329/JKxplSjdzghnzA_bN3ZZKdcI4PNbD5oyYnLi1eRzFiZw4JaLvqWwf9QNWMOKLyu4nMOi")
errors.setUsername("errores")
module.exports={errors}