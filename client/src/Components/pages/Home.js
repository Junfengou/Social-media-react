import React from 'react'
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

import { Grid } from "semantic-ui-react"
import PostCard from "../PostCard"

function Home() {
    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);

      if(data)
      {
          console.log("This is list of data: " ,data.getPosts)
      }
 
    
    return (
        //breaking: TypeError [2:40]
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Recent posts</h1>
            </Grid.Row>

            <Grid.Row>
            {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id 
            body 
            createdAt
            username 
            likeCount
        likes {
            username
        }
        commentCount
        comments {
            id 
            username 
            createdAt 
            body
        }
    }
    }
`

export default Home
