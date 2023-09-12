// Add new Post
const addPost = `
    INSERT INTO posts(
        title,
        author,
        published_at
    ) VALUES ($1,$2,$3) RETURNING id, title, user_id, author, published_at, created_at
`;

const getPostByTitle = `
        SELECT id, title, author, user_id FROM posts WHERE title=$1
`;

const getAllPosts = `
        SELECT * FROM posts
`

const getSinglePost = `
        SELECT id, title, author, user_id, published_at, created_at
        FROM posts WHERE id=$1
`

const updatePostById = `
    UPDATE posts
    SET title = $1, author = $2, updated_at = $3
    WHERE id = $4
    RETURNING id, title, user_id, author, published_at, created_at, updated_at
`;

// Delete Post by ID
const deletePostById = `
    DELETE FROM posts
    WHERE id = $1
    RETURNING id, title, user_id, author, published_at, created_at, updated_at
`;

module.exports = {
    addPost,
    getPostByTitle,
    getAllPosts,
    getSinglePost,
    updatePostById,
    deletePostById
}