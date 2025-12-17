const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000


require('./config/db')()


// cors mate 
const cors = require('cors')
app.use(cors())


app.use(express.json())
app.use(express.urlencoded())



app.get('/', (req, res) => {
    res.send("server creared....")
})




const bookRoute = require('./routes/bookRoute.js')



app.use('/api/student', bookRoute)



app.listen(PORT, () => console.log(`app listening on port http://localhost:${PORT}`))