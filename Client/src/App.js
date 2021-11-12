import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Topics from './components/topics';
import TopicModal from './components/topicModal';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <main className='container'>
        <Switch>
          <Route path='/topics/:id' component={TopicModal} />
          <Route path='/topics' component={Topics} />
          <Redirect from='/' exact to='/topics' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
