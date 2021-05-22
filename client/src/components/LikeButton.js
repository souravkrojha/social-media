import React, { useEffect, useState } from 'react';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const LikeButton = ({ post: { id, likes, likeCount }, user, history }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likePostHandler = () => {
    likePost();
  };

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );
  return (
    <>
      <Popup
        content={liked ? 'unlike' : 'like'}
        inverted
        trigger={
          <Button
            as="div"
            labelPosition="right"
            onClick={
              user
                ? likePostHandler
                : () => {
                    window.location = '/login';
                  }
            }
          >
            {likeButton}

            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
        }
      />
    </>
  );
};
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
export default LikeButton;
