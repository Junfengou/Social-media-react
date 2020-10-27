const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

const { MONGODB } = require("./config")

const typeDefs = require("./graphql/typeDef")
const resolvers = require("./graphql/resolvers")

 
// context is basically a middleWare used to check if the user is authenticated.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) // take the request and forward it
    
})

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB Connected")
    return server.listen({ port : 5000})
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})



// const typeDefs = gql`

//     type Post {
//         id: ID!
//         body: String!
//         createdAt: String!
//         username: String!
//     }

//     type Query {
//         getPosts: [Post]
//     }
// `

// const resolvers = {
//     Query: {
//         async getPosts(){
//             try{
//                 const posts = await Post.find();
//                 return posts;
//             }
//             catch(err)
//             {
//                 throw new Error(err);
//             }
//         }
//     }
// }
