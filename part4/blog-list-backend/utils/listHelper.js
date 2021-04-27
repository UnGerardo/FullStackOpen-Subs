
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};