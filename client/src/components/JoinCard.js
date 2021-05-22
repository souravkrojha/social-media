import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const JoinCard = () => {
  const { data: { getUserCount } = {} } = useQuery(GET_USER_COUNT);
  return (
    <Card fluid style={{ marginTop: '10px' }}>
      <Card.Content header="About The New World" />
      <Card.Content
        description={
          'The new world is a new and awesome social media plaltform where any one can post what they thik about anything and express their thoughts without any limits'
        }
      />
      <Card.Content extra>
        <Popup
          inverted
          content={`A total of ${getUserCount} are in with us`}
          trigger={
            <Button style={{ cursor: 'default' }} icon="user" circular basic />
          }
        />
        {getUserCount} users
        <Popup
          content="join us now"
          inverted
          trigger={
            <Button
              floated="right"
              circular
              basic
              icon="add user"
              as={Link}
              to="/register"
            />
          }
        />
      </Card.Content>
    </Card>
  );
};

const GET_USER_COUNT = gql`
  {
    getUserCount
  }
`;

export default JoinCard;
