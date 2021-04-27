const logger = require('./logger');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 
                                0 :
                                blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {};

    let mostLiked = blogs[0];

    for(let i = 1; i < blogs.length; i++) {
        if(blogs[i].likes > mostLiked.likes) {
            mostLiked = blogs[i];
        }
    }

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    };
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return "";

    const blogTracker = {};

    for(let i = 0; i < blogs.length; i++) {
        if(blogTracker[blogs[i].author]) {
            blogTracker[blogs[i].author]++;
        } else {
            blogTracker[blogs[i].author] = 1;
        }
    }
    logger.info(blogTracker);

    const authors = Object.keys(blogTracker);
    let author = authors[0];

    for(let i = 1; i < author.length; i++) {
        if(blogTracker[authors[i]] > blogTracker[author]) {
            author = authors[i];
        }
    }

    return {
        author: author,
        blogs: blogTracker[author]
    };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};