const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/middleware/auth');

module.exports = {
  Mutaation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //post already liked,unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //post not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};
