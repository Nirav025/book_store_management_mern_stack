
const {default : mongoose} = require('mongoose')


const dbConfig = () => {

    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Db Connected..."))
    .catch(err => console.log(err))

}


module.exports = dbConfig