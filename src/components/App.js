import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {Cities} from './Cities';
import {Nav} from './Nav';

export function App(){

  return(
    <div id = 'app'>
      <Nav/>
      <Switch>
          <Redirect exact from="/" to="/search-cities"/>
          <Route path="/search-cities" component={Cities}/>
      </Switch>
    </div>
    
  )
}