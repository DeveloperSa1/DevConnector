import React, {Fragment} from 'react';
import NavBar from './component/layout/NavBar';
import Landing from './component/layout/Landing';
import {BrowserRouter as Router,Route,Switch}
from 'react-router-dom'
import Login  from "./component/auth/Login";
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
// Redux 
import {Provider} from 'react-redux';
import store from './store';

import './App.scss';

const App = () =>  
<Provider store={store}>
<Router>
<Fragment>
  <NavBar/>
  <Route exact path='/' component={Landing} />
  <section className='Container harmattan-font'>
    <Alert/>
    <Switch>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </section>
</Fragment>
</Router>
</Provider>
      


export default App;
