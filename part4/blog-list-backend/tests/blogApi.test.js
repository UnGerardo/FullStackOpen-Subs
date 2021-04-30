const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'First blog',
        author: 'Gerardo',
        url: 'https://blogs.com/first-blog',
        likes: 5
    },
    {
        title: 'Best blog',
        author: 'Sanson',
        url: 'https://blogs.com/best-blog',
        like: 99999
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe('GET Tests', () => {
    test('Correct number of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
                                .expect(200)
        
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('Blogs are returned in JSON', async () => {
        await api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
    });
});

afterAll(() => {
    mongoose.connection.close();
});