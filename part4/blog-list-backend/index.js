const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => logger.info("Connected to MongoDB"))
    .catch(error => logger.error("ERROR connecting to MongoDB: ", error));

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        });
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);
    
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    });
})

const PORT = config.PORT;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
})