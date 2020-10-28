const Post = require("../../models/Post")
const checkAuth = require("../../util/check-auth")
const { AuthenticationError } = require("apollo-server")

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            }
            catch(err)
            {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
              const post = await Post.findById(postId);
              if (post) {
                return post;
              } else {
                throw new Error('Post not found');
              }
            } catch (err) {
              throw new Error(err);
            }
          }
        },

    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context); //check if the user is authenticated
            console.log("user: ", user)

            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            console.log("new post: ",newPost)

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', { //new functionality for subscription to user when they post content
                newPost: post
            })
            return post;
        },

        async deletePost(_, { postId }, context){
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId)
                if(user.username === post.username)
                {
                    await post.delete();
                    return 'Post successfully deleted'
                }
                else {
                    throw new AuthenticationError("Action not allowed");
                }
            }
            catch(err)
            {
                throw new Error(err);
            }
           
        },

        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
      
            const post = await Post.findById(postId);
            if (post) 
            {
              if (post.likes.find((like) => like.username === username)) 
              {
                // Post already likes, unlike it
                post.likes = post.likes.filter((like) => like.username !== username); //remove the like
              } 
              else 
              {
                // adding the like
                post.likes.push({
                  username,
                  createdAt: new Date().toISOString()
                });
              }
      
              await post.save();
              return post;
            } 
            else
            {
                throw new UserInputError('Post not found');
            } 
        }
    },

    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}