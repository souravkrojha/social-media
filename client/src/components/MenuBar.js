import React, { useContext, useState } from 'react';
import { Menu, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(user ? user.username : path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const logOutHandler = () => {
    logout();
  };

  const menuBar = user ? (
    <Menu pointing secondary size="large" color="teal">
      <Menu.Item
        name={user.username}
        onClick={() => {
          setActiveItem(user.username);
        }}
        active={activeItem === user.username}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          onClick={() => {
            setActiveItem('posts');
          }}
          name="posts"
          active={activeItem === 'posts'}
          as={Link}
          to={`/${user.username}/posts`}
        />
        <Menu.Item name="logout" onClick={logOutHandler} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="large" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return <Sticky>{menuBar}</Sticky>;
}

export default MenuBar;
