const {post, view, trash, update, singleView} = require("../controllers/bookController")

 


const app = require("express")()


app.post('/', post)

app.get('/',view)

app.get('/:id',singleView)

app.delete('/:id', trash)

app.put('/:id',update)




module.exports = app

