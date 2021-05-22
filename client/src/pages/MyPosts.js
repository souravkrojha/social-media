import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';

function MyPost() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPostsByUser: posts } = {} } = useQuery(
    FETCH_USER_POSTS_QUERY,
    {
      variables: { userId: user.id },
    }
  );

  return (
    <div>
      <Header style={{ marginTop: '10px' }} size="huge" textAlign="center">
        Your Recent Posts
      </Header>
      <Grid columns={3}>
        <Grid.Row className="page-title"></Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column
                    key={post.id}
                    style={{ marginBottom: 20 }}
                    computer={5}
                    mobile={16}
                  >
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
const FETCH_USER_POSTS_QUERY = gql`
  query getPostsByUser($userId: ID!) {
    getPostsByUser(userId: $userId) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default MyPost;
