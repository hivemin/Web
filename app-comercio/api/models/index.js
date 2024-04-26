const pathModels = (process.env.ENGINE_DB === 'nosql') ? './nosql/' : './mysql/'
const models = {
    usersModel: require(pathModels+'users'),
    tracksModel: require(pathModels+'commerce'),
    storageModel: require(pathModels+'admin'),
}
module.exports = models