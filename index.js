const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const booksController = require('./controllers/books')();
const authorsController = require('./controllers/authors')();

const app = module.exports = express();

app.use('/', express.static('./public'));

app.use((req,res,next) => {
    console.log('[%s] %s -- %s', new Date(), req.method, req.url);
    next();
});

app.use(bodyParser.json());

//get all books
app.get('/books', booksController.getController);
//get one book by id
app.get('/books/:id', booksController.getById);
//add a book
app.post('/books', booksController.postController);

//get all authors
app.get('/authors', authorsController.getController);
//get one author by id
app.get('/authors/:id', authorsController.getById);
//add an author
app.post('/authors', authorsController.postController);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

//404
app.use((req,res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found',
    });
});

//     MONGO_URI="mongodb+srv://allaramo:8462795130.@cct.mwtjs.mongodb.net/?retryWrites=true&w=majority" npm run start
//$env:MONGO_URI="mongodb+srv://allaramo:8462795130.@cct.mwtjs.mongodb.net/?retryWrites=true&w=majority" 

