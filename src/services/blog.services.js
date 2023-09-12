const {
    addPost,
    getPostByTitle,
    getAllPosts,
    getSinglePost,
    updatePostById,
    deletePostById
} = require('../queries/blog');

const { runQuery } = require('../config/database.config');


// Add new Post

const addNewPost = async (body) => {
    const { title, author } = body;

    // Check if Post already exists
    const Post = await runQuery(getPostByTitle, [title])
    if (Post.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: 'Post already exist',
            data: null
        }
    }

    const published_at = new Date();
    const result = await runQuery(addPost, [title, author, published_at])
    return {
        code: 201,
        status: 'success',
        message: 'New Post added successfully',
        data: result[0]
    }
}


// Get all Posts

const retrieveAllPosts = async () => {
    const data = await runQuery(getAllPosts);
    return {
        code: 200,
        status: 'success',
        message: 'Posts fetched successfully',
        data
    }
}

// Get Single Post

const retrieveSinglePost = async (id) => {
    const result = await runQuery(getSinglePost, [id]);
    return {
        code: 200,
        status: 'success',
        message: 'Single Post fetched successfully',
        data: result[0]
    }
}

const updatePost = async (id, body) => {
    const { title, author } = body;

    // Check if the Post exists
    const existingPost = await runQuery(getSinglePost, [id]);
    if (!existingPost || existingPost.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'Post not found',
            data: null
        };
    }

    // Check if the new title already exists for another Post
    const PostWithSameTitle = await runQuery(getPostByTitle, [title]);
    if (PostWithSameTitle.length > 0 && PostWithSameTitle[0].id !== id) {
        throw {
            code: 409,
            status: 'error',
            message: 'Another Post with the same title already exists',
            data: null
        };
    }

    const updated_at = new Date();
    const result = await runQuery(updatePostById, [title, author, updated_at, id]);

    return {
        code: 200,
        status: 'success',
        message: 'Post updated successfully',
        data: result[0]
    };
}

// Delete Post by ID
const deletePost = async (id) => {
    // Check if the Post exists
    const existingPost = await runQuery(getSinglePost, [id]);
    if (!existingPost || existingPost.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'Post not found',
            data: null
        };
    }

    // Delete the Post
    await runQuery(deletePostById, [id]);

    return {
        code: 204,
        status: 'success',
        message: 'Post deleted successfully',
        data: null
    };
};


module.exports = {
    addNewPost,
    retrieveAllPosts,
    retrieveSinglePost,
    updatePost,
    deletePost
}