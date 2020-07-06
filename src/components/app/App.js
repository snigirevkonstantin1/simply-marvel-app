import React from 'react';
import MarvelApiService from '../../service';
import Header from '../header';
import { MarvelServiceProvider } from '../marvel-context';
import { Provider } from 'react-redux';
import './app.css';
import store from '../../store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { CharactersPage, PersonPage } from '../pages';
import ErrorBoundry from '../errorboundry';
import Comics from '../comics';
import TestPage from '../testpage'



const App = () => {
  const api = new MarvelApiService();
    return (
      <Provider store={store}>
        <ErrorBoundry>
          <MarvelServiceProvider value={api}>
          <div className="marvel__app">
            <Router>
                <Header />
              <Switch>
                <Route path='/' exact component={ CharactersPage } />
                {/* <Route path='/test' exact component={ TestPage } /> */}
                <Route path='/characters/:id?' render =
                {( { match })=>{
                  const { id } = match.params;
                  return<PersonPage id={id}/>}}/>
                <Route path='/comics/:id' render = 
                {({match})=>{
                  const {id} = match.params;
                  return <Comics id={id}/>}} />
              </Switch>
            </Router>
          </div>
          </MarvelServiceProvider>
        </ErrorBoundry>
      </Provider>
    );
}


export default App