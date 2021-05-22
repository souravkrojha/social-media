import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { AuthContext } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import MyPosts from './pages/MyPosts';

function App() {
  const { user } = useContext(AuthContext);
  let routes;
  if (user) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Route exact path="/:username/posts" component={MyPosts} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Router>
      <Container>
        <MenuBar />
        <Switch>{routes}</Switch>
      </Container>
    </Router>
  );
}

export default App;
