const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/middleware/auth');
module.exports = {
  Query: {
    //get all posts
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        console.log(error.message);
        throw new Error(error);
      }
    },
    //get a single post
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post Not Found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    //create  a new post
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    //delete a post
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
