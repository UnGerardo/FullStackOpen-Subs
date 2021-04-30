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
        likes: 99999
    }
];

const newBlog = {
    title: 'New Blog',
    author: 'Author',
    url: 'https://blogs.com/new-blog',
    likes: 10
};

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe('GET Tests', () => {
    test('Blogs are returned in JSON', async () => {
        await api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
    });

    test('Correct number of blogs are returned', async () => {
        const response = await api.get('/api/blogs');
        
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('Blogs returned have the property -id-', async () => {
        const response = await api.get('/api/blogs');

        for(let i = 0; i < response.body.length; i++) {
            expect(response.body[i].id).toBeDefined();
        }
    });
});

describe('POST Tests', () => {
    test('POST request creates a new blog post and saves data correctly', async () => {
        await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');

        expect(response.body.length).toBe(initialBlogs.length + 1);

        delete response.body[response.body.length - 1].id;

        expect(response.body[response.body.length - 1]).toEqual(newBlog);
    });

    test('POST request with out the -likes- property defaults it to zero', async () => {
        const {likes, ...newBlogWithoutLikes} = newBlog;

        expect(newBlogWithoutLikes.likes).not.toBeDefined();

        await api.post('/api/blogs')
                .send(newBlogWithoutLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');

        expect(response.body[response.body.length - 1].likes).toBeDefined();
        expect(response.body[response.body.length - 1].likes).toBe(0);
    });

    test('POST request without title and url responsed with 400', async () => {
        const {title, url, ...newBlogWithoutUrlAndTitle} = newBlog;

        expect(newBlogWithoutUrlAndTitle.title).not.toBeDefined();
        expect(newBlogWithoutUrlAndTitle.url).not.toBeDefined();

        const response = await api.post('/api/blogs')
                                .send(newBlogWithoutUrlAndTitle)
                                .expect(400);
        
        expect(response.body).toEqual({ message: "URL and Title are missing" });
    });

});

describe('DELETE Tests', () => {
    test('DELETE by id deletes correct blog', async () => {
        const firstResponse = await api.get('/api/blogs');

        await api.delete(`/api/blogs/${firstResponse.body[1].id}`);

        const secondResponse = await api.get('/api/blogs');

        expect(secondResponse.body.length).toBe(firstResponse.body.length - 1);

        const authorsAfter = secondResponse.body.map(blog => blog.author);

        expect(authorsAfter).not.toContain('Sanson');
    });

});

describe('PUT Tests', () => {
    test('Updating an individual blog posts likes', async () => {
        const firstResponse = await api.get('/api/blogs');

        expect(firstResponse.body[1].likes).toBe(99999);

        await api.put(`/api/blogs/${firstResponse.body[1].id}`)
                .send({ likes: 25 });

        const secondResponse = await api.get('/api/blogs');

        expect(secondResponse.body[1].likes).toBe(25);
    });
});

afterAll(() => {
    mongoose.connection.close();
});