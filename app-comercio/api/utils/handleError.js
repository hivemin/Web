const {errors} = require("../config/webhook")
const handleHttpError = async(res, message, code = 403) => {
  await errors.error("Error", code, message)
  res.status(code).send(message)

}
module.exports = { handleHttpError }