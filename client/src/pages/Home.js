import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import JoinCard from '../components/JoinCard';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <Header size="huge" textAlign="center" style={{ marginTop: '10px' }}>
        Recent Posts
      </Header>
      <Grid columns={3}>
        <Grid.Row>
          {user ? (
            <Grid.Column computer={6} mobile={16} tablet={6}>
              <PostForm />
            </Grid.Column>
          ) : (
            <Grid.Column computer={6} mobile={16} tablet={6}>
              <JoinCard />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Grid.Column computer={10} mobile={16} tablet={10}>
              {' '}
              <Transition.Group>
                {posts &&
                  posts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
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
`;
export default Home;
