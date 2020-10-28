const postsResolvers = require("./post")
const userResolvers = require("./user")
const commentResolvers = require("./comment")

module.exports = { 
    Post: {
        likeCount(parent){
            console.log("parent", parent);
            return parent.likes.length;
        },

        commentCount: (parent) => parent.comments.length
            
    },

    Query: {
        ...postsResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation,
    },

    Subscription: {
        ...postsResolvers.Subscription, // subscript function
    }
}