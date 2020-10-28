import React from "react";
import App from "./App";
import { InMemoryCache, createHttpLink, ApolloProvider, ApolloClient} from "@apollo/client";


//This is basically setting up communication between frontend and backend so frontend can talk to graphql [2:11:35]

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/',
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

//This goes in index.js wrap around the DOM
export default (
    <ApolloProvider client={client}> 
        <App />
    </ApolloProvider>
)